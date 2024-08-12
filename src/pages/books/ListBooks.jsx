import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import PacmanLoader from "react-spinners/PacmanLoader";
import Sidebar from "../../components/Nav/Sidebar";
import api from "../../services/api";
import "./ListBooks.css";
export default function ListBooks() {
  const [books, setBooks] = useState([]);
  const [images, setImages] = useState({});
  const navigate = useNavigate();
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    if (!token) {
      navigate("/login");

      console.error("No token found in localStorage!");
      return;
    }
    api
      .get("/api/books/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBooks(response.data);
        setFilteredBooks(response.data);
        // Carregar imagens após os livros
        response.data.forEach((book) => {
          if (book.imagePath) {
            requestImage(book.id, book.imagePath);
          }
        });

        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the books!",
          error.response?.status, // Código de status
          error.response?.data, // Dados da resposta de erro
          error.message // Mensagem de erro
        );
        setLoading(false);
      });
  }, [token, navigate]);
  const requestImage = (bookId, imagePath) => {
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
        setImages((prevImages) => ({
          ...prevImages,
          [bookId]: base64,
        }));
      })
      .catch((error) => {
        console.error("Error fetching the image:", error);
      });
  };
  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term)
    );
    setFilteredBooks(filtered);
  };

  return (
    <div className="listmain">
      {loading ? (
        <div className="loader">
          <PacmanLoader className="pacman" size={40} />
        </div>
      ) : (
        <div className="listBooksMain">
          <Sidebar />
          <div className="listBookslist">
            <h1>Sua listagem de livros</h1>
            <input
              type="text"
              placeholder="Buscar livros..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="searchbar"
            />

            <ul className="booksList">
              {filteredBooks.map((book) => (
                <li key={book.id}>
                  <div className="book-card">
                    <div className="book-card__cover">
                      <div className="book-card__book">
                        <div className="book-card__book-front">
                          <img
                            src={`data:image/png;base64,${images[book.id]}`}
                            className="book-card__img"
                          />
                        </div>
                        <div className="book-card__book-back"></div>
                        <div className="book-card__book-side"></div>
                      </div>
                    </div>
                    <div>
                      <div className="book-card__title">{book.title}</div>
                      <div className="book-card__author">{book.author}</div>
                      <div className="book-card__author">
                        <Link className="link" to={"./Book/" + book.id}>
                          Ver detalhes
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
