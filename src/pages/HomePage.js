import React, { PureComponent } from "react";
import { format } from "date-fns";

import { getAllNews } from "../services/news/index";
import { Alert, Image, Spinner } from "react-bootstrap";

import http from "../services/http";


import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
}  from "recharts";


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

  const data = [
    { name: "สมพง", math: 68, physics: 80, english: 99, social: 62 },
    { name: "สุริน", math: 54, physics: 57, english: 89, social: 76 },
    { name: "นรง", math: 86, physics: 69, english: 71, social: 73 },
    { name: "สมพร", math: 55, physics: 50, english: 73, social: 85 }
  ];
  
  const renderLineChart = (
    <BarChart
      style={{ display: "block", margin: "20% auto" }}
      width={1000}
      height={400}
      data={data}
    >
      <Bar dataKey="math" fill="#1abc9c" />
      <Bar dataKey="physics" fill="#2ecc71" />
      <Bar dataKey="english" fill="#3498db" />
      <Bar dataKey="social" fill="#34495e" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </BarChart>
  );
  function App() {
    return <div className="App">{renderLineChart}</div>;
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
