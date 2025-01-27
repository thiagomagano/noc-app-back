import { drizzle } from "drizzle-orm/node-postgres";
import { playersTable } from "./schema";
import { fakerPT_BR as faker } from "@faker-js/faker"; // Biblioteca para gerar dados fictícios
import env from "@/env";

// Função para gerar dados fictícios de jogadores
async function seedPlayers() {
  const db = drizzle(env.DATABASE_URL); // Inicializa o Drizzle

  // Array de jogadores fictícios
  const players = Array.from({ length: 30 }, () => ({
    name: faker.person.firstName(), // Nome completo aleatório
    phone: faker.phone.number(), // Número de telefone aleatório
    position: faker.helpers.arrayElement(["linha", "goleiro"]), // Posição aleatória
    skill: faker.helpers.arrayElement(["1", "2", "3", "4", "5"]), // Nível de habilidade aleatório
    wins: faker.number.int({ min: 0, max: 50 }), // Vitórias aleatórias
    games: faker.number.int({ min: 0, max: 100 }), // Jogos jogados aleatórios
    shirt: faker.number.int({ min: 1, max: 99 }), // Número da camisa aleatório
    image: faker.image.avatar(), // URL de imagem aleatória
  }));

  // Insere os jogadores no banco de dados
  try {
    await db.insert(playersTable).values(players);
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
