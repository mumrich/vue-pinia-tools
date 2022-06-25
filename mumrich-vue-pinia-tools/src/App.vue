<script setup lang="ts">
import { useTestStore } from "./pinia/stores/TestStore";

const testStore = useTestStore();

function onClickAdd() {
  testStore.messages.push(testStore.message);
  testStore.message = "";
}
</script>

<template>
  <div
    style="
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: space-around;
    "
  >
    <div>
      <h1>Vue Pinia-Tools</h1>
      <p>
        <input v-model="testStore.message" placeholder="new message" />
        <button @click="onClickAdd">Add message</button>
      </p>
      <h2>Messages</h2>
      <ol>
        <li v-for="(message, index) in testStore.messages" :key="index">
          {{ message }}
        </li>
      </ol>
    </div>
    <div>
      <p>
        <iframe src="http://localhost:8989/" />
      </p>
    </div>
  </div>
</template>

<style scoped>
iframe {
  width: 100%;
  height: 500px;
}
</style>
