import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CartItem, Product } from '@/types'

export const useCartStore = defineStore('cart', () => {
    const items = ref<CartItem[]>([])

    const totalItems = computed<number>(() => items.value.reduce((s, i) => s + i.qty, 0))
    const subtotal = computed<number>(() => items.value.reduce((s, i) => s + i.price * i.qty, 0))

    function addItem(product: Product): void {
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

    function removeItem(id: number): void {
        items.value = items.value.filter(i => i.id !== id)
    }

    function updateQty(id: number, qty: number): void {
        const item = items.value.find(i => i.id === id)
        if (item) {
            if (qty <= 0) removeItem(id)
            else item.qty = qty
        }
    }

    function clearCart(): void {
        items.value = []
    }

    return { items, totalItems, subtotal, addItem, removeItem, updateQty, clearCart }
})