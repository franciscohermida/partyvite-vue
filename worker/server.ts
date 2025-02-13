import { type Connection, Server, routePartykitRequest } from 'partyserver'
import { ExecutionContext, type ExportedHandler } from '@cloudflare/workers-types'

type Env = {
  MyServer: MyServer
}

export class MyServer extends Server<Env> {
  onMessage(connection: Connection<unknown>, message: string) {
    console.log('message from client:', message)
    connection.send('hello from the server!')
  }
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    return (
      (await routePartykitRequest(request, env)) ||
      new Response('Not found', {
        status: 404,
      })
    )
  },
} satisfies ExportedHandler<Env>
