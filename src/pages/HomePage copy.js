import React from "react";
import { format } from "date-fns";

import { getAllNews } from "../services/news/index";
import { Alert, Image, Spinner } from "react-bootstrap";

import http from "../services/http";


const HomePage = () => {
  const [news, setNews] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const getNews = async () => {
      try {
        const response = await getAllNews();
        // console.log(response.data.data); // [{...}]
        setNews(response.data.data); //re-render
      } catch (error) {
          // console.log(error);
          if (http.isCancel(error)) {
            console.log('request canceled', error.message);
          } else {
            setError(error);
          }
      } finally {
          setLoading(false);
      }
  }

  React.useEffect( () => {
    getNews();
    return () => {
      console.log("exit home page")
      http.source.cancel("home page cancel complete");
    }
  }, []);

  if (loading === true) {
    return (
      <div className="text-ceenter mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>        
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-ceenter mt-5">
        <Alert variant="danger" >
          <p>เกิดข้อผิดพลาด กรุณาลองใหม่</p>
          <p>
            {error.message}
          </p>
          <p>
            Axios http status code: {JSON.stringify(error.response.status)} <br />
            Axios message: {JSON.stringify(error.response.data)}
          </p>
        </Alert>     
      </div>
    )
  }

  return (
    <>
      <main>
        <section className="py-5 text-center container">
          <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
              <h1 className="fw-light">ระบบจัดการข่าวสารองค์กร 13642</h1>
              <p className="lead text-muted">
                13642Something short and leading about the collection below—its
                contents, the creator, etc. Make it short and sweet, but not too
                short so folks don’t simply skip over it entirely.
              </p>
              <p>
                <a href="/#" className="btn btn-primary my-2">
                  Main call to action
                </a>
                <a href="/#" className="btn btn-secondary my-2">
                  Secondary action
                </a>
              </p>
            </div>
          </div>
        </section>
        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

            {
              news.map( (item, index) => {
                return (
                  <div className="col" key={item.id}>
                    <div className="card shadow-sm">

                      <Image src={item.photo_url} fluid/>

                      <div className="card-body">
                        <p className="card-text">
                          {item.detail}
                        </p>
                        <div className="d-flex justify-content-between align-items-center">

                          {/* <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-outline-secondary">
                              View
                            </button>
                            <button type="button" className="btn btn-sm btn-outline-secondary">
                              Edit
                            </button>
                          </div> */}

                          <small className="text-muted">
                            { format(new Date(item.created_at), "dd MMM yyyy")}
                          </small>

                          <small className="text-muted">{item.user.fullname}</small>

                        </div>
                      </div>
                  </div>
                </div>
                )
              })
            }

            </div>
          </div>
        </div>
        
      </main>

    </>
  );
};

export default HomePage;
