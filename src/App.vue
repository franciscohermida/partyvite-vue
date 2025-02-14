<script setup lang="ts">
import PartySocket from 'partysocket'
import { onUnmounted } from 'vue'

const ws = new PartySocket({
  host: window.location.host,
  room: 'room1',
  party: 'my-server',
})

ws.send('hello from the client!')

const controller = new AbortController()
ws.addEventListener(
  'message',
  (message) => {
    console.log('message from server:', message.data)
  },
  controller,
)
onUnmounted(() => {
  controller.abort()
})
</script>

<template>
  <div>
    <h1>Hello, browser!</h1>
  </div>
</template>
