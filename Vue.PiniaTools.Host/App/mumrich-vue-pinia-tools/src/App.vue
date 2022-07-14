<script setup lang="ts">
import { ref } from "vue";
import { useTestStore } from "./pinia/stores/TestStore";

const iframeBaseUrl = ref(window.location.origin);
const testStore = useTestStore();

function onClickAdd() {
    testStore.messages.push(testStore.message);
    testStore.message = "";
}
</script>

<template>
    <div style="
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: space-around;
    ">
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
                <iframe title="child-app" :src="`${iframeBaseUrl}/child-app`" />
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
