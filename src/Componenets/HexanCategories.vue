<template>
    <!-- CATEGORIES -->
    <section class="categories-section">
        <div v-for="(cat, index) in categories" :key="cat.title" class="category-row"
            :class="index % 2 === 0 ? 'row-normal' : 'row-reverse'">
            <div class="category-text">
                <h2 class="category-title">{{ cat.title }}</h2>
                <p class="category-desc">{{ cat.desc }}</p>
                <button class="btn-view" @click="$router.push(cat.link)">
                    View more
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                    </svg>
                </button>
            </div>
            <div class="category-image-wrap">
                <img :src="cat.img" :alt="cat.title" class="category-img" />
            </div>
        </div>
    </section>

    <!-- PROMO BANNER -->
    <section class="promo-banner">
        <span class="promo-text">Grab yours before they're all gone!</span>
        <button class="promo-btn">
            View store
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
            </svg>
        </button>
    </section>

    <!-- FEATURES ROW -->
    <section class="features-section">
        <div class="features-grid">
            <div class="feature-item" v-for="feat in features" :key="feat.title">
                <div class="feature-icon" v-html="feat.icon"></div>
                <div class="feature-body">
                    <h4 class="feature-title">{{ feat.title }}</h4>
                    <p class="feature-desc">{{ feat.desc }}</p>
                </div>
            </div>
        </div>
    </section>

    <!-- BLOG ARTICLES -->
    <section class="blog-section">
        <div class="blog-grid">
            <article class="blog-card" v-for="post in posts" :key="post.title">
                <div class="blog-img-wrap">
                    <img :src="post.img" :alt="post.title" class="blog-img" />
                </div>
                <div class="blog-meta">
                    <span class="blog-date">{{ post.date }}</span>
                    <span class="blog-sep">·</span>
                    <span class="blog-cat">{{ post.category }}</span>
                </div>
                <h3 class="blog-title">{{ post.title }}</h3>
                <a href="#" class="blog-read">read more</a>
            </article>
        </div>
    </section>

    <!-- TESTIMONIAL -->
    <section class="testimonial-section">
        <button class="testimonial-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15 18 9 12 15 6" />
            </svg>
        </button>
        <div class="testimonial-content">
            <span class="quote-mark">"</span>
            <blockquote class="testimonial-quote">
                "A comfortable house is a great source of happiness. It ranks immediately after health and a good
                conscience."
            </blockquote>
            <p class="testimonial-name">Sydney Smith</p>
            <p class="testimonial-role">Home</p>
            <div class="testimonial-dots">
                <span class="dot active"></span>
                <span class="dot"></span>
                <span class="dot"></span>
            </div>
        </div>
        <button class="testimonial-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6" />
            </svg>
        </button>
    </section>

    <!-- FOOTER -->
    <footer class="footer">
        <div class="footer-grid">
            <div class="footer-brand">
                <h3 class="footer-logo">Hevan Room</h3>
                <p class="footer-about">
                    Where aesthetic beauty meets effortless utility. We combine premium craftsmanship with
                    premium materials to create furniture that elevates your home and stands the test of
                    time in both style and comfort.
                </p>
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
                    <li><a href="#">AppStore</a></li>
                    <li><a href="#">Facebook</a></li>
                    <li><a href="#">Pinterest</a></li>
                    <li><a href="#">Instagram</a></li>
                    <li><a href="#">Youtube</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4 class="footer-col-title">Download</h4>
                <ul class="footer-links">
                    <li><a href="#">AppStore</a></li>
                    <li><a href="#">Facebook</a></li>
                    <li><a href="#">Pinterest</a></li>
                    <li><a href="#">Instagram</a></li>
                    <li><a href="#">Youtube</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4 class="footer-col-title">Call Center</h4>
                <p class="footer-about">Have a question? Our design experts are ready to assist you with your interior
                    journey.</p>
                <p class="footer-contact">Support Hours: Mon–Sat, 9 AM – 6 PM</p>
                <p class="footer-contact">hevanroom@gmail.com</p>
                <p class="footer-contact">+07 81320456</p>
            </div>
        </div>
        <div class="footer-bottom">
            <p>© 2024 Hevan Room. All rights reserved.</p>
        </div>
    </footer>
</template>

<script setup>
const categories = [
    {
        title: 'CHAIRS',
        desc: 'More than just a seat; a signature piece that redefines your daily ritual. Explore our collection.',
        img: '/src/assets/home/chair.jpg',
        link: '/products/chairs',
    },
    {
        title: 'TABLES',
        desc: 'From morning rituals to evening conversations, discover a surface built for a lifetime of stories.',
        img: '/src/assets/home/table.jpg',
        link: '/products/tables',
    },
    {
        title: 'ROOM ACCESSORIES',
        desc: 'Small additions with a big impact, discover the unique textures and forms that define your personal style.',
        img: '/src/assets/home/accessories.jpg',
        link: '/products/accessories',
    },
]

const features = [
    {
        title: 'Shop online',
        desc: 'Browse our full collection and order from the comfort of your house.',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="32" height="32"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>`,
    },
    {
        title: 'Free Delivery',
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
        desc: 'Quick and secure checkout. Shop with confidence every time.',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="32" height="32"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    },
]

const posts = [
    {
        date: 'March 28, 2024',
        category: 'Pro Design',
        title: 'What Will Our Interiors of the Future Look — and Feel — Like?',
        img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
    },
    {
        date: 'November 13, 2023',
        category: 'Interior Design',
        title: 'Furnish Your Home Like a Pro!',
        img: 'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=800&q=80',
    },
]
</script>

<style scoped>
/* ─── CATEGORIES ─── */
.categories-section {
    background: #faf6f0;
    padding: 80px 0;
    font-family: 'Jost', sans-serif;
}

.category-row {
    display: flex;
    align-items: center;
    min-height: 380px;
    padding: 0 80px;
    gap: 80px;
    margin-bottom: 40px;
}

.row-normal {
    flex-direction: row;
}

.row-reverse {
    flex-direction: row-reverse;
}

.category-text {
    flex: 1;
    max-width: 320px;
}

.category-title {
    font-family: 'Lato', sans-serif;
    font-size: clamp(22px, 2.8vw, 36px);
    font-weight: 700;
    letter-spacing: 0.1em;
    color: #2b1f14;
    margin-bottom: 18px;
}

.category-desc {
    font-size: 13.5px;
    font-weight: 300;
    color: #7a6050;
    line-height: 1.8;
    letter-spacing: 0.02em;
    margin-bottom: 32px;
}

.btn-view {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    border: 1.5px solid #2b1f14;
    color: #2b1f14;
    background: transparent;
    padding: 11px 28px;
    font-size: 13px;
    font-family: 'Jost', sans-serif;
    letter-spacing: 0.1em;
    cursor: pointer;
    transition: background 0.3s, color 0.3s;
}

.btn-view:hover {
    background: #2b1f14;
    color: #f5ede0;
}

.btn-view svg {
    width: 14px;
    height: 14px;
    transition: transform 0.25s;
}

.btn-view:hover svg {
    transform: translateX(4px);
}

.category-image-wrap {
    flex: 1;
    max-width: 520px;
    overflow: hidden;
}

.category-img {
    width: 100%;
    height: 340px;
    object-fit: cover;
    display: block;
    transition: transform 0.6s ease;
}

.category-image-wrap:hover .category-img {
    transform: scale(1.04);
}

/* ─── PROMO BANNER ─── */
.promo-banner {
    background: #b07060;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 48px;
    padding: 24px 48px;
    font-family: 'Jost', sans-serif;
}

.promo-text {
    font-size: 15px;
    font-weight: 300;
    letter-spacing: 0.04em;
    color: #f5ede0;
}

.promo-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border: 1px solid #f5ede0;
    color: #f5ede0;
    background: transparent;
    padding: 9px 22px;
    font-size: 12px;
    font-family: 'Jost', sans-serif;
    letter-spacing: 0.1em;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.3s, color 0.3s;
}

.promo-btn:hover {
    background: #f5ede0;
    color: #b07060;
}

.promo-btn svg {
    width: 13px;
    height: 13px;
}

/* ─── FEATURES ─── */
.features-section {
    background: #faf6f0;
    padding: 64px 80px;
    font-family: 'Jost', sans-serif;
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
    margin-bottom: 6px;
    text-transform: uppercase;
}

.feature-desc {
    font-size: 12px;
    font-weight: 300;
    color: #7a6050;
    line-height: 1.7;
}

/* ─── BLOG ─── */
.blog-section {
    background: #faf6f0;
    padding: 0 80px 80px;
    font-family: 'Jost', sans-serif;
}

.blog-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
    max-width: 1100px;
    margin: 0 auto;
}

.blog-card {
    display: flex;
    flex-direction: column;
}

.blog-img-wrap {
    overflow: hidden;
    margin-bottom: 16px;
}

.blog-img {
    width: 100%;
    height: 280px;
    object-fit: cover;
    display: block;
    transition: transform 0.5s ease;
}

.blog-img-wrap:hover .blog-img {
    transform: scale(1.04);
}

.blog-meta {
    display: flex;
    gap: 8px;
    margin-bottom: 10px;
    align-items: center;
}

.blog-date,
.blog-sep,
.blog-cat {
    font-size: 11px;
    color: #7a6050;
    letter-spacing: 0.04em;
}

.blog-cat {
    color: #af7164;
}

.blog-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(16px, 1.6vw, 21px);
    font-weight: 600;
    color: #2b1f14;
    line-height: 1.45;
    margin-bottom: 14px;
}

.blog-read {
    font-size: 11px;
    letter-spacing: 0.1em;
    color: #7a6050;
    text-decoration: none;
    width: fit-content;
    border-bottom: 1px solid #7a6050;
    padding-bottom: 2px;
    transition: color 0.3s, border-color 0.3s;
}

.blog-read:hover {
    color: #2b1f14;
    border-color: #2b1f14;
}

/* ─── TESTIMONIAL ─── */
.testimonial-section {
    background: #9e6050;
    padding: 72px 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 48px;
    font-family: 'Jost', sans-serif;
    text-align: center;
}

.testimonial-content {
    max-width: 520px;
}

.quote-mark {
    font-family: 'Cormorant Garamond', serif;
    font-size: 90px;
    line-height: 0.5;
    color: rgba(245, 237, 224, 0.35);
    display: block;
    margin-bottom: 20px;
}

.testimonial-quote {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(17px, 2vw, 22px);
    font-style: italic;
    font-weight: 400;
    color: #f5ede0;
    line-height: 1.75;
    margin-bottom: 28px;
}

.testimonial-name {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.1em;
    color: #f5ede0;
    margin-bottom: 4px;
}

.testimonial-role {
    font-size: 11px;
    letter-spacing: 0.18em;
    color: rgba(245, 237, 224, 0.5);
    text-transform: uppercase;
    margin-bottom: 20px;
}

.testimonial-dots {
    display: flex;
    justify-content: center;
    gap: 6px;
    margin-top: 16px;
}

.dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(245, 237, 224, 0.35);
}

.dot.active {
    background: #f5ede0;
}

.testimonial-arrow {
    width: 38px;
    height: 38px;
    background: transparent;
    border: 1px solid rgba(245, 237, 224, 0.35);
    color: #f5ede0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background 0.3s;
}

.testimonial-arrow:hover {
    background: rgba(245, 237, 224, 0.15);
}

.testimonial-arrow svg {
    width: 16px;
    height: 16px;
}

/* ─── FOOTER ─── */
.footer {
    background: #1a1208;
    padding: 72px 80px 32px;
    font-family: 'Jost', sans-serif;
}

.footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr;
    gap: 48px;
    max-width: 1200px;
    margin: 0 auto 48px;
}

.footer-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 600;
    color: #f5ede0;
    margin-bottom: 16px;
    letter-spacing: 0.04em;
}

.footer-about {
    font-size: 12px;
    font-weight: 300;
    color: rgba(245, 237, 224, 0.5);
    line-height: 1.8;
}

.footer-col-title {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #f5ede0;
    margin-bottom: 20px;
}

.footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.footer-links a {
    font-size: 12px;
    font-weight: 300;
    color: rgba(245, 237, 224, 0.5);
    text-decoration: none;
    letter-spacing: 0.02em;
    transition: color 0.3s;
}

.footer-links a:hover {
    color: #c9ad93;
}

.footer-contact {
    font-size: 12px;
    font-weight: 300;
    color: rgba(245, 237, 224, 0.5);
    line-height: 1.8;
    margin-top: 8px;
}

.footer-bottom {
    border-top: 1px solid rgba(245, 237, 224, 0.08);
    padding-top: 24px;
    text-align: center;
    max-width: 1200px;
    margin: 0 auto;
}

.footer-bottom p {
    font-size: 11px;
    color: rgba(245, 237, 224, 0.25);
    letter-spacing: 0.06em;
}

/* ─── RESPONSIVE ─── */
@media (max-width: 900px) {
    .category-row {
        flex-direction: column !important;
        padding: 0 24px;
        gap: 28px;
    }

    .category-text {
        max-width: 100%;
        text-align: center;

        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .category-image-wrap {
        max-width: 100%;
    }

    .category-img {
        height: 240px;
    }

    .btn-view {
        margin: 0 auto;
    }

    .features-section {
        padding: 40px 24px;
    }

    .features-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 28px;
    }

    .blog-section {
        padding: 0 24px 60px;
    }

    .blog-grid {
        grid-template-columns: 1fr;
    }

    .promo-banner {
        flex-direction: column;
        gap: 16px;
        text-align: center;
    }

    .testimonial-section {
        gap: 20px;
        padding: 60px 24px;
    }

    .footer {
        padding: 48px 24px 24px;
    }

    .footer-grid {
        grid-template-columns: 1fr 1fr;
        gap: 32px;
    }
}
</style>
