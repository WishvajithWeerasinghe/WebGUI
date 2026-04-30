<template>
    <!-- NAV -->
    <nav>
        <a href="#" class="logo">
            <div class="logo-icon">
                <img :src="logoUrl" alt="Hexan Logo" class="logo-img" />
            </div>

        </a>
        <div class="nav-links">
            <a href="javascript:void(0)" @click="navigate('/')">Home</a>
            <a href="javascript:void(0)" @click="navigate('/products')">Products</a>
            <a href="javascript:void(0)" @click="navigate('/room')">Room</a>
            <a href="javascript:void(0)" @click="navigate('/about')">About us</a>
        </div>
        <div class="nav-icons">
            <button aria-label="Search" @click="navigate('/products')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
            </button>
            <button aria-label="Cart">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 01-8 0" />
                </svg>
            </button>
            <button aria-label="Menu">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
            </button>
        </div>
    </nav>

    <!-- HERO -->
    <section class="hero" @mousemove="onMouseMove">
        <div class="wall-texture"></div>
        <div class="floor"></div>

        <h2 class="hero-headline">MAKE YOUR SPACE INSPIRING</h2>

        <!-- Pendant Lamp -->
        <div class="floating-item item-pendant" :style="parallax(0.04, 0.03)">
            <img src="@/assets/hanging_lamp.png" alt="hanging lamp"
                style="width: 250px; height: auto; transform: rotate(0deg);">
        </div>

        <!-- Lamp Table -->
        <div class="floating-item item-sidetable" :style="parallax(0.06, 0.04)">
            <img src="@/assets/lamp_table.png" alt="Lamp Table"
                style="width: 350px; height: auto; transform: rotate(-15deg);">
        </div>

        <!-- Table Lamp -->
        <div class="floating-item item-lamp" :style="parallax(0.07, 0.05)">
            <img src="@/assets/table_lamp.png" alt="Table Lamp"
                style="width: 300px; height: auto; transform: rotate(10deg);">
        </div>

        <!-- Stool -->
        <div class="floating-item item-stool" :style="parallax(0.05, 0.04)">
            <img src="@/assets/stool.png" alt="Stool" style="width: 200px; height: auto; transform: rotate(10deg);">
        </div>

        <!-- sofa -->
        <div class="floating-item item-chair" :style="parallax(0.06, 0.05)">
            <img src="@/assets/sofa.png" alt="Sofa" style="width: 500px; height: auto; transform: rotate(10deg);">
        </div>

        <!-- Copy Block -->
        <div class="hero-copy">
            <p>Your space shapes your mindset. Design a room<br>that makes your next big idea feel inevitable.</p>
            <button class="btn-view">
                View more
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                </svg>
            </button>
        </div>

        <!-- Arrows -->
        <button class="arrow arrow-left">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15 18 9 12 15 6" />
            </svg>
        </button>
        <button class="arrow arrow-right">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6" />
            </svg>
        </button>

        <!-- Scroll Hint -->
        <div class="scroll-hint">
            <span>Scroll</span>
            <div class="scroll-line"></div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

import logoImg from '@/assets/logo.png'

const router = useRouter()
const mouse = ref({ x: 0, y: 0 })
const logoUrl = logoImg

function navigate(path) {
    router.push(path)
}

function onMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    mouse.value.x = (e.clientX - rect.left) / rect.width - 0.5
    mouse.value.y = (e.clientY - rect.top) / rect.height - 0.5
}

function parallax(sx, sy) {
    const dx = mouse.value.x * sx * 220
    const dy = mouse.value.y * sy * 220
    return { transform: `translate(${dx}px, ${dy}px)` }
}


</script>

<style scoped>
*,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

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

nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 48px;
    background: rgba(232, 217, 196, .85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(180, 140, 100, .2);
}

.logo-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
}

.logo-icon {
    width: auto;
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.logo span {
    font-family: var(--font-main);
    color: var(--color-text-dark);
    line-height: 1.1;
    font-weight: 600;
}

.nav-links {
    display: flex;
    gap: 36px;
}

.nav-links a {
    font-size: 14px;
    letter-spacing: .06em;
    color: var(--color-text-dark);
    text-decoration: none;
    position: relative;
    transition: color .3s;
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

.nav-links a:hover {
    color: #b85c38;
}

.nav-links a:hover::after {
    width: 100%;
}

.nav-icons {
    display: flex;
    gap: 22px;
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

.hero {
    min-height: 100vh;

    background:
        /* linear-gradient(160deg, rgba(223, 201, 170, 0.7) 0%, rgba(184, 149, 106, 0.4) 100%), */
        url('../assets/bg.jpg');

    background-position: 50% 20%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;

    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.wall-texture {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 30% 40%, rgba(255, 255, 255, .08) 0%, transparent 60%);
}

.hero-headline {
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
    font-family: 'Lato', sans-serif;
    font-size: clamp(30px, 5.5vw, 72px);
    font-weight: 700;
    color: #4a2b11;
    letter-spacing: .03em;
    white-space: nowrap;
    z-index: 10;
}

.hero-copy {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 10;
    width: 420px;
    background: rgba(180, 130, 80, .25);
    backdrop-filter: blur(6px);
    border: 1px solid rgba(255, 255, 255, .25);
    border-radius: 4px;
    padding: 28px 32px;
}

.hero-copy p {
    font-size: 15px;
    font-weight: 300;
    line-height: 1.75;
    color: #f5ede0;
    letter-spacing: .04em;
    margin-bottom: 22px;
}

.btn-view {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    border: 1.5px solid #f5ede0;
    color: #f5ede0;
    background: transparent;
    padding: 11px 28px;
    font-size: 13px;
    font-family: 'Jost', sans-serif;
    letter-spacing: .12em;
    cursor: pointer;
    transition: background .3s, color .3s;
}

.btn-view:hover {
    background: #f5ede0;
    color: #2b1f14;
}

.btn-view svg {
    width: 14px;
    height: 14px;
}

.floating-item {
    position: absolute;
    will-change: transform;
    transition: transform .08s linear;
    z-index: 5;
    filter: drop-shadow(0 20px 40px rgba(40, 20, 0, .35));
}

.item-lamp {
    bottom: 30%;
    left: 5%;
    width: 160px;
    animation: floatA 5s ease-in-out infinite;
}

.item-sidetable {
    bottom: -10%;
    left: 10%;
    width: 140px;
    animation: floatB 6s ease-in-out infinite 1s;
}

.item-stool {
    bottom: -10%;
    left: 70%;
    width: 100px;
    margin-left: -50px;
    animation: floatA 4.5s ease-in-out infinite 0.5s;
}

.item-chair {
    bottom: 15%;
    right: 12%;
    width: 210px;
    animation: floatB 5.5s ease-in-out infinite 0.8s;
}

.item-desk {
    bottom: 20%;
    left: 32%;
    width: 220px;
    animation: floatB 7s ease-in-out infinite 0.4s;
}

.item-pendant {
    top: 0%;
    left: 43%;
    width: 120px;
    animation: floatA 4s ease-in-out infinite 0.3s;
}

.pendant-line {
    position: absolute;
    top: 0;
    left: 50%;
    width: 2px;
    height: 80px;
    background: #2b1f14;
    transform: translateX(-50%);
}

@keyframes floatA {

    0%,
    100% {
        translate: 0 0
    }

    50% {
        translate: 0 -14px
    }
}

@keyframes floatB {

    0%,
    100% {
        translate: 0 0
    }

    50% {
        translate: 0 -10px
    }
}

.arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    height: 44px;
    background: rgba(255, 255, 255, .45);
    backdrop-filter: blur(4px);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 20;
    transition: background .3s;
}

.arrow:hover {
    background: rgba(255, 255, 255, .7);
}

.arrow-left {
    left: 0;
}

.arrow-right {
    right: 0;
}

.arrow svg {
    width: 18px;
    height: 18px;
    stroke: #2b1f14;
}

.scroll-hint {
    position: absolute;
    bottom: 28px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    z-index: 20;
}

.scroll-hint span {
    font-size: 10px;
    letter-spacing: .18em;
    color: #2b1f14;
    opacity: .6;
    text-transform: uppercase;
}

.scroll-line {
    width: 1px;
    height: 40px;
    background: linear-gradient(to bottom, #2b1f14, transparent);
    animation: scrollPulse 2s ease-in-out infinite;
}

@keyframes scrollPulse {

    0%,
    100% {
        opacity: .3
    }

    50% {
        opacity: 1
    }
}
</style>