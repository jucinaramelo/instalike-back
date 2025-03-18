import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost} from "../controllers/postsController.js";

const upload = multer({dest:"./uploads"})

const routes = (app) => {
    //permite que o servidor interprete requisições com corpo 
    app.use(express.json());
    // **Rota GET para obter todos os posts:**
    app.get("/posts", listarPosts);
    // Rota para criar um post (enviar)
    app.post("/posts", postarNovoPost)
    app.post("/upload", upload.single("imagem"), uploadImagem)

    app.put("/upload/:id", atualizarNovoPost)
}

export default routes;
