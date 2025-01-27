import { db } from "@/db/db"; // Conexão com o banco
import { adminsTable } from "@/db/schema"; // Tabela de administradores
import bcrypt from "bcrypt";

async function seed() {
  console.log("🌱 Populando o banco de dados...");

  // Definir dados do administrador de teste
  const adminData = {
    name: "Admin Test",
    email: "admin@email.com",
    password: await bcrypt.hash("senha123", 10), // Hash da senha
    phone: "+55 11 99999-9999",
  };

  try {
    // Inserir administrador no banco
    await db.insert(adminsTable).values(adminData);
    console.log("✅ Administrador de teste criado com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao inserir administrador:", error);
  } finally {
    process.exit(0); // Finaliza o script
  }
}

// Executar o seed
seed();
