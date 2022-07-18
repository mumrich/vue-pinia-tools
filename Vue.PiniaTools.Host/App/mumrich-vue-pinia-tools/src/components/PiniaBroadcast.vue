<script setup lang="ts">
import { ref } from "vue";
import { useBroadcastTestStore } from "../pinia/stores/TestStore"
import { v4 as uuidv4 } from "uuid";

const uid = uuidv4();
const newMessage = ref(`hello from ${uid}`);
const testStore = useBroadcastTestStore();

function sendMessage() {
    testStore.messages.push(newMessage.value)
}
</script>

<template>
    <p>
        <input v-model="newMessage" @keyup.enter="sendMessage" />
        <button @click="sendMessage">Send</button>
    </p>
    <ol>
        <li v-for="(m, i) in testStore.messages" :key="i">{{ m }}</li>
    </ol>
</template>