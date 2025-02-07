import { Hono } from "hono";
import { z } from "zod";
import db from "@/db";
import { players } from "@/db/schema";
import { eq } from "drizzle-orm";

const playersRouter = new Hono();

const playerSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  phone: z.string(),
  position: z.boolean(),
  skill: z.number().int().min(1).max(5),
  stamina: z.number().int().min(1).max(5),
  shirt: z.number().int().min(1).max(99),
  image: z.string().url().optional(),
});

const idSchema = z.coerce.number();

playersRouter.get("/", async (c) => {
  try {
    const allPlayers = await db.select().from(players);
    return c.json({ players: allPlayers });
  } catch (error) {
    return c.json({ error }, 500);
  }
});

playersRouter.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");

    idSchema.parse(id);

    const player = await db
      .select()
      .from(players)
      .where(eq(players.id, Number(id)));

    if (!player.length) {
      return c.json({ error: "Jogador não encontrado" }, 404);
    }

    return c.json({ player: player[0] });
  } catch (error) {
    return c.json({ error }, 400);
  }
});

playersRouter.post("/", async (c) => {
  try {
    const body = await c.req.json();

    // Validação dos dados
    const playerData = playerSchema.parse(body);

    // Inserção no banco de dados
    //@ts-ignore
    const [newPlayer] = await db.insert(players).values(playerData).returning();

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
    position: z.boolean().optional(),
    skill: z.number().int().min(1).max(5).optional(),
    stamina: z.number().int().min(1).max(5).optional(),
    shirt: z.number().int().min(1).max(99).optional(),
    image: z.string().url().optional(),
  });

  try {
    const id = c.req.param("id");
    const body = await c.req.json();

    idSchema.parse(id);

    const updateData = updatePlayerSchema.parse(body);

    const existingPlayer = await db
      .select()
      .from(players)
      .where(eq(players.id, Number(id)));

    if (!existingPlayer.length) {
      return c.json({ error: "jogador não encontrado" }, 404);
    }
    const [updatedPlayer] = await db
      .update(players)
      .set(updateData)
      .where(eq(players.id, Number(id)))
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
      .from(players)
      .where(eq(players.id, Number(id)));

    if (!existingPlayer.length) {
      return c.json({ error: "Jogador não encontrado" }, 404);
    }

    await db.delete(players).where(eq(players.id, Number(id)));

    return c.json({ message: "Jogador deletado com sucesso!" });
  } catch (error) {
    return c.json({ error: error || "Erro ao deletar jogador" }, 400);
  }
});

export default playersRouter;
