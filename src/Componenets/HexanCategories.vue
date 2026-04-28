<template>
    <section class="categories-section">
        <div v-for="(cat, index) in categories" :key="cat.title" class="category-row"
            :class="index % 2 === 0 ? 'row-normal' : 'row-reverse'">
            <!-- Text Side -->
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

            <!-- Image Side -->
            <div class="category-image-wrap">
                <img :src="cat.img" :alt="cat.title" class="category-img" />
            </div>
        </div>
    </section>
</template>

<script setup>
const categories = [
    {
        title: 'CHAIRS',
        desc: 'More than just a seat; a signature piece that redefines your daily ritual. Explore our collection.',
        img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80',
        link: '/products/chairs',
    },
    {
        title: 'TABLES',
        desc: 'From morning rituals to evening conversations, discover a surface built for a lifetime of stories.',
        img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
        link: '/products/tables',
    },
    {
        title: 'ROOM ACCESSORIES',
        desc: 'Small additions with a big impact, discover the unique textures and forms that define your personal style.',
        img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80',
        link: '/products/accessories',
    },
]
</script>

<style scoped>
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

/* Text */
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

/* Image */
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

/* Responsive */
@media (max-width: 768px) {
    .category-row {
        flex-direction: column !important;
        padding: 0 24px;
        gap: 28px;
    }

    .category-text {
        max-width: 100%;
        text-align: center;
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
}
</style>
