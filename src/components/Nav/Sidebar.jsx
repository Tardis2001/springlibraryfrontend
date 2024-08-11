import { AnimatePresence, motion, useCycle } from "framer-motion";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router";
import { itemVariants, sidebarVariants } from "../../utils/variants";
import "./Sidebar.css";
export default function Navbar() {
  const navigate = useNavigate();
  const [open, cycleOpen] = useCycle(false, true);

  async function logout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <main>
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ width: 0 }}
            animate={{ width: 300 }}
            exit={{ width: 0, transition: { delay: 0.9, duration: 0.5 } }}
          >
            <motion.div
              className="container"
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
            >
              <motion.a
                key="Home"
                href="/home"
                whileHover={{ scale: 1.1 }}
                variants={itemVariants}
                className="link"
              >
                Dashboard
              </motion.a>
              <motion.a
                key="UploadBooks"
                href="/uploadBook"
                whileHover={{ scale: 1.1 }}
                variants={itemVariants}
                className="link"
              >
                Upload Livros
              </motion.a>
              <motion.a
                key="ListBooks"
                href="/listBooks"
                whileHover={{ scale: 1.1 }}
                variants={itemVariants}
                className="link"
              >
                Listar <br /> Livros
              </motion.a>
              {/* <motion.a
                key="ListBooks"
                href="/removeBooks"
                whileHover={{ scale: 1.1 }}
                variants={itemVariants}
                className="link"
              >
                Remover Livros
              </motion.a> */}
              <motion.a
                key="Logout"
                onClick={logout}
                whileHover={{ scale: 1.1 }}
                variants={itemVariants}
                className="link"
              >
                Logout
              </motion.a>{" "}
              <motion.a
                key="About"
                href="#"
                whileHover={{ scale: 1.1 }}
                variants={itemVariants}
                className="link"
              >
                About
              </motion.a>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
      <div className="btn-container">
        <button className="btn-hamburguer" onClick={cycleOpen}>
          <GiHamburgerMenu color="black" />
        </button>
      </div>
    </main>
  );
}
