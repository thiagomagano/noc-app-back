import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import "dotenv/config";
import { logger } from "hono/logger";

const app = new Hono().basePath("/api");
app.use("/api/*", cors());

app.use(logger());

// TODO: Importar Rotas

app.get("/", (c) => {
  return c.json({
    ok: true,
    message: "N.O.C.U FUTSAL",
  });
});

app.get("/players/list", (c) => {
  // Pegar todos jogadores da base de dados
  const players = ["Thiago", "Paulinho", "Marcel", "Thales"];

  return c.json(players);
});

app.get("/players/:id", (c) => {
  const player = c.req.param("id");

  //logica pra achar o jogador findUnique(id)

  return c.json({ id: player });
});

app.post("/players/create", async (c) => {
  //Confirir se os dados estão correots
  const player = await c.req.json();

  // Salvar Jogador no banco
  //const ok = createPlayer(player);

  // Retornar o jogador criado e mensagem de sucesso
  return c.json({
    message: "Jogador criado com sucesso!",
    jogador: player,
  });
});

const port = 3131;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
