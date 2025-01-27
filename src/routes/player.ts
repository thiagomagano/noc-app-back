import { Hono } from "hono";
import { z } from "zod";
import { db } from "@/db/db";
import { playersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { IdParamsSchema } from "stoker/openapi/schemas";

const playersRouter = new Hono();

// Definição do schema de validação com Zod
const playerSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  phone: z.string(),
  position: z.enum(["linha", "goleiro"]),
  skillLevel: z.enum(["1", "2", "3", "4", "5"]),
  winsCount: z.number().optional(),
  gamesPlayed: z.number().optional(),
  shirtNumber: z.number().optional(),
  image: z.string().url().optional(),
});

const idSchema = z.coerce.number();

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

    c;

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

playersRouter.patch("/:id", async (c) => {
  const updatePlayerSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").optional(),
    phone: z.string().optional(),
    position: z.enum(["linha", "goleiro"]).optional(),
    skillLevel: z.enum(["1", "2", "3", "4", "5"]).optional(),
    winsCount: z.number().optional(),
    gamesPlayed: z.number().optional(),
    shirtNumber: z.number().optional(),
    image: z.string().url().optional(),
  });

  try {
    const id = c.req.param("id");
    const body = await c.req.json();

    idSchema.parse(id);

    const updateData = updatePlayerSchema.parse(body);

    const existingPlayer = await db
      .select()
      .from(playersTable)
      .where(eq(playersTable.id, Number(id)));

    if (!existingPlayer.length) {
      return c.json({ error: "jogador não encontrado" }, 404);
    }
    const [updatedPlayer] = await db
      .update(playersTable)
      .set(updateData)
      .where(eq(playersTable.id, Number(id)))
      .returning();

    return c.json(
      { message: "Jogador atualizado com sucesso!", player: updatedPlayer },
      202
    );
  } catch (error) {
    return c.json({ error }, 400);
  }
});

playersRouter.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id");

    idSchema.parse(id);

    const existingPlayer = await db
      .select()
      .from(playersTable)
      .where(eq(playersTable.id, Number(id)));

    if (!existingPlayer.length) {
      return c.json({ error: "Jogador não encontrado" }, 404);
    }

    await db.delete(playersTable).where(eq(playersTable.id, Number(id)));

    return c.json({ message: "Jogador deletado com sucesso!" });
  } catch (error) {
    return c.json({ error: error || "Erro ao deletar jogador" }, 400);
  }
});

export default playersRouter;
