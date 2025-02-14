import { Server, type Connection, routePartykitRequest } from 'partyserver'

export class MyServer extends Server<Env> {
  async onMessage(connection: Connection, message: string) {
    console.log('message from client:', message)
    const response = 'Hello, from the server!'
    let currentMessage = ''

    // Send growing message with random delays
    for (const letter of response) {
      await new Promise((resolve) => setTimeout(resolve, 50 + Math.random() * 150))
      currentMessage += letter
      connection.send(currentMessage)
    }
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
