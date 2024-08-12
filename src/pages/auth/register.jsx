import { motion } from "framer-motion";
import React, { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import {
  fieldsetRegisterVariants,
  formVariants,
  registerSectionVariants,
} from "../../utils/variants";
import "./auth.css";

import api from "../../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setcheckPassword] = useState("");
  const navigate = useNavigate();

  async function register(e) {
    e.preventDefault();
    if (password !== checkPassword) {
      alert("As senhas não batem, tem certeza que digitou corretamente?");
      return;
    }
    if (password === "" || email === "" || name === "") {
      alert("Um dos campos esta em branco");
      return;
    }
    const data = {
      email,
      name,
      password,
    };
    try {
      console.log("Registrando...");
      const response = await api.post("auth/register", data);
      localStorage.setItem("accessToken", response.data.token);

      navigate("/home");
    } catch (err) {
      alert("Falhou ao registrar-se, tente novamente!");
    }
  }
  return (
    <div className="authmain">
      <motion.div
        className="section form-section"
        variants={registerSectionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.form onSubmit={register} variants={formVariants}>
          <motion.h1 variants={fieldsetRegisterVariants}>
            Registrar-se
          </motion.h1>
          <motion.fieldset variants={fieldsetRegisterVariants}>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </motion.fieldset>
          <motion.fieldset variants={fieldsetRegisterVariants}>
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </motion.fieldset>
          <motion.fieldset variants={fieldsetRegisterVariants}>
            <label>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </motion.fieldset>
          <motion.fieldset variants={fieldsetRegisterVariants}>
            <label>Digite a senha novamente</label>
            <input
              type="password"
              value={checkPassword}
              onChange={(e) => setcheckPassword(e.target.value)}
            />
          </motion.fieldset>
          <motion.button variants={fieldsetRegisterVariants} type="submit">
            Registrar-se
          </motion.button>
          <motion.span
            variants={fieldsetRegisterVariants}
            className="redirect-register"
          >
            <Link className="authlink" to="/login">
              Login <BsArrowRight />
            </Link>
          </motion.span>
        </motion.form>
      </motion.div>
      <div className="section background-section" />
    </div>
  );
}
