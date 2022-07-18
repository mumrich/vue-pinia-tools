<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";
import { useBroadcastBroker } from "../helpers/BroadcastHelper"
import { ref } from "vue";

const uid = uuidv4();
const newMessage = ref(`hello from ${uid}`);

const messageBroker = useBroadcastBroker({
    name: "gugus"
});

const messages = ref<string[]>([]);

function sendMessage() {
    messageBroker.post(newMessage.value);
}

messageBroker.data.subscribe((newReceivedMessage) => messages.value.push(newReceivedMessage));

</script>

<template>
    <p>
        <input v-model="newMessage" @keyup.enter="sendMessage" />
        <button @click="sendMessage">Send</button>
    </p>
    <ol>
        <li v-for="(m, i) in messages" :key="i">{{ m }}</li>
    </ol>
</template>

<style scoped>
input {
    width: 50%;
}
</style>