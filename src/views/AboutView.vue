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
                <RouterLink to="/room">Room</RouterLink>
                <RouterLink to="/about" class="active">About us</RouterLink>
            </div>
            <div class="nav-icons">
                <button aria-label="Search" @click="$router.push('/products')">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                </button>
                <button aria-label="Cart" @click="$router.push('/shipping')">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 01-8 0" />
                    </svg>
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

        <!-- HERO -->
        <section class="hero-section">
            <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1400&q=80" alt="About us hero"
                class="hero-img" />
            <div class="hero-overlay"></div>
            <h1 class="hero-title">About us</h1>
        </section>

        <!-- FEATURES ROW -->
        <section class="features-section">
            <div class="features-grid">
                <div class="feature-item" v-for="feat in features" :key="feat.title">
                    <div class="feature-icon" v-html="feat.icon"></div>
                    <div>
                        <h4 class="feature-title">{{ feat.title }}</h4>
                        <p class="feature-desc">{{ feat.desc }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- FULL WIDTH BANNER -->
        <section class="banner-section">
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80" alt="Lamps banner"
                class="banner-img" />
            <div class="banner-overlay"></div>
        </section>

        <!-- SKILLS SECTION -->
        <section class="skills-section">
            <div class="skills-left">
                <h2 class="skills-headline">Functionality<br />meets perfection</h2>
                <p class="skills-desc">Our design philosophy blends aesthetic beauty with effortless utility. We
                    engineer every piece to create a balance between statement and purpose. Superior ergonomics combined
                    with rich premium wood and high-quality materials, our furniture is designed for lasting style and
                    durability.</p>
            </div>
            <div class="skills-right">
                <div class="skill-item" v-for="skill in skills" :key="skill.label">
                    <div class="skill-header">
                        <span class="skill-label">{{ skill.label }}</span>
                        <span class="skill-pct">{{ skill.value }} %</span>
                    </div>
                    <div class="skill-track">
                        <div class="skill-bar" :style="{ width: animated ? skill.value + '%' : '0%' }"></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- OUR PRODUCTS -->
        <section class="our-products-section">
            <h2 class="section-title">Our Products</h2>
            <div class="our-products-grid">
                <div class="op-card" v-for="product in featuredProducts" :key="product.id"
                    @click="$router.push('/products/' + product.id)">
                    <div class="op-img-wrap">
                        <img :src="product.thumbnail" :alt="product.title" class="op-img" />
                        <span v-if="product.badge" class="op-badge">{{ product.badge }}</span>
                    </div>
                    <div class="op-body">
                        <div class="op-meta">
                            <span class="op-rating">{{ product.rating }} ★</span>
                            <span class="op-sep">·</span>
                            <span class="op-price">${{ product.price }}</span>
                        </div>
                        <p class="op-title">{{ product.title }}</p>
                        <a class="op-read" @click.stop="$router.push('/products/' + product.id)">Read more</a>
                    </div>
                </div>
            </div>
        </section>

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

<script setup>
import { ref, onMounted } from 'vue'
import MenuDrawer from '@/Componenets/MenuDrawer.vue'

const menuDrawerRef = ref(null)
const animated = ref(false)
const featuredProducts = ref([])

const features = [
    {
        title: 'Shop online',
        desc: 'Browse our full collection and order from the comfort of your home.',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="32" height="32"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>`,
    },
    {
        title: 'Free shipping',
        desc: 'Fast, reliable shipping delivered straight to your doorstep on every order.',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="32" height="32"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
    },
    {
        title: 'Return policy',
        desc: 'Easy returns and hassle-free refunds. Your satisfaction is our priority.',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="32" height="32"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>`,
    },
    {
        title: 'PAYMENT',
        desc: 'Quick and secure checkout. Shop with peace of mind every time.',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="32" height="32"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
    },
]

const skills = [
    { label: 'Creativity', value: 72 },
    { label: 'Advertising', value: 84 },
    { label: 'Design', value: 72 },
]

async function fetchFeatured() {
    try {
        const res = await fetch('https://dummyjson.com/products/category/furniture?limit=3&sortBy=rating&order=desc')
        const data = await res.json()
        featuredProducts.value = data.products
    } catch (e) {
        console.error(e)
    }
}

onMounted(async () => {
    await fetchFeatured()
    // trigger bar animation after mount
    setTimeout(() => animated.value = true, 300)
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

/* HERO */
.hero-section {
    position: relative;
    height: 340px;
    overflow: hidden;
}

.hero-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.hero-overlay {
    position: absolute;
    inset: 0;
    background: rgba(43, 31, 20, 0.3);
}

.hero-title {
    position: absolute;
    bottom: 36px;
    left: 52px;
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(32px, 5vw, 56px);
    font-weight: 600;
    color: #c9822a;
    letter-spacing: 0.02em;
}

/* FEATURES */
.features-section {
    background: #faf6f0;
    padding: 56px 80px;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;
    max-width: 1100px;
    margin: 0 auto;
}

.feature-item {
    display: flex;
    align-items: flex-start;
    gap: 14px;
}

.feature-icon {
    flex-shrink: 0;
    color: #2b1f14;
}

.feature-title {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: #2b1f14;
    text-transform: uppercase;
    margin-bottom: 6px;
}

.feature-desc {
    font-size: 12px;
    font-weight: 300;
    color: #7a6050;
    line-height: 1.7;
}

/* BANNER */
.banner-section {
    position: relative;
    height: 300px;
    overflow: hidden;
}

.banner-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.banner-overlay {
    position: absolute;
    inset: 0;
    background: rgba(43, 20, 5, 0.35);
}

/* SKILLS */
.skills-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    padding: 80px 80px;
    max-width: 1200px;
    margin: 0 auto;
    align-items: center;
}

.skills-headline {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(26px, 3vw, 40px);
    font-weight: 600;
    color: #2b1f14;
    line-height: 1.25;
    margin-bottom: 20px;
}

.skills-desc {
    font-size: 13px;
    font-weight: 300;
    color: #7a6050;
    line-height: 1.85;
}

.skill-item {
    margin-bottom: 28px;
}

.skill-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
}

.skill-label {
    font-size: 13px;
    font-weight: 400;
    color: #2b1f14;
    letter-spacing: 0.04em;
}

.skill-pct {
    font-size: 13px;
    color: #7a6050;
}

.skill-track {
    width: 100%;
    height: 3px;
    background: rgba(180, 140, 100, 0.25);
    border-radius: 2px;
    overflow: hidden;
}

.skill-bar {
    height: 100%;
    background: #b85c38;
    border-radius: 2px;
    transition: width 1.2s cubic-bezier(.4, 0, .2, 1);
}

/* OUR PRODUCTS */
.our-products-section {
    padding: 20px 80px 80px;
    max-width: 1200px;
    margin: 0 auto;
}

.section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(22px, 2.5vw, 32px);
    font-weight: 600;
    color: #2b1f14;
    margin-bottom: 32px;
}

.our-products-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;
}

.op-card {
    cursor: pointer;
    background: #fff;
    transition: transform .3s ease, box-shadow .3s ease;
}

.op-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 16px 40px rgba(80, 40, 10, .1);
}

.op-img-wrap {
    position: relative;
    aspect-ratio: 4/3;
    overflow: hidden;
}

.op-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform .5s ease;
}

.op-card:hover .op-img {
    transform: scale(1.05);
}

.op-badge {
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

.op-body {
    padding: 14px 16px 18px;
}

.op-meta {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 6px;
}

.op-rating {
    font-size: 11px;
    color: #c9a84c;
}

.op-sep {
    font-size: 11px;
    color: #b8a090;
}

.op-price {
    font-size: 11px;
    color: #7a6050;
}

.op-title {
    font-size: 13px;
    font-weight: 500;
    color: #2b1f14;
    margin-bottom: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.op-read {
    font-size: 11px;
    letter-spacing: .1em;
    color: #7a6050;
    text-decoration: none;
    border-bottom: 1px solid #7a6050;
    padding-bottom: 2px;
    cursor: pointer;
    transition: color .2s, border-color .2s;
}

.op-read:hover {
    color: #b85c38;
    border-color: #b85c38;
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
    .features-section {
        padding: 40px 24px;
    }

    .features-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 28px;
    }

    .skills-section {
        grid-template-columns: 1fr;
        gap: 40px;
        padding: 48px 24px;
    }

    .our-products-section {
        padding: 20px 24px 60px;
    }

    .our-products-grid {
        grid-template-columns: 1fr;
    }

    .nav {
        padding: 14px 20px;
    }

    .hero-title {
        left: 24px;
        bottom: 24px;
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
