import {getTodosPosts, criarPost, atualizarPost} from "../models/postsModel.js";
import fs from "fs"
import gerarDescricaoComGemini from "../services/geminiService.js"
export async function listarPosts(req, res){
        // **Chama a função para buscar os posts:**
        const posts = await getTodosPosts();
        // **Envia os posts como resposta em formato JSON:**
        res.status(200).json(posts); 
}

// Função para criar um novo post no banco de dados
export async function postarNovoPost(req, res){
        const novoPost = req.body;
        try{
                // Cria o post chamando a função `criarPost` e salva no banco de dados
                const postCriado = await criarPost(novoPost)
                res.status(200).json(postCriado);
        } catch(erro) {
                console.error(erro.message);
                res.status(500).json({"Erro":"Falha na requisição"})
        }

}

export async function uploadImagem(req, res){
        // Cria um objeto para o novo post com as informações da imagem
        const novoPost = {
                descricao: "",
                imgUrl: req.file.originalname,
                alt: ""
        };

        try{
                // Salva o novo post no banco de dados
                const postCriado = await criarPost(novoPost);
                // Define o novo caminho para o arquivo, renomeando-o com o ID do post criado
                const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
                fs.renameSync(req.file.path, imagemAtualizada)
                res.status(200).json(postCriado);
        } catch(erro) {
                console.error(erro.message);
                res.status(500).json({"Erro":"Falha na requisição"})
        }

}

export async function atualizarNovoPost(req, res){
        const id = req.params.id;
        const urlImagem = `http://localhost:3000/${id}.png`
        
        try{
                const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
                const descricao = await gerarDescricaoComGemini(imgBuffer)

                const post = {
                        imgUrl: urlImagem,
                        descricao: descricao,
                        alt: req.body.alt
                }

                const postCriado = await atualizarPost(id, post)
                res.status(200).json(postCriado);
        } catch(erro) {
                console.error(erro.message);
                res.status(500).json({"Erro":"Falha na requisição"})
        }

}
