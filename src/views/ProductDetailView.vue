<template>
    <div class="page-wrapper">
        <!-- NAV -->
        <nav class="nav">
            <RouterLink to="/" class="logo-wrap">
                <img src="@/assets/logo.png" alt="Hexan Logo" class="nav-logo" />
            </RouterLink>
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

        <!-- LOADING -->
        <div v-if="loading" class="loading-wrap">
            <div class="spinner"></div>
        </div>

        <template v-else-if="product">
            <!-- BREADCRUMB -->
            <div class="breadcrumb">
                <RouterLink to="/products">Products</RouterLink>
                <span> / </span>
                <span>{{ product.title }}</span>
            </div>

            <!-- PRODUCT SECTION -->
            <section class="product-section">
                <!-- Thumbnails -->
                <div class="thumbnails">
                    <div v-for="(img, i) in product.images.slice(0, 4)" :key="i" class="thumb-wrap"
                        :class="{ active: activeImg === i }" @click="activeImg = i">
                        <img :src="img" :alt="product.title" class="thumb-img" />
                    </div>
                </div>

                <!-- Main Image -->
                <div class="main-img-wrap">
                    <img :src="product.images[activeImg]" :alt="product.title" class="main-img" />
                </div>

                <!-- Product Info -->
                <div class="product-info">
                    <h1 class="product-title">{{ product.title }}</h1>

                    <div class="rating-row">
                        <div class="stars">
                            <span v-for="s in 5" :key="s" class="star"
                                :class="s <= Math.round(product.rating) ? 'filled' : ''">★</span>
                        </div>
                        <span class="review-count">({{ product.reviews?.length ?? 0 }})</span>
                    </div>

                    <div class="price-row">
                        <span class="price-label">PRICE</span>
                        <span class="price">${{ product.price.toFixed(2) }}</span>
                    </div>

                    <p class="product-desc">{{ product.description }}</p>

                    <!-- Quantity + Add to cart -->
                    <div class="actions-row">
                        <div class="qty-wrap">
                            <button class="qty-btn" @click="qty > 1 && qty--">−</button>
                            <span class="qty-val">{{ qty }}</span>
                            <button class="qty-btn" @click="qty++">+</button>
                        </div>
                        <button class="btn-cart" @click="addToCart">
                            {{ addedToCart ? '✓ Added!' : 'Add to cart' }}
                        </button>
                    </div>

                    <!-- Wishlist -->
                    <button class="btn-wishlist" @click="wishlisted = !wishlisted">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                            :style="wishlisted ? 'fill:#b85c38;stroke:#b85c38' : ''">
                            <path
                                d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                        </svg>
                        {{ wishlisted ? 'Wishlisted' : 'Add to wishlist' }}
                    </button>

                    <!-- Meta -->
                    <div class="meta-block">
                        <div class="meta-row">
                            <span class="meta-label">Materials:</span>
                            <span class="meta-val">Bronze Teak, Wood, Fabric, Polyester</span>
                        </div>
                        <div class="meta-row">
                            <span class="meta-label">Category:</span>
                            <span class="meta-val">{{ product.category }}</span>
                        </div>
                        <div class="meta-row">
                            <span class="meta-label">Colors:</span>
                            <div class="color-swatches">
                                <span class="swatch" style="background:#c09a6a"></span>
                                <span class="swatch" style="background:#8b4513"></span>
                                <span class="swatch" style="background:#d4b896"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- TABS -->
            <section class="tabs-section">
                <div class="tabs-header">
                    <button v-for="tab in tabs" :key="tab" class="tab-btn" :class="{ active: activeTab === tab }"
                        @click="activeTab = tab">{{ tab }}</button>
                </div>
                <div class="tab-content">
                    <p v-if="activeTab === 'Description'">{{ product.description }} This premium piece combines sturdy
                        hardwood structure with ultra-even spring suspension and high-quality polyester cushioning for
                        lasting support. Hallmark craftsmanship and relaxed elegance makes it the perfect centrepiece
                        for any modern interior.</p>
                    <p v-else-if="activeTab === 'Additional information'">Weight: 18kg · Dimensions: 220 × 90 × 85 cm ·
                        Assembly required: Yes · Warranty: 2 years · SKU: {{ product.sku ?? 'HVN-' + product.id }}</p>
                    <p v-else>Customer reviews and previews coming soon.</p>
                </div>
            </section>

            <!-- RELATED PRODUCTS -->
            <section class="related-section">
                <h2 class="related-title">Related products</h2>
                <div class="related-grid">
                    <div v-for="rel in related" :key="rel.id" class="rel-card"
                        @click="$router.push('/products/' + rel.id)">
                        <div class="rel-img-wrap">
                            <img :src="rel.thumbnail" :alt="rel.title" class="rel-img" />
                        </div>
                        <p class="rel-name">{{ rel.title }}</p>
                        <div class="rel-stars">
                            <span v-for="s in 5" :key="s" class="star"
                                :class="s <= Math.round(rel.rating) ? 'filled' : ''">★</span>
                        </div>
                    </div>
                </div>
            </section>
        </template>

        <!-- FOOTER -->
        <footer class="footer">
            <div class="footer-grid">
                <div class="footer-brand">
                    <h3 class="footer-logo">Hevan Room</h3>
                    <p class="footer-about">Where aesthetic beauty meets effortless utility. We combine premium
                        craftsmanship
                        with premium materials to create furniture that elevates your home.</p>
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
                    <p class="footer-about">Support Hours: Mon–Sat, 9 AM – 6 PM</p>
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
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import MenuDrawer from '@/Componenets/MenuDrawer.vue'
import { useCartStore } from '@/stores/cartStore'
import type { Product, ProductsResponse } from '@/types'

const cart = useCartStore()
const menuDrawerRef = ref<InstanceType<typeof MenuDrawer> | null>(null)
const route = useRoute()

const product = ref<Product | null>(null)
const related = ref<Product[]>([])
const loading = ref<boolean>(true)
const activeImg = ref<number>(0)
const qty = ref<number>(1)
const addedToCart = ref<boolean>(false)
const wishlisted = ref<boolean>(false)
const activeTab = ref<string>('Description')
const tabs: string[] = ['Description', 'Additional information', 'Preview']

async function fetchProduct(id: string | string[]): Promise<void> {
    loading.value = true
    activeImg.value = 0
    qty.value = 1
    addedToCart.value = false
    try {
        const res = await fetch(`https://dummyjson.com/products/${id}`)
        product.value = await res.json()

        const relRes = await fetch(`https://dummyjson.com/products/category/furniture?limit=8`)
        const relData: ProductsResponse = await relRes.json()
        related.value = relData.products
            .filter((p: Product) => p.id !== product.value?.id)
            .slice(0, 4)
    } catch (e) {
        console.error(e)
    } finally {
        loading.value = false
    }
}

function addToCart(): void {
    if (!product.value) return
    for (let i = 0; i < qty.value; i++) {
        cart.addItem(product.value)
    }
    addedToCart.value = true
}

onMounted(() => {
    if (route.params.id) fetchProduct(route.params.id)
})

watch(() => route.params.id, (id) => {
    if (id) fetchProduct(id)
})
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

/* LOADING */
.loading-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
}

.spinner {
    width: 36px;
    height: 36px;
    border: 2px solid rgba(184, 92, 56, .2);
    border-top-color: #b85c38;
    border-radius: 50%;
    animation: spin .8s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg)
    }
}

/* BREADCRUMB */
.breadcrumb {
    padding: 16px 48px;
    font-size: 12px;
    color: #7a6050;
    letter-spacing: .04em;
}

.breadcrumb a {
    color: #7a6050;
    text-decoration: none;
    transition: color .2s;
}

.breadcrumb a:hover {
    color: #b85c38;
}

/* PRODUCT SECTION */
.product-section {
    display: grid;
    grid-template-columns: 80px 1fr 1fr;
    gap: 32px;
    padding: 0 48px 60px;
    max-width: 1200px;
    margin: 0 auto;
    align-items: start;
}

.thumbnails {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.thumb-wrap {
    border: 1.5px solid transparent;
    cursor: pointer;
    overflow: hidden;
    transition: border-color .2s;
}

.thumb-wrap.active {
    border-color: #b85c38;
}

.thumb-img {
    width: 72px;
    height: 60px;
    object-fit: cover;
    display: block;
    transition: transform .3s;
}

.thumb-wrap:hover .thumb-img {
    transform: scale(1.05);
}

.main-img-wrap {
    overflow: hidden;
    background: #f0ebe3;
}

.main-img {
    width: 100%;
    aspect-ratio: 4/3;
    object-fit: cover;
    display: block;
    transition: transform .5s ease;
}

.main-img-wrap:hover .main-img {
    transform: scale(1.03);
}

.product-info {
    padding-left: 16px;
}

.product-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(22px, 2.5vw, 32px);
    font-weight: 600;
    color: #2b1f14;
    margin-bottom: 12px;
    line-height: 1.3;
}

.rating-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 14px;
}

.stars {
    display: flex;
    gap: 2px;
}

.star {
    font-size: 14px;
    color: #ddd;
}

.star.filled {
    color: #c9a84c;
}

.review-count {
    font-size: 12px;
    color: #7a6050;
}

.price-row {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 18px;
    padding-bottom: 18px;
    border-bottom: 1px solid rgba(180, 140, 100, .2);
}

.price-label {
    font-size: 10px;
    letter-spacing: .14em;
    color: #7a6050;
    text-transform: uppercase;
}

.price {
    font-size: 22px;
    font-weight: 500;
    color: var(--text-primary);
    font-family: 'Cormorant Garamond', serif;
}

.product-desc {
    font-size: 13px;
    font-weight: 300;
    color: #7a6050;
    line-height: 1.8;
    margin-bottom: 28px;
}

.actions-row {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
}

.qty-wrap {
    display: flex;
    align-items: center;
    border: 1px solid rgba(180, 140, 100, .4);
}

.qty-btn {
    width: 36px;
    height: 36px;
    background: transparent;
    border: none;
    font-size: 18px;
    color: var(--text-primary);
    cursor: pointer;
    transition: background .2s;
}

.qty-btn:hover {
    background: rgba(180, 140, 100, .15);
}

.qty-val {
    width: 40px;
    text-align: center;
    font-size: 14px;
    color: var(--text-primary);
    border-left: 1px solid rgba(180, 140, 100, .3);
    border-right: 1px solid rgba(180, 140, 100, .3);
    line-height: 36px;
}

.btn-cart {
    flex: 1;
    background: #b85c38;
    color: #f5ede0;
    border: none;
    padding: 0 24px;
    height: 36px;
    font-size: 12px;
    font-family: 'Jost', sans-serif;
    letter-spacing: .12em;
    cursor: pointer;
    transition: background .3s;
}

.btn-cart:hover {
    background: #2b1f14;
}

.btn-wishlist {
    display: flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    border: none;
    font-size: 12px;
    font-family: 'Jost', sans-serif;
    color: #7a6050;
    letter-spacing: .06em;
    cursor: pointer;
    margin-bottom: 24px;
    padding: 0;
    transition: color .2s;
}

.btn-wishlist:hover {
    color: #b85c38;
}

.btn-wishlist svg {
    width: 16px;
    height: 16px;
}

.meta-block {
    border-top: 1px solid rgba(180, 140, 100, .2);
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.meta-row {
    display: flex;
    align-items: center;
    gap: 12px;
}

.meta-label {
    font-size: 11px;
    letter-spacing: .08em;
    color: #7a6050;
    min-width: 80px;
}

.meta-val {
    font-size: 12px;
    color: var(--text-primary);
}

.color-swatches {
    display: flex;
    gap: 6px;
}

.swatch {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, .1);
    cursor: pointer;
    transition: transform .2s;
}

.swatch:hover {
    transform: scale(1.2);
}

/* TABS */
.tabs-section {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 48px 60px;
}

.tabs-header {
    display: flex;
    border-bottom: 1px solid rgba(180, 140, 100, .25);
    margin-bottom: 24px;
}

.tab-btn {
    background: transparent;
    border: none;
    border-bottom: 2px solid transparent;
    padding: 10px 24px 10px 0;
    font-size: 13px;
    font-family: 'Jost', sans-serif;
    letter-spacing: .06em;
    color: #7a6050;
    cursor: pointer;
    margin-bottom: -1px;
    transition: color .2s, border-color .2s;
}

.tab-btn.active {
    color: #2b1f14;
    border-bottom-color: #b85c38;
}

.tab-btn:hover {
    color: #2b1f14;
}

.tab-content {
    font-size: 13px;
    font-weight: 300;
    color: #7a6050;
    line-height: 1.85;
    max-width: 760px;
}

/* RELATED */
.related-section {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 48px 80px;
}

.related-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px;
    font-weight: 600;
    color: #2b1f14;
    margin-bottom: 28px;
}

.related-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
}

.rel-card {
    cursor: pointer;
    transition: transform .3s;
}

.rel-card:hover {
    transform: translateY(-4px);
}

.rel-img-wrap {
    overflow: hidden;
    margin-bottom: 12px;
}

.rel-img {
    width: 100%;
    aspect-ratio: 4/3;
    object-fit: cover;
    display: block;
    transition: transform .5s;
}

.rel-card:hover .rel-img {
    transform: scale(1.05);
}

.rel-name {
    font-size: 13px;
    font-weight: 500;
    color: #2b1f14;
    margin-bottom: 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.rel-stars {
    display: flex;
    gap: 2px;
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
    .product-section {
        grid-template-columns: 1fr;
        padding: 0 20px 40px;
    }

    .thumbnails {
        flex-direction: row;
    }

    .thumb-img {
        width: 60px;
        height: 50px;
    }

    .related-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .tabs-section,
    .related-section {
        padding: 0 20px 40px;
    }

    .nav {
        padding: 14px 20px;
    }

    .breadcrumb {
        padding: 14px 20px;
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
