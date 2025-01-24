import createApp from "@/lib/create-app";

const app = createApp();

// TODO: Importar Rotas

app.get("/", (c) => {
  return c.json({
    ok: true,
    message: "N.O.C.U FUTSAL",
  });
});

app.get("/error", (c) => {
  c.status(422);
  throw new Error("OH NO!");
});

export default app;
