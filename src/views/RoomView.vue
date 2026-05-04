<template>
    <div class="page-wrapper">
        <!-- NAV -->
        <nav class="nav">
            <RouterLink to="/" class="logo-wrap">
                <img src="@/assets/logo.png" alt="Hexan Logo" class="nav-logo" />
            </RouterLink>
            <div class="nav-links">
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/products">Products</RouterLink>
                <RouterLink to="/room" class="active">Room</RouterLink>
                <RouterLink to="/about">About us</RouterLink>
            </div>
            <div class="nav-icons">
                <button aria-label="Search" @click="$router.push('/products')"><svg viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="1.8">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg></button>
                <button aria-label="Cart" @click="$router.push('/shipping')" style="position:relative">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 01-8 0" />
                    </svg>
                    <span v-if="cart.totalItems > 0" class="cart-badge">{{ cart.totalItems }}</span>
                </button>
                <button aria-label="Menu" @click="menuDrawerRef.openMenu()"><svg viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="1.8">
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg></button>
            </div>
        </nav>

        <!-- BREADCRUMB -->
        <div class="breadcrumb">
            <RouterLink to="/">Home</RouterLink> /
            <span>Your room with a View</span>
        </div>

        <div class="page-body">
            <!-- MAIN CONTENT -->
            <main class="main-content">
                <h1 class="page-title">Visualize the Possibilities in Your Own Home</h1>

                <!-- Upload Button -->
                <label class="upload-btn" for="room-upload">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="16"
                        height="16">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    Upload your room image
                    <input type="file" id="room-upload" accept="image/*" style="display:none" @change="onRoomUpload" />
                </label>

                <!-- ROOM CANVAS -->
                <div class="room-canvas" ref="canvasRef" @dragover.prevent @drop.prevent="onDrop"
                    @mousemove="onMouseMove" @mouseup="onMouseUp">
                    <!-- Room image -->
                    <img v-if="roomImage" :src="roomImage" class="room-bg" alt="Your room" />
                    <div v-else class="room-placeholder">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" width="48"
                            height="48" opacity=".3">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                        </svg>
                        <p>Upload a room photo to get started</p>
                    </div>

                    <!-- Placed furniture items -->
                    <div v-for="item in placedItems" :key="item.uid" class="placed-item"
                        :style="{ left: item.x + 'px', top: item.y + 'px', width: item.w + 'px', zIndex: item.uid === draggingUid ? 99 : 10 }"
                        @mousedown="startDrag($event, item)">
                        <img :src="item.thumbnail" :alt="item.title" class="placed-img" />
                        <button class="placed-remove" @click.stop="removeItem(item.uid)">×</button>
                        <div class="placed-label">{{ item.title }}</div>
                        <!-- Resize handle -->
                        <div class="resize-handle" @mousedown.stop="startResize($event, item)"></div>
                    </div>

                    <!-- AI suggestion overlay -->
                    <div v-if="aiSuggestion" class="ai-overlay">
                        <div class="ai-bubble">
                            <span class="ai-icon">✦</span>
                            <p>{{ aiSuggestion }}</p>
                            <button class="ai-close" @click="aiSuggestion = ''">×</button>
                        </div>
                    </div>
                </div>

                <p class="canvas-hint">You can drag, drop and resize items from the inventory. Directly from below to
                    place items in the list.</p>

                <!-- AI Analyze Button -->
                <button class="btn-analyze" @click="analyzeRoom" :disabled="!roomImage || analyzing">
                    <span v-if="analyzing">
                        <span class="dot-spin"></span> Analyzing your room…
                    </span>
                    <span v-else>✦ Ask AI how this looks</span>
                </button>

                <!-- ORDER INVENTORY -->
                <div class="inventory-section">
                    <h3 class="inventory-title">Order Inventory</h3>

                    <div v-if="loadingProducts" class="inv-loading">Loading products…</div>

                    <div v-else class="inventory-grid">
                        <div v-for="product in shopProducts" :key="product.id" class="inv-card" draggable="true"
                            @dragstart="onDragStart($event, product)" @click="addToCanvas(product)"
                            :title="'Drag or click to place in room'">
                            <div class="inv-img-wrap">
                                <img :src="product.thumbnail" :alt="product.title" class="inv-img" />
                                <div class="inv-drag-hint">Drag to room</div>
                            </div>
                            <p class="inv-name">{{ product.title }}</p>
                            <p class="inv-cat">{{ product.category }}</p>
                            <p class="inv-price">${{ product.price }}</p>
                        </div>
                    </div>

                    <!-- Selected Items for order -->
                    <div v-if="placedItems.length > 0" class="order-summary">
                        <h4 class="order-summary-title">Selected for Order</h4>
                        <div class="order-items">
                            <div v-for="item in uniquePlacedItems" :key="item.id" class="order-item">
                                <img :src="item.thumbnail" :alt="item.title" class="order-thumb" />
                                <div class="order-info">
                                    <p class="order-name">{{ item.title }}</p>
                                    <p class="order-price">${{ item.price }}</p>
                                </div>
                                <button class="order-remove" @click="removePlacedItem(item.id)">×</button>
                            </div>
                        </div>
                        <button class="btn-place-order" @click="placeOrder">PLACE ORDER →</button>
                    </div>
                </div>

                <!-- BLOG NAV -->
                <div class="blog-nav">
                    <div class="blog-nav-item">
                        <span class="blog-nav-label">Back</span>
                        <p class="blog-nav-title">New furniture products</p>
                    </div>
                    <div class="blog-nav-item right">
                        <span class="blog-nav-label">Next</span>
                        <p class="blog-nav-title">Furniture for your office natural material</p>
                    </div>
                </div>

                <!-- COMMENT FORM -->
                <div class="comment-section">
                    <h3 class="comment-title">Post a comment</h3>
                    <textarea v-model="comment.text" placeholder="Your comment" class="comment-textarea"
                        rows="5"></textarea>
                    <input v-model="comment.name" type="text" placeholder="Your name" class="comment-input" />
                    <input v-model="comment.email" type="email" placeholder="Your email" class="comment-input" />
                    <input v-model="comment.website" type="url" placeholder="website" class="comment-input" />
                    <label class="comment-check">
                        <input type="checkbox" v-model="comment.save" />
                        <span>Save my name, email, and website in this browser for the next time I comment.</span>
                    </label>
                    <button class="btn-submit">Submit</button>
                </div>
            </main>

            <!-- SIDEBAR -->
            <aside class="sidebar">
                <!-- Search -->
                <div class="sidebar-search">
                    <input type="text" placeholder="search..." class="sidebar-input" />
                    <button class="sidebar-search-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16"
                            height="16">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </button>
                </div>

                <!-- Featured Post -->
                <div class="sidebar-post">
                    <h4 class="sidebar-post-title">Furnish Your Home Like a Prof</h4>
                    <div class="sidebar-post-img-wrap">
                        <a href="https://www.greenhousestudio.co/home-garden/how-to-design-room" target="_blank">
                            <img src="https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=400&q=80"
                                alt="blog" class="sidebar-post-img" />
                        </a>
                    </div>
                    <p class="sidebar-post-desc">We are passionate about living design, determined to making the home
                        that everyone "has dreamed." Well, finally we created the range of things, the ultimate guide to
                        help you navigate the wild world of trendy homeware.</p>
                </div>

                <!-- Category -->
                <div class="sidebar-cat">
                    <h4 class="sidebar-cat-title">Category</h4>
                    <ul class="sidebar-cat-list">
                        <li v-for="cat in sidebarCats" :key="cat.label" class="sidebar-cat-item"
                            :class="{ selected: selectedSidebarCat === cat.slug }" @click="filterByCategory(cat.slug)">
                            <span>{{ cat.label }}</span>
                            <span class="cat-count">({{ cat.count }})</span>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>

        <!-- FOOTER -->
        <footer class="footer">
            <div class="footer-grid">
                <div class="footer-brand">
                    <h3 class="footer-logo">Hevan Room</h3>
                    <p class="footer-about">Where aesthetic beauty meets effortless utility. We combine premium
                        craftsmanship with premium materials to create furniture that elevates your home and stands the
                        test of time in both style and comfort.</p>
                </div>
                <div class="footer-col">
                    <h4 class="footer-col-title">About Us</h4>
                    <ul class="footer-links">
                        <li><a href="#">Products</a></li>
                        <li><a href="#">Room</a></li>
                        <li><a href="#">Chairs</a></li>
                        <li><a href="#">Tables</a></li>
                        <li><a href="#">Sofas</a></li>
                        <li><a href="#">Room accessories</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4 class="footer-col-title">Useful</h4>
                    <ul class="footer-links">
                        <li><a href="#">Instagram</a></li>
                        <li><a href="#">Facebook</a></li>
                        <li><a href="#">Twitter</a></li>
                        <li><a href="#">Pinterest</a></li>
                        <li><a href="#">Youtube</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4 class="footer-col-title">Download</h4>
                    <ul class="footer-links">
                        <li><a href="#">AppStore</a></li>
                        <li><a href="#">Google Play</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4 class="footer-col-title">Call Center</h4>
                    <p class="footer-about">Have a question? Our design experts are ready to assist you with your
                        interior journey.</p>
                    <p class="footer-contact">Support Hours: Mon–Sat, 9 AM – 6 PM</p>
                    <p class="footer-contact">hexanroom@gmail.com</p>
                    <p class="footer-contact">+07 81320456</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>© 2024 Hevan Room. All rights reserved.</p>
            </div>
        </footer>
    </div>

    <MenuDrawer ref="menuDrawerRef" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import MenuDrawer from '@/Componenets/MenuDrawer.vue'
import { useCartStore } from '@/stores/cartStore'
import { useRouter } from 'vue-router'
import type { Product, ProductsResponse, PlacedItem, SidebarCategory, CommentForm } from '@/types'

const cart = useCartStore()
const router = useRouter()
const menuDrawerRef = ref<InstanceType<typeof MenuDrawer> | null>(null)

const roomImage = ref<string | null>(null)
const roomImageBase64 = ref<string | null>(null)
const placedItems = ref<PlacedItem[]>([])
const shopProducts = ref<Product[]>([])
const loadingProducts = ref<boolean>(true)
const analyzing = ref<boolean>(false)
const aiSuggestion = ref<string>('')
const canvasRef = ref<HTMLDivElement | null>(null)
const draggingUid = ref<number | null>(null)
const draggingProduct = ref<Product | null>(null)
const selectedSidebarCat = ref<string>('')

let dragOffsetX: number = 0
let dragOffsetY: number = 0
let resizingItem: PlacedItem | null = null
let resizeStartX: number = 0
let resizeStartW: number = 0
let uidCounter: number = 0

const comment = ref<CommentForm>({ text: '', name: '', email: '', website: '', save: false })

const sidebarCats: SidebarCategory[] = [
    { label: 'All Furniture', slug: '', count: 21 },
    { label: 'Sofas', slug: 'sofas', count: 20 },
    { label: 'Bedroom', slug: 'bedroom-furniture', count: 20 },
    { label: 'Tables', slug: 'tables', count: 18 },
    { label: 'Lighting', slug: 'lighting', count: 16 },
    { label: 'Decoration', slug: 'home-decoration', count: 28 },
]

const uniquePlacedItems = computed<PlacedItem[]>(() => {
    const seen = new Set<number>()
    return placedItems.value.filter(i => {
        if (seen.has(i.id)) return false
        seen.add(i.id)
        return true
    })
})

function onRoomUpload(e: Event): void {
    const input = e.target as HTMLInputElement
    const file = input.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev: ProgressEvent<FileReader>) => {
        const result = ev.target?.result
        if (typeof result !== 'string') return
        roomImage.value = result
        roomImageBase64.value = result.split(',')[1] ?? null
    }
    reader.readAsDataURL(file)
}

function onDragStart(e: DragEvent, product: Product): void {
    draggingProduct.value = product
    if (e.dataTransfer) e.dataTransfer.effectAllowed = 'copy'
}

function onDrop(e: DragEvent): void {
    if (!draggingProduct.value || !canvasRef.value) return
    const rect = canvasRef.value.getBoundingClientRect()
    const x = e.clientX - rect.left - 60
    const y = e.clientY - rect.top - 60
    placedItems.value.push({
        uid: ++uidCounter,
        id: draggingProduct.value.id,
        title: draggingProduct.value.title,
        thumbnail: draggingProduct.value.thumbnail,
        price: draggingProduct.value.price,
        x: Math.max(0, x),
        y: Math.max(0, y),
        w: 120,
    })
    draggingProduct.value = null
}

function addToCanvas(product: Product): void {
    if (!canvasRef.value) return
    placedItems.value.push({
        uid: ++uidCounter,
        id: product.id,
        title: product.title,
        thumbnail: product.thumbnail,
        price: product.price,
        x: 20 + (placedItems.value.length * 20) % 200,
        y: 20 + (placedItems.value.length * 20) % 150,
        w: 120,
    })
}

function placeOrder(): void {
    uniquePlacedItems.value.forEach(item => cart.addItem(item as unknown as Product))
    router.push('/shipping')
}

function removePlacedItem(id: number): void {
    placedItems.value = placedItems.value.filter(i => i.id !== id)
}

function startDrag(e: MouseEvent, item: PlacedItem): void {
    const target = e.target as HTMLElement
    if (target.classList.contains('resize-handle') || target.classList.contains('placed-remove')) return
    draggingUid.value = item.uid
    if (!canvasRef.value) return
    const rect = canvasRef.value.getBoundingClientRect()
    dragOffsetX = e.clientX - rect.left - item.x
    dragOffsetY = e.clientY - rect.top - item.y
    e.preventDefault()
}

function onMouseMove(e: MouseEvent): void {
    if (!canvasRef.value) return
    const rect = canvasRef.value.getBoundingClientRect()
    if (draggingUid.value !== null) {
        const item = placedItems.value.find(i => i.uid === draggingUid.value)
        if (item) {
            item.x = Math.max(0, Math.min(rect.width - item.w, e.clientX - rect.left - dragOffsetX))
            item.y = Math.max(0, Math.min(rect.height - 80, e.clientY - rect.top - dragOffsetY))
        }
    }
    if (resizingItem) {
        const dx = e.clientX - resizeStartX
        resizingItem.w = Math.max(60, Math.min(300, resizeStartW + dx))
    }
}

function onMouseUp(): void {
    draggingUid.value = null
    resizingItem = null
}

function startResize(e: MouseEvent, item: PlacedItem): void {
    resizingItem = item
    resizeStartX = e.clientX
    resizeStartW = item.w
    e.preventDefault()
}

function removeItem(uid: number): void {
    placedItems.value = placedItems.value.filter(i => i.uid !== uid)
}

async function analyzeRoom(): Promise<void> {
    if (!roomImage.value) return
    analyzing.value = true
    aiSuggestion.value = ''
    try {
        const itemNames: string = uniquePlacedItems.value.map(i => i.title).join(', ') || 'no furniture yet'
        const messages = [
            {
                role: 'user',
                content: roomImageBase64.value
                    ? [
                        { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: roomImageBase64.value } },
                        { type: 'text', text: `You are an interior design AI assistant. The user has placed these furniture items in their room: ${itemNames}. Look at the room image and give a short 2-sentence suggestion on how the furniture fits and what could be improved. Be warm, specific, and actionable.` }
                    ]
                    : [{ type: 'text', text: `Give a short interior design tip for placing: ${itemNames}` }]
            }
        ]
        const res = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1000, messages })
        })
        const data = await res.json()
        aiSuggestion.value = data.content?.[0]?.text || 'Looking great! Consider balancing the furniture arrangement for better flow.'
    } catch (e) {
        aiSuggestion.value = 'The arrangement looks balanced. Try adding a rug to anchor the seating area.'
    } finally {
        analyzing.value = false
    }
}

async function fetchProducts(): Promise<void> {
    try {
        const categories: string[] = ['furniture', 'sofas', 'bedroom-furniture', 'lighting', 'home-decoration']
        const results: ProductsResponse[] = await Promise.all(
            categories.map(cat =>
                fetch(`https://dummyjson.com/products/category/${cat}?limit=4`).then(r => r.json())
            )
        )
        shopProducts.value = results.flatMap(d => d.products).slice(0, 12)
    } catch (e) {
        console.error(e)
    } finally {
        loadingProducts.value = false
    }
}

async function filterByCategory(slug: string): Promise<void> {
    selectedSidebarCat.value = slug
    loadingProducts.value = true
    try {
        if (!slug) {
            const categories: string[] = ['furniture', 'sofas', 'bedroom-furniture', 'lighting', 'home-decoration']
            const results: ProductsResponse[] = await Promise.all(
                categories.map(cat =>
                    fetch(`https://dummyjson.com/products/category/${cat}?limit=4`).then(r => r.json())
                )
            )
            shopProducts.value = results.flatMap(d => d.products).slice(0, 12)
        } else {
            const res = await fetch(`https://dummyjson.com/products/category/${slug}?limit=12`)
            const data: ProductsResponse = await res.json()
            shopProducts.value = data.products
        }
    } catch (e) {
        console.error(e)
    } finally {
        loadingProducts.value = false
    }
}

onMounted(() => {
    fetchProducts()
    window.addEventListener('mouseup', onMouseUp)
})
onUnmounted(() => window.removeEventListener('mouseup', onMouseUp))
</script>

<style scoped>
.page-wrapper {
    background: #faf6f0;
    min-height: 100vh;
    font-family: 'Jost', sans-serif;
}

/* NAV */
.nav {
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 48px;
    background: rgba(232, 217, 196, .92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(180, 140, 100, .2);
}

.nav-logo {
    height: 40px;
    object-fit: contain;
}

.nav-links {
    display: flex;
    gap: 32px;
}

.nav-links a {
    font-size: 14px;
    letter-spacing: .06em;
    color: #2b1f14;
    text-decoration: none;
    position: relative;
    transition: color .3s;
}

.nav-links a:hover,
.nav-links a.active {
    color: #b85c38;
}

.nav-links a::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 0;
    height: 1px;
    background: #b85c38;
    transition: width .3s;
}

.nav-links a:hover::after,
.nav-links a.active::after {
    width: 100%;
}

.nav-icons {
    display: flex;
    gap: 20px;
}

.nav-icons button {
    background: none;
    border: none;
    cursor: pointer;
    color: #2b1f14;
    transition: color .3s;
}

.nav-icons button:hover {
    color: #b85c38;
}

.nav-icons svg {
    width: 20px;
    height: 20px;
}

/* BREADCRUMB */
.breadcrumb {
    padding: 14px 48px;
    font-size: 11px;
    color: #7a6050;
    letter-spacing: .04em;
}

.breadcrumb a {
    color: #7a6050;
    text-decoration: none;
}

.breadcrumb a:hover {
    color: #b85c38;
}

/* LAYOUT */
.page-body {
    display: grid;
    grid-template-columns: 1fr 260px;
    gap: 48px;
    padding: 0 48px 80px;
    max-width: 1200px;
    margin: 0 auto;
}

/* MAIN */
.main-content {
    min-width: 0;
}

.page-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(20px, 2.5vw, 28px);
    font-weight: 600;
    color: #2b1f14;
    margin-bottom: 20px;
    line-height: 1.3;
}

/* UPLOAD BUTTON */
.upload-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #b07060;
    color: #f5ede0;
    font-size: 12px;
    font-family: 'Jost', sans-serif;
    letter-spacing: .08em;
    padding: 10px 20px;
    cursor: pointer;
    margin-bottom: 16px;
    transition: background .3s;
    border: none;
}

.upload-btn:hover {
    background: #2b1f14;
}

/* ROOM CANVAS */
.room-canvas {
    position: relative;
    width: 100%;
    height: 380px;
    background: #e8e0d4;
    overflow: hidden;
    margin-bottom: 10px;
    border: 1px solid rgba(180, 140, 100, .2);
    user-select: none;
    resize: vertical;
}

.room-bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    pointer-events: none;
}

.room-placeholder {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    color: #a09080;
    font-size: 13px;
    letter-spacing: .04em;
}

/* Placed items */
.placed-item {
    position: absolute;
    cursor: grab;
    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, .3));
}

.placed-item:active {
    cursor: grabbing;
}

.placed-img {
    width: 100%;
    height: auto;
    display: block;
    pointer-events: none;
}

.placed-remove {
    position: absolute;
    top: -8px;
    right: -8px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #b85c38;
    color: #fff;
    border: none;
    font-size: 14px;
    line-height: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity .2s;
}

.placed-item:hover .placed-remove {
    opacity: 1;
}

.placed-label {
    position: absolute;
    bottom: -20px;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 9px;
    color: #f5ede0;
    background: rgba(43, 31, 20, .7);
    padding: 2px 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    opacity: 0;
    transition: opacity .2s;
}

.placed-item:hover .placed-label {
    opacity: 1;
}

.resize-handle {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 14px;
    height: 14px;
    background: #b85c38;
    cursor: se-resize;
    opacity: 0;
    transition: opacity .2s;
}

.placed-item:hover .resize-handle {
    opacity: 1;
}

/* AI overlay */
.ai-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: flex-end;
    padding: 16px;
    pointer-events: none;
}

.ai-bubble {
    background: rgba(43, 31, 20, .88);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(201, 173, 147, .3);
    border-radius: 4px;
    padding: 14px 16px;
    max-width: 420px;
    display: flex;
    gap: 10px;
    align-items: flex-start;
    pointer-events: all;
}

.ai-icon {
    color: #c9ad93;
    font-size: 16px;
    flex-shrink: 0;
    margin-top: 2px;
}

.ai-bubble p {
    font-size: 12.5px;
    color: #f5ede0;
    line-height: 1.65;
    flex: 1;
}

.ai-close {
    background: transparent;
    border: none;
    color: #c9ad93;
    cursor: pointer;
    font-size: 18px;
    padding: 0;
    line-height: 1;
    flex-shrink: 0;
}

.canvas-hint {
    font-size: 11px;
    color: #a09080;
    letter-spacing: .03em;
    margin-bottom: 14px;
}

/* AI Button */
.btn-analyze {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    border: 1.5px solid #b85c38;
    color: #b85c38;
    font-size: 12px;
    font-family: 'Jost', sans-serif;
    letter-spacing: .1em;
    padding: 10px 22px;
    cursor: pointer;
    margin-bottom: 32px;
    transition: background .3s, color .3s;
}

.btn-analyze:hover:not(:disabled) {
    background: #b85c38;
    color: #f5ede0;
}

.btn-analyze:disabled {
    opacity: .5;
    cursor: not-allowed;
}

.dot-spin {
    display: inline-block;
    width: 10px;
    height: 10px;
    border: 1.5px solid #b85c38;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin .7s linear infinite;
    vertical-align: middle;
}

@keyframes spin {
    to {
        transform: rotate(360deg)
    }
}

/* INVENTORY */
.inventory-section {
    margin-bottom: 40px;
}

.inventory-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px;
    font-weight: 600;
    color: #2b1f14;
    margin-bottom: 16px;
}

.inv-loading {
    font-size: 12px;
    color: #7a6050;
    padding: 20px 0;
}

.inventory-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
    margin-bottom: 24px;
}

.inv-card {
    background: var(--bg-card2) !important;
    cursor: grab;
    border: 1.5px solid transparent;
    transition: border-color .2s, transform .2s;
    padding-bottom: 10px;
}

.inv-card:active {
    cursor: grabbing;
}

.inv-card:hover {
    border-color: #b85c38;
    transform: translateY(-2px);
}

.inv-img-wrap {
    position: relative;
    aspect-ratio: 4/3;
    overflow: hidden;
}

.inv-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform .3s;
}

.inv-card:hover .inv-img {
    transform: scale(1.05);
}

.inv-drag-hint {
    position: absolute;
    inset: 0;
    background: rgba(184, 92, 56, .7);
    color: #fff;
    font-size: 11px;
    letter-spacing: .08em;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity .2s;
}

.inv-card:hover .inv-drag-hint {
    opacity: 1;
}

.inv-name {
    font-size: 11px;
    font-weight: 500;
    color: #2b1f14;
    padding: 8px 8px 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.inv-cat {
    font-size: 10px;
    color: #a09080;
    padding: 0 8px 2px;
    text-transform: capitalize;
}

.inv-price {
    font-size: 11px;
    color: #b85c38;
    padding: 0 8px;
    font-weight: 500;
}

/* Order Summary */
.order-summary {
    background: #fff;
    border: 1px solid rgba(180, 140, 100, .2);
    padding: 20px;
    margin-top: 8px;
}

.order-summary-title {
    font-size: 13px;
    font-weight: 600;
    color: #2b1f14;
    margin-bottom: 14px;
    letter-spacing: .06em;
}

.order-items {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
}

.order-item {
    display: flex;
    align-items: center;
    gap: 12px;
}

.order-remove {
    background: transparent;
    border: none;
    color: #a09080;
    font-size: 18px;
    cursor: pointer;
    padding: 0;
    margin-left: auto;
    transition: color .2s;
    line-height: 1;
    flex-shrink: 0;
}

.order-remove:hover {
    color: #b85c38;
}

.order-thumb {
    width: 52px;
    height: 44px;
    object-fit: cover;
    flex-shrink: 0;
}

.order-name {
    font-size: 12px;
    font-weight: 500;
    color: #2b1f14;
    margin-bottom: 3px;
}

.order-price {
    font-size: 12px;
    color: #7a6050;
}

.btn-place-order {
    width: 100%;
    background: #8b3a20;
    color: #f5ede0;
    border: none;
    padding: 14px;
    font-size: 12px;
    font-family: 'Jost', sans-serif;
    letter-spacing: .14em;
    cursor: pointer;
    transition: background .3s;
}

.btn-place-order:hover {
    background: #2b1f14;
}

/* Blog Nav */
.blog-nav {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid rgba(180, 140, 100, .2);
    border-bottom: 1px solid rgba(180, 140, 100, .2);
    padding: 16px 0;
    margin-bottom: 40px;
}

.blog-nav-item {
    max-width: 45%;
}

.blog-nav-item.right {
    text-align: right;
}

.blog-nav-label {
    font-size: 10px;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: #a09080;
    display: block;
    margin-bottom: 4px;
}

.blog-nav-title {
    font-size: 12px;
    color: #2b1f14;
    line-height: 1.4;
}

/* Comment */
.comment-section {}

.comment-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    font-weight: 600;
    color: #2b1f14;
    margin-bottom: 16px;
}

.comment-textarea {
    width: 100%;
    border: 1px solid rgba(180, 140, 100, .35);
    background: #fff;
    padding: 14px;
    font-size: 13px;
    font-family: 'Jost', sans-serif;
    color: #2b1f14;
    resize: vertical;
    outline: none;
    margin-bottom: 12px;
    box-sizing: border-box;
    transition: border-color .2s;
}

.comment-textarea:focus {
    border-color: #b85c38;
}

.comment-input {
    width: 100%;
    border: 1px solid rgba(180, 140, 100, .35);
    background: #fff;
    padding: 12px 14px;
    font-size: 13px;
    font-family: 'Jost', sans-serif;
    color: #2b1f14;
    outline: none;
    margin-bottom: 12px;
    box-sizing: border-box;
    transition: border-color .2s;
}

.comment-input:focus {
    border-color: #b85c38;
}

.comment-check {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    font-size: 11px;
    color: #7a6050;
    line-height: 1.5;
    margin-bottom: 16px;
    cursor: pointer;
}

.btn-submit {
    background: #8b3a20;
    color: #f5ede0;
    border: none;
    padding: 11px 28px;
    font-size: 12px;
    font-family: 'Jost', sans-serif;
    letter-spacing: .1em;
    cursor: pointer;
    transition: background .3s;
}

.btn-submit:hover {
    background: #2b1f14;
}

/* SIDEBAR */
.sidebar {
    background: transparent !important;
}

.sidebar-search {
    display: flex;
    border: 1px solid rgba(180, 140, 100, .35);
    background: #fff;
    margin-bottom: 28px;
}

.sidebar-input {
    flex: 1;
    border: none;
    outline: none;
    padding: 9px 12px;
    font-size: 12px;
    font-family: 'Jost', sans-serif;
    color: #2b1f14;
    background: transparent !important;
}

.sidebar-input::placeholder {
    color: #b8a090;
}

.sidebar-search-btn {
    border: none;
    background: transparent;
    padding: 8px 10px;
    cursor: pointer;
    color: #7a6050;
    display: flex;
    align-items: center;
}

.sidebar-post {
    margin-bottom: 28px;
    background: transparent !important;
}

.sidebar-post-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 15px;
    font-weight: 600;
    color: #2b1f14;
    margin-bottom: 12px;
    line-height: 1.3;
}

.sidebar-post-img-wrap {
    overflow: hidden;
    margin-bottom: 12px;
}

.sidebar-post-img {
    width: 100%;
    height: 140px;
    object-fit: cover;
    display: block;
    transition: transform .5s;
}

.sidebar-post-img-wrap:hover .sidebar-post-img {
    transform: scale(1.04);
}

.sidebar-post-desc {
    font-size: 11.5px;
    color: #7a6050;
    line-height: 1.7;
    font-weight: 300;
}

.sidebar-cat {}

.sidebar-cat-title {
    font-size: 13px;
    font-weight: 600;
    color: #2b1f14;
    letter-spacing: .08em;
    margin-bottom: 14px;
}

.sidebar-cat-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.sidebar-cat-item {
    display: flex;
    justify-content: space-between;
    padding: 6px 0;
    font-size: 12px;
    color: #7a6050 !important;
    border-bottom: 1px solid rgba(180, 140, 100, .1);
    cursor: pointer;
    transition: color .2s;
}

.sidebar-cat-item:hover {
    color: var(--accent);
}

.sidebar-cat-item.selected {
    color: var(--accent) !important;
    font-weight: 500;
}

.cat-count {
    color: #a09080;
}

/* FOOTER */
.footer {
    background: #1a1208;
    padding: 64px 80px 28px;
    font-family: 'Jost', sans-serif;
}

.footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr;
    gap: 48px;
    max-width: 1200px;
    margin: 0 auto 40px;
}

.footer-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    font-weight: 600;
    color: #f5ede0;
    margin-bottom: 14px;
}

.footer-about {
    font-size: 12px;
    font-weight: 300;
    color: rgba(245, 237, 224, .5);
    line-height: 1.8;
}

.footer-col-title {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .14em;
    text-transform: uppercase;
    color: #f5ede0;
    margin-bottom: 18px;
}

.footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 9px;
}

.footer-links a {
    font-size: 12px;
    font-weight: 300;
    color: rgba(245, 237, 224, .5);
    text-decoration: none;
    transition: color .3s;
}

.footer-links a:hover {
    color: #c9ad93;
}

.footer-contact {
    font-size: 12px;
    font-weight: 300;
    color: rgba(245, 237, 224, .5);
    line-height: 1.9;
    margin-top: 6px;
}

.footer-bottom {
    border-top: 1px solid rgba(245, 237, 224, .08);
    padding-top: 20px;
    text-align: center;
    max-width: 1200px;
    margin: 0 auto;
}

.footer-bottom p {
    font-size: 11px;
    color: rgba(245, 237, 224, .25);
    letter-spacing: .06em;
}

/* RESPONSIVE */
@media (max-width: 900px) {
    .page-body {
        grid-template-columns: 1fr;
        padding: 0 20px 60px;
    }

    .inventory-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .nav {
        padding: 14px 20px;
    }

    .breadcrumb {
        padding: 12px 20px;
    }

    .footer {
        padding: 48px 24px 24px;
    }

    .footer-grid {
        grid-template-columns: 1fr 1fr;
        gap: 28px;
    }
}
</style>
