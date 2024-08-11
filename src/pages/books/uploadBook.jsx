import { motion } from "framer-motion";
import React, { useState } from "react";
import {
  fieldsetRegisterVariants,
  formVariants,
  loginSectionVariants,
} from "../.././utils/variants";
import Sidebar from "../../components/Nav/Sidebar";
import api from "../../services/api";
import "./uploadBook.css";

export default function UploadBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [bookFile, setBookFile] = useState(null);
  const [ImageFile, setImageFile] = useState(null);
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };
  const handleFileUpload = (event) => {
    setBookFile(event.target.files[0]);
  };
  const handleImageUpload = (event) => {
    setImageFile(event.target.files[0]);
  };
  async function uploadBook(e) {
    e.preventDefault();
    if (
      title === "" ||
      author === "" ||
      bookFile === null ||
      ImageFile === null
    ) {
      alert("Um dos campos esta em branco!");
      return;
    }
    const formData = new FormData();
    formData.append("file", bookFile);
    formData.append("title", title);
    formData.append("author", author);
    formData.append("image", ImageFile);
    api
      .post("api/books/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        // handle the response
        console.log(response);
        alert("Enviado com sucesso!!");
      })
      .catch((error) => {
        // handle errors
        console.log(error);
        alert("Erro ao enviar livro!!");
      });
  }
  return (
    <div className="uploadmain">
      <Sidebar />

      <motion.div
        className="section-upload-book form-section"
        variants={loginSectionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <h1>Upload de livros</h1>
        <motion.form
          onSubmit={uploadBook}
          variants={formVariants}
          action="post"
        >
          <motion.fieldset variants={fieldsetRegisterVariants}>
            <label>Titulo</label>
            <input type="text" value={title} onChange={handleTitleChange} />
          </motion.fieldset>
          <motion.fieldset variants={fieldsetRegisterVariants}>
            <label>Autor</label>
            <input type="text" value={author} onChange={handleAuthorChange} />
          </motion.fieldset>
          <motion.fieldset variants={fieldsetRegisterVariants}>
            <label>Arquivo</label>
            <input
              type="file"
              data-max-file-size="100MB"
              data-max-files="1"
              onChange={handleFileUpload}
            />
          </motion.fieldset>
          <motion.fieldset variants={fieldsetRegisterVariants}>
            <label>Capa</label>
            <input
              type="file"
              data-max-file-size="100MB"
              data-max-files="1"
              onChange={handleImageUpload}
              accept="image/*"
            />
          </motion.fieldset>
          <motion.button variants={fieldsetRegisterVariants} type="submit">
            Enviar
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
}
