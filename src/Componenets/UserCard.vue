<script setup lang="ts">
defineProps<{
  name : string;
  age : number; 
}>();
</script>

<template>
  <div class="user-card">
    <h3>User Profile</h3>
    <p><strong>Name: {{ name }}</strong></p>
    <p><strong>Age: {{ age }} yearws old</strong></p>
  </div>
</template>

<style scoped>
.user-card {
  /* Layout & Sizing */
  max-width: 300px;
  padding: 24px;
  margin: 20px auto;
  
  /* Visual Style */
  background-color: #ffffff;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  
  /* Modern Shadow */
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 
              0 8px 10px -6px rgba(0, 0, 0, 0.05);
  
  /* Typography */
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  color: #1f2937;
  transition: transform 0.3s ease;
}

/* Hover effect to make it feel interactive */
.user-card:hover {
  transform: translateY(-5px);
}

.user-card h3 {
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 1.25rem;
  color: #4f46e5; /* A nice indigo brand color */
  border-bottom: 2px solid #f3f4f6;
  padding-bottom: 8px;
}

.user-card p {
  margin: 8px 0;
  font-size: 0.95rem;
  line-height: 1.5;
}

.user-card strong {
  color: #4b5563;
  font-weight: 600;
}
</style>