import db from "@/db";
import { players } from "./schema";

interface Player {
  name: string;
  phone: string;
  email: string;
  shirt: number;
  skill: number;
  stamina: number;
  isGoalKeeper: number;
  image?: string;
}

const dataPlayers: Player[] = [
  {
    name: "Thiago",
    phone: "51993438767",
    email: "othymag@gmail.com",
    shirt: 10,
    skill: 3,
    stamina: 1,
    isGoalKeeper: 0,
    image: "",
  },
  {
    name: "Paulo Corbacho",
    phone: "51995660873",
    email: "paulo.corbacho@hotmail.com",
    shirt: 9,
    skill: 3,
    stamina: 3,
    isGoalKeeper: 0,
    image: "",
  },
  {
    name: "Marcel",
    phone: "51981526250",
    email: "marcel_magano@live.com",
    shirt: 19,
    skill: 3,
    stamina: 2,
    isGoalKeeper: 0,
    image: "",
  },
  {
    name: "Thales",
    phone: "51993790908",
    email: "thalesrocha1994@gmail.com",
    shirt: 1,
    skill: 4,
    stamina: 4,
    isGoalKeeper: 1,
    image: "",
  },
  {
    name: "Jonathan Saldanha",
    phone: "51984600028",
    email: "joonathansaldanha@gmail.com",
    shirt: 12,
    skill: 4,
    stamina: 5,
    isGoalKeeper: 0,
    image: "",
  },
  {
    name: "Juliano",
    phone: "51993187169",
    email: "julianomfraga@gmail.com",
    shirt: 13,
    skill: 3,
    stamina: 2,
    isGoalKeeper: 0,
    image: "",
  },
  {
    name: "Waldekinha",
    phone: "51995463999",
    email: "andre.waldemarca@gmail.com",
    shirt: 7,
    skill: 3,
    stamina: 2,
    isGoalKeeper: 0,
    image: "",
  },
  {
    name: "Serginho",
    phone: "51995579543",
    email: "sergioarnoudjr@me.com",
    shirt: 16,
    skill: 1,
    stamina: 2,
    isGoalKeeper: 0,
    image: "",
  },
  {
    name: "Brunão",
    phone: "51986204423",
    email: "bruno.pinto.17@gmail.com",
    shirt: 16,
    skill: 4,
    stamina: 3,
    isGoalKeeper: 0,
    image: "",
  },
  {
    name: "Diogo",
    phone: "51985839591",
    email: "dyogodorneles@gmail.com",
    shirt: 20,
    skill: 3,
    stamina: 4,
    isGoalKeeper: 0,
    image: "",
  },
  {
    name: "Higor",
    phone: "51993949401",
    email: "Arq.higorbelotto@gmail.com",
    shirt: 69,
    skill: 3,
    stamina: 4,
    isGoalKeeper: 0,
    image: "",
  },
  {
    name: "Carlos Garcias",
    phone: "51982442475",
    email: "carlos.garcias03@hotmail.com",
    shirt: 15,
    skill: 4,
    stamina: 3,
    isGoalKeeper: 0,
    image: "",
  },
  {
    name: "Willian Rodrigues",
    phone: "51983129875",
    email: "williambairros@live.com",
    shirt: 77,
    skill: 5,
    stamina: 5,
    isGoalKeeper: 0,
    image: "",
  },
  {
    name: "Paulo Ricardo",
    phone: "51985002617",
    email: "pr.atg32@gmail.com",
    shirt: 21,
    skill: 1,
    stamina: 5,
    isGoalKeeper: 0,
    image: "",
  },
  {
    name: "Claudio Lague",
    phone: "51998643921",
    email: "claudiolague@gmail.com",
    shirt: 23,
    skill: 3,
    stamina: 3,
    isGoalKeeper: 0,
    image: "",
  },
];

async function seedPlayers() {
  // Insere os jogadores no banco de dados
  try {
    await db.insert(players).values(dataPlayers);
    console.log("Seed concluído! Jogadores inseridos com sucesso.");
  } catch (error) {
    console.error("Erro ao inserir jogadores:", error);
  } finally {
    // Fecha a conexão com o banco de dados
    process.exit(0);
  }
}

// Executa a função de seed
seedPlayers();
