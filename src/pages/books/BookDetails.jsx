import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { IoTrashBinOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import Sidebar from "./../../components/Nav/Sidebar";
import "./BookDetails.css";
export default function BookDetails() {
  const { id } = useParams(); // Pega o id do livro da URL
  const [book, setBook] = useState();
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const iconSize = 18;
  useEffect(() => {
    if (!token) {
      alert("Não há token");
      navigate("/login");
      return;
    }

    // Buscar os detalhes do livro pelo ID
    api
      .get(`/api/books/` + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBook(response.data);
        if (response.data.imagePath) {
          requestImage(response.data.imagePath);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
        setLoading(false);
      });
  }, [id, token, navigate]);
  const requestImage = (imagePath) => {
    let imagePos = imagePath.search("uploads/");
    let imageName = imagePath.slice(imagePos, imagePath.length);
    imageName = imageName.replace("uploads", "");
    api
      .get(`/api/books/images${imageName}`, {
        responseType: "arraybuffer",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const base64 = btoa(
          new Uint8Array(res.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        setImage(base64);
      })
      .catch((error) => {
        console.error("Error fetching the image:", error);
      });
  };
  const downloadBook = (event) => {
    event.preventDefault();

    api
      .get(`/api/books/download/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob", // Certifica-se de que a resposta é tratada como um arquivo
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `livro_${id}.pdf` // Nome sugerido para o arquivo baixado
        );
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        console.log("Livro baixado com sucesso!");
      })
      .catch((error) => {
        console.log(error);
        alert("Erro ao baixar o livro");
      });
  };
  const removeBook = (event) => {
    event.preventDefault();
    api
      .delete(`/api/books/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        alert("Livro deletado com sucesso!");
        navigate("/listBooks");
      })
      .catch((error) => {
        console.error("Error deleting the book:", error);
        alert("Erro ao deletar o livro.");
      });
  };

  if (loading) {
    return <p>Carregando detalhes do livro...</p>;
  }

  if (!book) {
    return (
      <>
        {" "}
        <div className="bookDetailMain">
          <Sidebar /> <h1>Livro não encontrado</h1>
        </div>
      </>
    );
  }

  return (
    <div className="bookDetailMain">
      <Sidebar />
      <div className="bookDetails">
        {image && (
          <img
            className="bookImage"
            src={`data:image/png;base64,${image}`}
            alt={book.title}
          />
        )}
        <h1 className="booktitledetails">{book.title}</h1>
        <p className="bookauthordetails">Autor: {book.author}</p>
        <div className="buttons">
          <div className="removeButton">
            <button onClick={removeBook} className="remove noselect">
              <span className="text">Deletar</span>
              <span className="icon">
                <IoTrashBinOutline size={iconSize} color="white" />
              </span>
            </button>
          </div>
          <div className="updateButton">
            <button className="update noselect">
              <span className="text">Atualizar</span>
              <span className="icon">
                <GrUpdate size={iconSize} color="white" />
              </span>
            </button>
          </div>
          <div className="downloadButton">
            <button onClick={downloadBook} className="download noselect">
              <span className="text">Download</span>
              <span className="icon">
                <FaDownload size={iconSize} color="white" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
