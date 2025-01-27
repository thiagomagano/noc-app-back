import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { sign } from "hono/jwt";
import bcrypt from "bcrypt";
import { adminsTable } from "@/db/schema"; // Tabela de administradores
import { db } from "@/db/db"; // Conexão com o banco de dados

const auth = new Hono();

const JWT_SECRET = process.env.JWT_SECRET || "supersecret"; // Chave para assinar o JWT

auth.post("/login", async (c) => {
  const { email, password } = await c.req.json();

  // Buscar administrador no banco de dados
  const result = await db
    .select()
    .from(adminsTable)
    .where(eq(adminsTable.email, email));
  const user = result[0];

  if (!user) {
    return c.json({ error: "Invalid credentials" }, 401);
  }

  // Comparar a senha hashada
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return c.json({ error: "Invalid credentials" }, 401);
  }

  // Gerar token JWT
  const token = await sign({ id: user.id, email: user.email }, JWT_SECRET);

  return c.json({ token });
});

export default auth;
