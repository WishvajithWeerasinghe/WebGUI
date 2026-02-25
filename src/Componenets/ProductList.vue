<script setup lang="ts">
import { ref , onMounted } from 'vue';

interface Product {
  id: number;
  name: string;
  price: number;
}

const product = ref<Product[]>([]);
const isLoading = ref(true);
</script>