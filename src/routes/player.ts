import { Hono } from "hono";
import { z } from "zod";
import { db } from "@/db/db";
import { playersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

const playersRouter = new Hono();

// Definição do schema de validação com Zod
const playerSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  phone: z.string(),
  position: z.enum(["linha", "goleiro"]),
  skillLevel: z.enum(["1", "2", "3", "4", "5"]),
  winsCount: z.number().optional(),
  shirtNumber: z.number().optional(),
  image: z.string().url().optional(),
});

playersRouter.get("/list", async (c) => {
  try {
    const allPlayers = await db.select().from(playersTable);
    return c.json({ players: allPlayers });
  } catch (error) {
    return c.json({ error }, 500);
  }
});

playersRouter.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");

    const idSchema = z.coerce.number();

    idSchema.parse(id);

    //logica pra achar o jogador findUnique(id)

    const player = await db
      .select()
      .from(playersTable)
      .where(eq(playersTable.id, Number(id)));

    if (!player.length) {
      return c.json({ error: "Jogador não encontrado" }, 404);
    }

    return c.json({ player: player[0] });
  } catch (error) {
    return c.json({ error }, 400);
  }
});

playersRouter.post("/create", async (c) => {
  try {
    const body = await c.req.json();

    // Validação dos dados
    const playerData = playerSchema.parse(body);

    // Inserção no banco de dados
    const [newPlayer] = await db
      .insert(playersTable)
      .values(playerData)
      .returning();

    return c.json(
      { message: "Jogador criado com sucesso!", player: newPlayer },
      201
    );
  } catch (error) {
    return c.json({ error, mensage: "não foi possível criar jogador" }, 400);
  }
});

export default playersRouter;
