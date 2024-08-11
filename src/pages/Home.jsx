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
  const [qntdBooks, setqntdBooks] = useState(0);

  let token;
  useEffect(() => {
    token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
    }
    api
      .get("/api/books/quantity", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setqntdBooks(response.data);
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
        <PacmanLoader size={40} />
      ) : (
        <div className="home">
          <Sidebar />
          <div className="dashboard-main">
            <h1>Dashboard</h1>
            <div className="wrapper-box">
              <div className="BoxqntdLivros">
                <h4 className="title-square">Quantidade total de Livros</h4>
                <div className="qntd" style={{ height: "50px" }}>
                  {qntdBooks}
                </div>
              </div>
              <div className="BoxqntdLivros">
                <h4 className="title-square">Livros Lidos</h4>
                <div className="qntd" style={{ height: "50px" }}></div>
              </div>
              <div className="BoxqntdLivros">
                <h4 className="title-square">Livros que você deu upload</h4>
                <div className="qntd" style={{ height: "50px" }}></div>
              </div>
              <div className="BoxqntdLivros">
                <h4 className="title-square">
                  Quantidade de vezes que você baixou
                </h4>
                <div className="qntd" style={{ height: "50px" }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
