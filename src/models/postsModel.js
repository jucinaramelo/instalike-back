import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// A linha seguinte importa a função `conectarAoBanco` de um arquivo de configuração, que provavelmente contém as informações de conexão com o banco de dados.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO)

// **Função assíncrona para obter todos os posts do banco de dados:**
export async function getTodosPosts(){
    // **Seleciona o banco de dados e a coleção:**
    const db = conexao.db("imersao-instabytes")
    const colecao = db.collection("posts")
    // **Executa a consulta e retorna os resultados:**
    return colecao.find().toArray()
}

export async function criarPost(novoPost){

    const db = conexao.db("imersao-instabytes")
    const colecao = db.collection("posts")
   
    return colecao.insertOne(novoPost);

}

export async function atualizarPost(id, novoPost){

    const db = conexao.db("imersao-instabytes")
    const colecao = db.collection("posts")
    const objID = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});

}