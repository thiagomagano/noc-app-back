import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.json({
    ok: true,
    message: "N.O.C.U FUTSAL TEAM"
  })
})

const port = 3131
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
