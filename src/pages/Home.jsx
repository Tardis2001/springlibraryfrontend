import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PacmanLoader from "react-spinners/PacmanLoader";
import Sidebar from "../components//Nav/Sidebar";
import api from "../services/api";
import "./Home.css";

export default function Home() {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [BookData, setBookData] = useState(0);

  let token;
  useEffect(() => {
    token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
    }
    api
      .get("/user/dashboard", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setBookData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <div className="loader">
          <PacmanLoader size={40} />
        </div>
      ) : (
        <div className="home">
          <Sidebar />
          <div className="dashboard-main">
            <h1>Dashboard</h1>
            <div className="wrapper-box">
              <div className="BoxqntdLivros">
                <h4 className="title-square">Quantidade total de Uploads</h4>
                <div className="qntd" style={{ height: "50px" }}>
                  {BookData.qntdLivros}
                </div>
              </div>
              <div className="BoxqntdLivros">
                <h4 className="title-square">Quantidade total de Downloads</h4>
                <div className="qntd" style={{ height: "50px" }}>
                  {BookData.totalDownloads}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
