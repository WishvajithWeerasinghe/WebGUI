import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
    const items = ref([])

    const totalItems = computed(() => items.value.reduce((s, i) => s + i.qty, 0))
    const subtotal = computed(() => items.value.reduce((s, i) => s + i.price * i.qty, 0))

    function addItem(product) {
        const existing = items.value.find(i => i.id === product.id)
        if (existing) {
            existing.qty++
        } else {
            items.value.push({
                id: product.id,
                title: product.title,
                category: product.category,
                thumbnail: product.thumbnail,
                price: product.price,
                qty: 1,
            })
        }
    }

    function removeItem(id) {
        items.value = items.value.filter(i => i.id !== id)
    }

    function updateQty(id, qty) {
        const item = items.value.find(i => i.id === id)
        if (item) {
            if (qty <= 0) removeItem(id)
            else item.qty = qty
        }
    }

    function clearCart() {
        items.value = []
    }

    return { items, totalItems, subtotal, addItem, removeItem, updateQty, clearCart }
})
