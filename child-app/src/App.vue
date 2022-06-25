<script setup lang="ts">
import { ref } from "vue";
import { useTestStore } from "../../mumrich-vue-pinia-tools/src/pinia/stores/TestStore";
const testStore = useTestStore();
function onClickAdd() {
  testStore.messages.push(testStore.message);
  testStore.message = "";
}
const href = ref(window.location.href);
</script>

<template>
  <p>{{ href }}</p>
  <h1>Child App</h1>
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
</template>
