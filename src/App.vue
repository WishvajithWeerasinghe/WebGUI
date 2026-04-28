<template>
  <HexanHero />
  <HexanSections />
  <HexanCategories />
</template>

<script setup>
import HexanHero from './Componenets/HexanHero.vue'
import HexanSections from './Componenets/HexanSections.vue';
import HexanCategories from './Componenets/HexanCategories.vue';
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  cursor: none;
  overflow-x: hidden;
}
</style>