import express from 'express';

const app = express();
/**
 * GET => BUSCA
 * POST => SALVA
 * PUT => ALTERA
 * DELETE => DELETA
 * PATCH => ALTERAÇÃO ESPECIFICA   
 */

 // https://localhost:3333/
 app.get("/", (request, response) => {
     return response.json("Hello!")
 });

 app.post("/", (request, response) => {
     return response.json({message :"Salvo com sucesso!"})
 });

app.listen(3333, () => console.log("server is running!"));