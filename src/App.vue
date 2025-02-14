<script setup lang="ts">
import PartySocket from 'partysocket'
import { onUnmounted, ref } from 'vue'
import confetti from 'canvas-confetti'

const ws = new PartySocket({
  host: window.location.host,
  room: 'room1',
  party: 'my-server',
})
const msg = ref('Hello, from browser!')
const serverMsg = ref('')

function sendMsg() {
  ws.send('Hello, from browser!')
}

const controller = new AbortController()
ws.addEventListener(
  'message',
  (message) => {
    console.log('message from server:', message.data)
    serverMsg.value = message.data
    if (message.data.includes('server!')) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  },
  controller,
)
onUnmounted(() => {
  controller.abort()
})
</script>

<template>
  <div class="w-screen h-screen align-middle flex flex-col gap-2 justify-center items-center">
    <div>
      <h1 class="text-xl font-medium">Vue 🟢 + Partykit 🎈 + Vite ⚡</h1>
    </div>
    <div>
      <input v-model="msg" class="border py-1 px-2" />
      <button
        class="bg-neutral-100 px-2 py-1 border border-neutral-200 hover:bg-neutral-200 active:bg-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-300 transition-colors duration-150"
        @click="sendMsg"
      >
        Send Message
      </button>
    </div>
    <div>
      <p>{{ serverMsg }}</p>
    </div>
  </div>
</template>
