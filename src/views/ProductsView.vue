<template>
    <div class="page-wrapper">
        <!-- NAV (reuse same style) -->
        <nav class="nav">
            <a href="/" class="logo-wrap">
                <img src="@/assets/logo.png" alt="Hexan Logo" class="nav-logo" />
            </a>
            <div class="nav-links">
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/products" class="active">Products</RouterLink>
                <RouterLink to="/room">Room</RouterLink>
                <RouterLink to="/about">About us</RouterLink>
            </div>
            <div class="nav-icons">
                <button aria-label="Search" @click="$router.push('/products')">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                </button>
                <button aria-label="Cart" @click="$router.push('/shipping')" style="position:relative">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 01-8 0" />
                    </svg>
                    <span v-if="cart.totalItems > 0" class="cart-badge">{{ cart.totalItems }}</span>
                </button>
                <button aria-label="Menu" @click="menuDrawerRef.openMenu()">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                </button>
            </div>
        </nav>

        <!-- PAGE BODY -->
        <main class="products-page">
            <!-- Top bar -->
            <div class="topbar">
                <span class="result-count" v-if="!loading">Showing {{ showingFrom }}–{{ showingTo }} of {{ total }}
                    results</span>
                <span class="result-count" v-else>Loading…</span>
                <div class="sort-wrap">
                    <label class="sort-label">Sort by:</label>
                    <select class="sort-select" v-model="sortBy" @change="fetchProducts">
                        <option value="popularity">Popularity</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rating">Rating</option>
                    </select>
                </div>
            </div>

            <div class="content-row">
                <!-- PRODUCT GRID -->
                <section class="grid-section">
                    <div v-if="loading" class="product-grid">
                        <div v-for="n in 9" :key="n" class="skeleton-card">
                            <div class="skeleton-img"></div>
                            <div class="skeleton-line w-3/4"></div>
                            <div class="skeleton-line w-1/2"></div>
                        </div>
                    </div>

                    <!-- Products -->
                    <div v-else class="product-grid">
                        <div v-for="product in products" :key="product.id" class="product-card"
                            @click="$router.push('/products/' + product.id)" style="cursor: pointer;">

                            <div class="card-img-wrap">
                                <img :src="product.thumbnail" :alt="product.title" class="card-img" loading="lazy" />
                                <div class="card-overlay">
                                    <button class="btn-quick" @click.stop="openQuickView(product)">Quick View</button>
                                </div>
                                <span v-if="product.discountPercentage > 10" class="card-badge">Sale</span>
                            </div>
                            <div class="card-body">
                                <p class="card-title">{{ product.title }}</p>
                                <div class="card-stars">
                                    <span v-for="s in 5" :key="s" class="star"
                                        :class="s <= Math.round(product.rating) ? 'filled' : ''">★</span>
                                </div>
                                <p class="card-price">${{ product.price.toFixed(2) }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Pagination -->
                    <div class="pagination" v-if="!loading && totalPages > 1">
                        <button v-for="p in paginationPages" :key="p" class="page-btn"
                            :class="{ active: p === currentPage, ellipsis: p === '…' }" :disabled="p === '…'"
                            @click="typeof p === 'number' && goToPage(p)">{{ p }}</button>
                        <button class="page-btn view-all" @click="viewAll">view all</button>
                    </div>
                </section>

                <!-- SIDEBAR -->
                <aside class="sidebar">
                    <!-- Search -->
                    <div class="search-wrap">
                        <input v-model="searchQuery" type="text" placeholder="Search..." class="search-input"
                            @keyup.enter="applyFilters" />
                        <button class="search-btn" @click="applyFilters">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                        </button>
                    </div>

                    <!-- Category -->
                    <div class="filter-block">
                        <h4 class="filter-title">Category</h4>
                        <ul class="filter-list">
                            <li v-for="cat in categories" :key="cat.slug" class="filter-item"
                                :class="{ selected: selectedCategory === cat.slug }" @click="selectCategory(cat.slug)">
                                <span class="filter-name">{{ cat.label }}</span>
                                <span class="filter-count">({{ cat.count }})</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Color -->
                    <div class="filter-block">
                        <h4 class="filter-title">Color</h4>
                        <ul class="filter-list">
                            <li v-for="col in colors" :key="col.name" class="filter-item"
                                :class="{ selected: selectedColor === col.name }" @click="selectColor(col.name)">
                                <span class="color-dot" :style="{ background: col.hex }"></span>
                                <span class="filter-name">{{ col.name }}</span>
                                <span class="filter-count">({{ col.count }})</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Price Range -->
                    <div class="filter-block">
                        <h4 class="filter-title">Price</h4>
                        <div class="price-range">
                            <input type="range" min="0" max="2000" v-model="maxPrice" class="range-slider"
                                @change="applyFilters" />
                            <div class="price-label">Price $4 – ${{ maxPrice }}</div>
                            <button class="btn-filter" @click="applyFilters">Filter</button>
                        </div>
                    </div>
                </aside>
            </div>
        </main>

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
import { ref, computed, onMounted } from 'vue'
import MenuDrawer from '@/Componenets/MenuDrawer.vue'
import { useCartStore } from '@/stores/cartStore'
import { useRouter } from 'vue-router'
import type { Product, ProductsResponse, SidebarCategory, ColorFilter } from '@/types'

const cart = useCartStore()
const router = useRouter()
const menuDrawerRef = ref<InstanceType<typeof MenuDrawer> | null>(null)

const products = ref<Product[]>([])
const loading = ref<boolean>(true)
const total = ref<number>(0)
const currentPage = ref<number>(1)
const perPage: number = 9
const sortBy = ref<string>('popularity')
const searchQuery = ref<string>('')
const selectedCategory = ref<string>('')
const selectedColor = ref<string>('')
const maxPrice = ref<number>(2000)

const categories: SidebarCategory[] = [
    { slug: 'furniture', label: 'All Furniture', count: 20 },
    { slug: 'sofas', label: 'Sofas', count: 24 },
    { slug: 'bedroom-furniture', label: 'Bedroom', count: 20 },
    { slug: 'tables', label: 'Tables', count: 33 },
    { slug: 'lighting', label: 'Lighting', count: 33 },
    { slug: 'home-decoration', label: 'Decoration', count: 29 },
]

const colors: ColorFilter[] = [
    { name: 'Beige', hex: '#d4b896', count: 12 },
    { name: 'Brown', hex: '#8b4513', count: 18 },
    { name: 'White', hex: '#f5f0e8', count: 15 },
    { name: 'Black', hex: '#1a1a1a', count: 9 },
    { name: 'Grey', hex: '#9e9e9e', count: 11 },
    { name: 'Walnut', hex: '#5c3317', count: 8 },
]

// Pagination
const totalPages = computed<number>(() => Math.ceil(total.value / perPage))
const showingFrom = computed<number>(() => (currentPage.value - 1) * perPage + 1)
const showingTo = computed<number>(() => Math.min(currentPage.value * perPage, total.value))

const paginationPages = computed<(number | string)[]>(() => {
    const pages: (number | string)[] = []
    const tp = totalPages.value
    const cp = currentPage.value
    if (tp <= 7) {
        for (let i = 1; i <= tp; i++) pages.push(i)
    } else {
        pages.push(1)
        if (cp > 3) pages.push('…')
        for (let i = Math.max(2, cp - 1); i <= Math.min(tp - 1, cp + 1); i++) pages.push(i)
        if (cp < tp - 2) pages.push('…')
        pages.push(tp)
    }
    return pages
})

async function fetchProducts(): Promise<void> {
    loading.value = true
    try {
        const skip: number = (currentPage.value - 1) * perPage
        let url: string = ''

        if (searchQuery.value) {
            url = `https://dummyjson.com/products/search?q=${encodeURIComponent(searchQuery.value)}&limit=${perPage}&skip=${skip}`
        } else if (selectedCategory.value) {
            url = `https://dummyjson.com/products/category/${selectedCategory.value}?limit=${perPage}&skip=${skip}`
        } else {
            url = `https://dummyjson.com/products/category/furniture?limit=${perPage}&skip=${skip}`
        }

        if (sortBy.value === 'price-asc') url += '&sortBy=price&order=asc'
        else if (sortBy.value === 'price-desc') url += '&sortBy=price&order=desc'
        else if (sortBy.value === 'rating') url += '&sortBy=rating&order=desc'

        const res = await fetch(url)
        const data: ProductsResponse = await res.json()

        const filtered: Product[] = data.products.filter((p: Product) => {
            const matchesPrice: boolean = p.price <= maxPrice.value
            const matchesColor: boolean = !selectedColor.value ||
                p.title.toLowerCase().includes(selectedColor.value.toLowerCase()) ||
                p.description.toLowerCase().includes(selectedColor.value.toLowerCase())
            return matchesPrice && matchesColor
        })
        products.value = filtered
        total.value = data.total

    } catch (e) {
        console.error(e)
    } finally {
        loading.value = false
    }
}

function goToPage(p: number): void {
    currentPage.value = p
    fetchProducts()
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

function viewAll(): void {
    currentPage.value = 1
    selectedCategory.value = ''
    searchQuery.value = ''
    fetchProducts()
}

function selectCategory(slug: string): void {
    selectedCategory.value = selectedCategory.value === slug ? '' : slug
    currentPage.value = 1
    fetchProducts()
}

function selectColor(name: string): void {
    selectedColor.value = selectedColor.value === name ? '' : name
    currentPage.value = 1
    fetchProducts()
}

function applyFilters(): void {
    currentPage.value = 1
    fetchProducts()
}

function openQuickView(product: Product): void {
    router.push('/products/' + product.id)
}

onMounted(fetchProducts)
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

.nav-links a.active,
.nav-links a:hover {
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

.nav-links a.active::after,
.nav-links a:hover::after {
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

/* PAGE */
.products-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 40px 80px;
}

/* TOPBAR */
.topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
}

.result-count {
    font-size: 12px;
    color: #7a6050;
    letter-spacing: .04em;
}

.sort-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
}

.sort-label {
    font-size: 12px;
    color: #7a6050;
    letter-spacing: .04em;
}

.sort-select {
    font-size: 12px;
    font-family: 'Jost', sans-serif;
    color: #2b1f14;
    border: 1px solid rgba(180, 140, 100, .4);
    background: transparent;
    padding: 6px 12px;
    cursor: pointer;
    outline: none;
}

/* CONTENT ROW */
.content-row {
    display: flex;
    gap: 40px;
    align-items: flex-start;
}

/* GRID */
.grid-section {
    flex: 1;
    min-width: 0;
}

.product-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin-bottom: 40px;
}

/* Skeleton */
.skeleton-card {
    background: #fff;
    padding: 0 0 16px;
}

.skeleton-img {
    width: 100%;
    aspect-ratio: 4/3;
    background: linear-gradient(90deg, #ede8e0 25%, #f5f0e8 50%, #ede8e0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite;
}

.skeleton-line {
    height: 12px;
    background: #ede8e0;
    margin: 10px 16px 6px;
    border-radius: 4px;
    animation: shimmer 1.4s infinite;
}

.w-3\/4 {
    width: 75%;
}

.w-1\/2 {
    width: 50%;
}

@keyframes shimmer {
    0% {
        background-position: 200% 0
    }

    100% {
        background-position: -200% 0
    }
}

/* Product Card */
.product-card {
    background: #fff;
    cursor: pointer;
    transition: transform .3s ease, box-shadow .3s ease;
}

.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 16px 40px rgba(80, 40, 10, .1);
}

.card-img-wrap {
    position: relative;
    aspect-ratio: 4/3;
    overflow: hidden;
}

.card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform .5s ease;
}

.product-card:hover .card-img {
    transform: scale(1.06);
}

.card-overlay {
    position: absolute;
    inset: 0;
    background: rgba(43, 31, 20, .35);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity .3s;
}

.product-card:hover .card-overlay {
    opacity: 1;
}

.btn-quick {
    border: 1px solid #f5ede0;
    color: #f5ede0;
    background: transparent;
    padding: 8px 20px;
    font-size: 11px;
    font-family: 'Jost', sans-serif;
    letter-spacing: .1em;
    cursor: pointer;
    transition: background .25s, color .25s;
}

.btn-quick:hover {
    background: #f5ede0;
    color: #2b1f14;
}

.card-badge {
    position: absolute;
    top: 10px;
    left: 10px;
    background: #af7164;
    color: #fff;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: .12em;
    text-transform: uppercase;
    padding: 3px 8px;
}

.card-body {
    padding: 12px 14px 16px;
}

.card-title {
    font-size: 13px;
    font-weight: 500;
    color: #2b1f14;
    margin-bottom: 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.card-stars {
    margin-bottom: 6px;
}

.star {
    font-size: 13px;
    color: #ddd;
}

.star.filled {
    color: #c9a84c;
}

.card-price {
    font-size: 13px;
    font-weight: 400;
    color: #7a6050;
}

/* PAGINATION */
.pagination {
    display: flex;
    align-items: center;
    gap: 6px;
    justify-content: center;
    flex-wrap: wrap;
}

.page-btn {
    width: 32px;
    height: 32px;
    border: 1px solid rgba(180, 140, 100, .35);
    background: transparent;
    color: #2b1f14;
    font-size: 12px;
    font-family: 'Jost', sans-serif;
    cursor: pointer;
    transition: background .25s, color .25s;
    display: flex;
    align-items: center;
    justify-content: center;
}

.page-btn:hover {
    background: #2b1f14;
    color: #f5ede0;
}

.page-btn.active {
    background: #2b1f14;
    color: #f5ede0;
    border-color: #2b1f14;
}

.page-btn.ellipsis {
    border: none;
    cursor: default;
}

.page-btn.view-all {
    width: auto;
    padding: 0 14px;
    font-size: 11px;
    letter-spacing: .08em;
}

/* SIDEBAR */
.sidebar {
    width: 200px;
    flex-shrink: 0;
    position: sticky;
    top: 90px;
    background: transparent !important;
}

.search-wrap {
    display: flex;
    align-items: center;
    border: 1px solid rgba(180, 140, 100, .4);
    background: transparent !important;
    margin-bottom: 32px;
}

.search-input {
    flex: 1;
    border: none;
    outline: none;
    padding: 9px 12px;
    font-size: 12px;
    font-family: 'Jost', sans-serif;
    color: #2b1f14;
    background: transparent !important;
}

.search-input::placeholder {
    color: #b8a090;
}

.search-btn {
    border: none;
    background: transparent;
    padding: 8px 10px;
    cursor: pointer;
    color: #7a6050;
    display: flex;
    align-items: center;
}

.search-btn svg {
    width: 16px;
    height: 16px;
}

.filter-block {
    margin-bottom: 28px;
}

.filter-title {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: .08em;
    color: var(--text-primary);
    margin-bottom: 14px;
}

.filter-name {
    color: #7a6050 !important;
}

.filter-item.selected .filter-name {
    color: var(--accent) !important;
}

.filter-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.filter-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 5px 0;
    cursor: pointer;
    transition: color .2s;
}

.filter-item:hover .filter-name,
.filter-item.selected .filter-name {
    color: var(--accent) !important;
}

.filter-name {
    font-size: 12px;
    color: #2b1f14;
    flex: 1;
    transition: color .2s;
}

.filter-count {
    font-size: 11px;
    color: #b8a090;
}

.color-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, .12);
    flex-shrink: 0;
}

/* Price Range */
.range-slider {
    width: 100%;
    accent-color: #2b1f14;
    margin-bottom: 10px;
}

.price-label {
    font-size: 12px;
    color: #7a6050;
    margin-bottom: 14px;
}

.btn-filter {
    background: #b85c38;
    color: #f5ede0;
    border: none;
    padding: 8px 20px;
    font-size: 12px;
    font-family: 'Jost', sans-serif;
    letter-spacing: .08em;
    cursor: pointer;
    transition: background .3s;
}

.btn-filter:hover {
    background: #2b1f14;
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
    .content-row {
        flex-direction: column-reverse;
    }

    .sidebar {
        width: 100%;
        position: static;
    }

    .product-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .footer {
        padding: 48px 24px 24px;
    }

    .footer-grid {
        grid-template-columns: 1fr 1fr;
        gap: 28px;
    }

    .products-page {
        padding: 24px 20px 60px;
    }

    .nav {
        padding: 14px 20px;
    }
}
</style>
