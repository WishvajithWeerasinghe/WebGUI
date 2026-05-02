<template>
    <!-- PRODUCTS OF THE WEEK -->
    <section class="products-section">
        <div class="products-header">
            <h2 class="products-title">PRODUCTS OF THE WEEK</h2>
            <p class="products-subtitle">
                Our lineup is constantly evolving. Also enjoy the top-rated picks and<br />
                latest arrivals that are defining our world right now.
            </p>
        </div>

        <div class="grid grid-cols-3 gap-12 max-w-6xl mx-auto px-5">
            <div v-for="(product, index) in products" :key="product.name"
                class="relative group overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-1.5"
                :class="[
                    index === 0 ? 'bg-none' :
                        index === 1 ? 'bg-none' :
                            'bg-none'
                ]">
                <!-- Badge -->
                <div v-if="product.badge"
                    class="absolute top-3.5 left-3.5 z-10 bg-[#af7164] text-white text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1">
                    {{ product.badge }}
                </div>

                <!-- Image -->
                <div class="relative overflow-hidden">
                    <img :src="product.img" :alt="product.name"
                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <!-- Overlay -->
                    <div
                        class="absolute inset-0 bg-[#2b1f14]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                            class="border border-[#f5ede0] text-[#f5ede0] text-xs tracking-widest px-6 py-2.5 hover:bg-[#f5ede0] hover:text-[#2b1f14] transition-colors duration-200">
                            Quick View
                        </button>
                    </div>
                </div>

                <!-- Info -->
                <div class="flex flex-col items-center justify-center px-4 py-6 gap-2">
                    <span class="text-sm font-medium tracking-wide"
                        :class="index === 1 ? 'text-[#2b1f14]' : 'text-[#2b1f14]'">
                        {{ product.name }}
                    </span>
                    <span class="text-xs font-light" :class="index === 1 ? 'text-[#2b1f14]' : 'text-[#7a6050]'">
                        {{ product.price }}
                    </span>
                </div>
            </div>
        </div>

        <div class="products-cta">
            <button class="btn-all" @click="navigate('/products')">
                View all products
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                </svg>
            </button>
        </div>
    </section>

    <!-- ROOM SHOWCASE BANNER -->
    <section class="showcase-section">
        <div class="showcase-overlay"></div>
        <div class="showcase-content">
            <p class="showcase-eyebrow">Bring the Hevan Room Experience Home</p>
            <h2 class="showcase-headline">See exactly how our pieces fit within your unique living space.</h2>
            <button class="btn-find" @click="navigate('/rooms')">View more</button>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const products = ref([])
const hoveredCard = ref(null)

function navigate(path) {
    router.push(path)
}

onMounted(async () => {
    try {
        const response = await fetch('https://dummyjson.com/products/category/furniture?limit=3')
        const data = await response.json()
        products.value = data.products.map((product) => ({
            name: product.title,
            price: `$${product.price}`,
            badge: product.discountPercentage ? 'Sale' : 'New',
            img: product.thumbnail,
        }))
    } catch (error) {
        console.error('Error fetching products:', error)
    }
},)
</script>

<style scoped>
/* ─── PRODUCTS SECTION ─── */

:root {
    /* Colors */
    --color-primary: #C9AD93;
    --color-secondary: #823011;
    --color-dark: #4D2C19;
    --color-accent: #AF7164;

    --color-text-dark: #4D2C19;
    --color-tn-dark: #4D2C19;
    --color-text-light: #f5ede0;
    --color-glass: rgba(180, 130, 80, 0.25);

    /* Fonts */
    --font-main: 'Cormorant Garamond', serif;
    --font-ui: 'Jost', sans-serif;
}

.products-section {
    background: #faf6f0;
    padding: 90px 64px 80px;
    font-family: 'Jost', sans-serif;
}

.products-header {
    text-align: center;
    margin-bottom: 52px;
}

.products-title {
    font-family: 'Lato', sans-serif;
    font-size: clamp(22px, 3vw, 34px);
    font-weight: 700;
    letter-spacing: 0.06em;
    color: var(--color-tn-dark);
    margin-bottom: 14px;
}

.products-subtitle {
    font-size: 13.5px;
    font-weight: 300;
    color: #7a6050;
    line-height: 1.75;
    letter-spacing: 0.02em;
}


.products-cta {
    text-align: center;
    margin-top: 48px;
}

.btn-all {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    border: 1.5px solid #2b1f14;
    color: #2b1f14;
    background: transparent;
    padding: 12px 32px;
    font-size: 13px;
    font-family: 'Jost', sans-serif;
    letter-spacing: 0.12em;
    cursor: pointer;
    transition: background 0.3s, color 0.3s;
}

.btn-all:hover {
    background: #2b1f14;
    color: #f5ede0;
}

.btn-all svg {
    width: 14px;
    height: 14px;
    transition: transform 0.25s;
}

.btn-all:hover svg {
    transform: translateX(4px);
}

/* ─── ROOM BANNER ─── */
.showcase-section {
    position: relative;
    min-height: 800px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    background-image: url('/src/assets/home/second.jpg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
}

.showcase-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to left,
            rgba(43, 31, 20, 0.72) 0%,
            rgba(43, 31, 20, 0.45) 50%,
            rgba(43, 31, 20, 0.1) 100%);
}

.showcase-content {
    position: relative;
    z-index: 5;
    max-width: 300px;
    margin-right: 8%;
    padding: 48px 40px;
    background: rgba(180, 130, 80, 0.2);
    backdrop-filter: blur(6px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 2px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.showcase-eyebrow {
    font-family: var(--font-lato);
    font-size: 15px;
    font-weight: 400;
    text-align: center;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #c9ad93;
    margin-bottom: 14px;
}

.showcase-headline {
    font-family: var(--font-lato);
    font-size: clamp(20px, 2.5vw, 28px);
    font-weight: 500;
    text-align: center;
    line-height: 1.55;
    color: #f5ede0;
    margin-bottom: 28px;
    letter-spacing: 0.01em;
}

.btn-find {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border: 1.5px solid #f5ede0;
    color: #f5ede0;
    background: transparent;
    padding: 11px 28px;
    font-size: 13px;
    font-family: 'Jost', sans-serif;
    letter-spacing: 0.12em;
    cursor: pointer;
    transition: background 0.3s, color 0.3s;
}

.btn-find:hover {
    background: #f5ede0;
    color: #2b1f14;
}

/* ─── RESPONSIVE ─── */
@media (max-width: 860px) {
    .products-section {
        padding: 60px 24px;
    }

    .products-grid {
        grid-template-columns: 1fr;
        max-width: 420px;
    }

    .showcase-content {
        margin-right: 0;
        margin: 0 24px;
    }

    .showcase-section {
        justify-content: center;
    }
}
</style>
