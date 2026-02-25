<script setup lang="ts">
import { ref } from 'vue';
import Counterbuttton from './Componenets/Counterbuttton.vue';
import UserCard from './Componenets/UserCard.vue';

const message = ref("Hello");
const count = ref(0);
const username = ref("tOM Brown");
const userage = ref(30);

function reversestring() {
  message.value = message.value.split('').reverse().join('');
}

function increaseCounter() {
  count.value++;
}

</script>

<template>
  <div>
    <h1>Welcome to Vue {{ message }}</h1>
    <h2>{{ message }}</h2>
    <div class="button-group">
      <button class="nice-button" @click="reversestring">Reversed</button>
      <button class="nice-button" @click="increaseCounter">
        Counter : {{ userage }}
      </button>
    </div>
    <h2>{{ username }}</h2>
    <input
      id="user-input"
      v-model="username"
      type="text"
      placeholder="Type something..."
    />
  </div>
  
  <UserCard :name="username" :age="userage" />

  <div class="button-group">
    <Counterbuttton />
  </div>

</template>

<style scoped>
h1 {
  color: #42b983;
}

/* button {
  padding: 10px 20px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
} */

/* button:hover {
  background-color: #35495e;
}

.button-group {
  margin-top: 20px;
  display: flex;         
  flex-direction: row;  
  gap: 10px;             
  justify-content: flex-start; 
  display: flex;
} */

.button-group {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  gap: 12px;
  justify-content: flex-start;
  align-items: center;
}

button {
  /* Modern Styling */
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  
  /* Shadow & Transition */
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease-in-out;
  outline: none;
}

/* Hover & Active States */
button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.4);
  filter: brightness(1.1);
}

button:active {
  transform: translateY(0);
  filter: brightness(0.9);
}

/* Focus state for accessibility */
button:focus-visible {
  outline: 2px solid #6366f1;
  outline-offset: 2px;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

</style>