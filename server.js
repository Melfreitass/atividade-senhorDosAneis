import express from "express";
import personagens from "./src/data/personagens.js";

const app = express();
app.use(express.json());

const serverPort = 3000;

app.get("/", (req, res) => {
    res.send("Bem vindo ao servidor do mundo do Senhor dos anéis...")
});

app.get("/personagens", (req, res) => {
    res.json(personagens);
});

app.get("/personagens/:id", (req, res) =>{
    const id = parseInt(req.params.id);
    const personagem = personagens.find(p => p.id === id);

    if (personagem) {
        res.status(200).json(personagem);
    } else {
        res.status(404).json({
            mensagem: "Personagem não encontrado"
        })
    }
})

app.get("/personagens/nome/:nome", (req, res) => {
    let nome = req.params.nome;
    nome = nome.toLowerCase();

    const nomesFiltrados = personagens.filter(p => p.nome.toLowerCase().includes(nome));

    if(nomesFiltrados) {
        res.status(200).json(nomesFiltrados);
    } else {
        res.status(404).json({
            mensagem : "Personagem não encontrado"
        })
    }
})

app.get("/personagens/raca/:raca", (req, res) => {
    let raca = req.params.raca;
    raca = raca.toLowerCase();

    const racasFiltradas = personagens.filter(p => p.raca.toLowerCase().includes(raca));

    if(racasFiltradas) {
        res.status(200).json(racasFiltradas);
    } else {
        res.status(404).json({
            mensagem : "Raça não encontrado"
        })
    }
})

app.listen(serverPort, () => {
    console.log("Servidor funcionando...")
});