<script setup lang="ts">
import { ref } from 'vue';  
const count = ref(0);
function increaseCounter() {
  count.value++;
}
</script>

<template>
  <button @click="increaseCounter">
    Counter : {{ count }}
  </button>
</template>