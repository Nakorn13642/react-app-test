import React from "react";
import Pagination from "react-js-pagination";
import axios from "axios";
import { Table, Spinner, Button } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { useHistory } from "react-router";
import toast from "react-hot-toast";

const pageSize = 3;

const UserPage = () => {
  const [user, setUser] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const cancelToken = React.useRef(null);
  const history = useHistory();

  //pagination
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);

  const getData = async (page) => {
    try {
      setLoading(true);
      const resp = await axios.get(
        `http://localhost:4000/user?page=${page}&page_size=${pageSize}`,
        {
          cancelToken: cancelToken.current.token,
        }
      );
      //console.log(resp.data.data)
      setUser(resp.data.data);
      setTotal(resp.data.total);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    cancelToken.current = axios.CancelToken.source();

    getData(page);

    return () => {
      cancelToken.current.cancel();
    };
  }, [page]);

  if (loading === true) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5 text-danger">
        <p>เกิดข้อผิดพลาดจาก Server กรุณาลองใหม่</p>
        <p>{error.response.data.message}</p>
      </div>
    );
  }

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <>
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-12">
            <h2>User</h2>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>id</th>
                  <th>fullname</th>
                  <th>created at</th>
                  <th>role</th>
                  <th>action</th>
                </tr>
              </thead>
              <tbody>
                {user.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.fullname}</td>
                      <td>{item.created_at}</td>
                      <td>{item.role}</td>
                      <td>
                        <Button
                          className="ml-2"
                          variant="outline-danger"
                          size="sm"
                          onClick={async () => {
                            const isConfirm = window.confirm(
                              "แน่ใจว่าต้องการลบข้อมูล " + item.fullname + "?"
                            );
                            if (isConfirm === true) {
                              const token = localStorage.getItem("token");
                              try {
                                const resp = await axios.delete(
                                  "http://localhost:4000/user/" + item.id,
                                  {
                                    headers: {
                                      Authorization: "Bearer " + token,
                                    },
                                  }
                                );
                                console.log(resp.data);
                                history.go(0);
                              } catch (error) {
                                toast.error(error.response.data.message);
                              }
                            }
                          }}
                        >
                          <BsTrash />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>

            <Pagination
              activePage={page}
              itemsCountPerPage={pageSize}
              totalItemsCount={total}
              pageRangeDisplayed={15}
              onChange={handlePageChange}
              itemClass="page-item"
              linkClass="page-link"
              prevPageText="ก่อนหน้า"
              nextPageText="ต่อไป"
              firstPageText="หน้าแรก"
              lastPageText="หน้าสุดท้าย"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;
