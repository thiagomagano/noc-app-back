import db from "@/db"; // Conexão com o banco
import { players } from "./schema";
import { fakerPT_BR as faker } from "@faker-js/faker"; // Biblioteca para gerar dados fictícios

// Função para gerar dados fictícios de jogadores
async function seedPlayers() {
  // Array de jogadores fictícios
  const playersData = Array.from({ length: 25 }, () => ({
    name: faker.person.firstName(), // Nome completo aleatório
    phone: faker.phone.number(), // Número de telefone aleatório
    skill: faker.helpers.arrayElement([1, 2, 3, 4, 5]), // Nível de habilidade aleatório
    shirt: faker.number.int({ min: 1, max: 99 }), // Número da camisa aleatório
    image: faker.image.avatar(), // URL de imagem aleatória
    isGoalkeaper: false,
  }));

  // Insere os jogadores no banco de dados
  try {
    await db.insert(players).values(playersData);
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
