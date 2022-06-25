<script setup lang="ts">
import { useTestStore } from "./pinia/stores/TestStore";

const testStore = useTestStore();

function onClickAdd() {
  testStore.messages.push(testStore.message);
  testStore.message = "";
}
</script>

<template>
  <h1>Vue Pinia-Tools</h1>
  <p>
    <input v-model="testStore.message" placeholder="new message" />
    <button @click="onClickAdd">Add message</button>
  </p>
  <h2>Messages</h2>
  <sl>
    <li v-for="(message, index) in testStore.messages" :key="index">
      {{ message }}
    </li>
  </sl>
</template>
