import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()
app.use('/', cors({
  origin: 'https://noc.thiagomagano.com',
  allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests'],
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
  maxAge: 600,
  credentials: true,
}))

app.get('/', (c) => {
  return c.json({
    ok: true,
    message: "N.O.C.U FUTSAL TEAM CORS"
  })
})

app.get('/player/:id', (c) => {
  const id = c.req.param('id')

  return c.json({
    status: 200,
    message: "Jogador Requisitado",
    id: id
  })
})

const port = 3131
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
