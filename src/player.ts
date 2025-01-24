import { Hono } from "hono";

const app = new Hono();

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
