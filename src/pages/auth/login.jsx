import { motion } from "framer-motion";
import React, { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import {
  fieldsetLoginVariants,
  formVariants,
  loginSectionVariants,
} from "../../utils/variants";
import "./auth.css";

import api from "../../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();
    const data = {
      email,
      password,
    };

    try {
      const response = await api.post("/auth/login", data);

      localStorage.setItem("email", email);
      localStorage.setItem("accessToken", response.data.token);

      navigate("/home");
    } catch (err) {
      console.log(err);
      alert("Falhou o login, tente novamente!");
    }
  }

  return (
    <div className="authmain">
      <div className="section background-section" />
      <motion.div
        className="section form-section"
        variants={loginSectionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.form onSubmit={login} variants={formVariants}>
          <motion.h1 variants={fieldsetLoginVariants}>Login</motion.h1>
          <motion.fieldset variants={fieldsetLoginVariants}>
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </motion.fieldset>
          <motion.fieldset variants={fieldsetLoginVariants}>
            <label>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </motion.fieldset>
          <motion.button variants={fieldsetLoginVariants} type="submit">
            Login
          </motion.button>
          <motion.span variants={fieldsetLoginVariants}>
            <Link className="authlink" to="/register">
              <BsArrowLeft /> Registrar-se agora
            </Link>
          </motion.span>
        </motion.form>
      </motion.div>
    </div>
  );
}
