<template>
    <!-- Custom Cursor -->
    <div id="cursor-dot" :style="{ left: cursorX + 'px', top: cursorY + 'px' }"></div>
    <div id="cursor-ring" :style="{ left: cursorX + 'px', top: cursorY + 'px' }"></div>

    <!-- NAV -->
    <nav>
        <a href="#" class="logo">
            <div class="logo-icon">
                <img :src="logoUrl" alt="Hexan Logo" class="logo-img" />
            </div>

        </a>
        <div class="nav-links">
            <a href="#">Home</a>
            <RouterLink to="/products">Products</RouterLink>
            <a href="#">Room</a>
            <a href="#">About us</a>
        </div>
        <div class="nav-icons">
            <button aria-label="Search">
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

        <h1 class="hero-headline">MAKE YOUR SPACE INSPIRING</h1>

        <!-- Pendant Lamp -->
        <div class="floating-item item-pendant" :style="parallax(0.04, 0.03)">
            <div class="pendant-line"></div>
            <svg viewBox="0 0 120 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="lg" cx="50%" cy="30%">
                        <stop offset="0%" stop-color="#f5ede0" />
                        <stop offset="100%" stop-color="#c09a6a" />
                    </radialGradient>
                </defs>
                <ellipse cx="60" cy="150" rx="50" ry="50" fill="url(#lg)" opacity=".9" />
                <ellipse cx="60" cy="140" rx="50" ry="20" fill="#a07840" opacity=".4" />
                <line x1="60" y1="100" x2="60" y2="0" stroke="#2b1f14" stroke-width="2" />
            </svg>
        </div>

        <!-- Side Table -->
        <div class="floating-item item-sidetable" :style="parallax(0.06, 0.04)">
            <svg viewBox="0 0 140 180" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="70" cy="38" rx="64" ry="16" fill="#1a1208" />
                <rect x="56" y="38" width="28" height="110" fill="#2b1f14" rx="4" />
                <ellipse cx="70" cy="155" rx="48" ry="12" fill="#1a1208" />
            </svg>
        </div>

        <!-- Table Lamp -->
        <div class="floating-item item-lamp" :style="parallax(0.07, 0.05)">
            <svg viewBox="0 0 160 260" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="shade" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="#e8d0a8" />
                        <stop offset="100%" stop-color="#c4a060" />
                    </linearGradient>
                    <linearGradient id="base" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#b87c3a" />
                        <stop offset="100%" stop-color="#7a4e1e" />
                    </linearGradient>
                </defs>
                <path d="M30 80 L10 160 L150 160 L130 80 Z" fill="url(#shade)" stroke="#a07030" stroke-width="1.5" />
                <ellipse cx="80" cy="80" rx="50" ry="14" fill="#d4b070" />
                <ellipse cx="80" cy="160" rx="70" ry="16" fill="#b8901a" opacity=".7" />
                <rect x="72" y="160" width="16" height="60" fill="url(#base)" rx="6" />
                <ellipse cx="80" cy="220" rx="44" ry="12" fill="#5a3010" />
                <ellipse cx="80" cy="230" rx="40" ry="8" fill="#3a1e08" />
            </svg>
        </div>

        <!-- Bar Stool -->
        <div class="floating-item item-stool" :style="parallax(0.05, 0.04)">
            <svg viewBox="0 0 100 220" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="stool" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stop-color="#c09a6a" />
                        <stop offset="100%" stop-color="#906030" />
                    </linearGradient>
                </defs>
                <ellipse cx="50" cy="30" rx="44" ry="14" fill="url(#stool)" />
                <rect x="44" y="30" width="12" height="130" fill="#a07840" rx="4" />
                <line x1="20" y1="140" x2="80" y2="140" stroke="#906030" stroke-width="8" stroke-linecap="round" />
                <line x1="44" y1="160" x2="25" y2="210" stroke="#a07840" stroke-width="8" stroke-linecap="round" />
                <line x1="56" y1="160" x2="75" y2="210" stroke="#a07840" stroke-width="8" stroke-linecap="round" />
            </svg>
        </div>

        <!-- Armchair -->
        <div class="floating-item item-chair" :style="parallax(0.06, 0.05)">
            <svg viewBox="0 0 220 280" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="fabric" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="#c04030" />
                        <stop offset="50%" stop-color="#a03028" />
                        <stop offset="100%" stop-color="#802010" />
                    </linearGradient>
                </defs>
                <rect x="20" y="20" width="180" height="160" rx="20" fill="url(#fabric)" />
                <path d="M40 50 Q80 70 120 50 Q160 30 200 50" stroke="#601008" stroke-width="2" fill="none"
                    opacity=".5" />
                <path d="M30 80 Q80 100 130 80 Q175 62 210 80" stroke="#601008" stroke-width="2" fill="none"
                    opacity=".5" />
                <path d="M25 110 Q80 130 135 110 Q175 95 215 110" stroke="#601008" stroke-width="2" fill="none"
                    opacity=".5" />
                <rect x="10" y="150" width="200" height="60" rx="14" fill="#b03028" />
                <rect x="0" y="120" width="28" height="90" rx="14" fill="#c04030" />
                <rect x="192" y="120" width="28" height="90" rx="14" fill="#c04030" />
                <path d="M30 210 Q25 260 20 270" stroke="#5a3020" stroke-width="10" stroke-linecap="round"
                    fill="none" />
                <path d="M190 210 Q195 260 200 270" stroke="#5a3020" stroke-width="10" stroke-linecap="round"
                    fill="none" />
                <path d="M65 210 Q62 255 60 268" stroke="#5a3020" stroke-width="8" stroke-linecap="round" fill="none" />
                <path d="M155 210 Q158 255 160 268" stroke="#5a3020" stroke-width="8" stroke-linecap="round"
                    fill="none" />
            </svg>
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

import logoImg from '@/assets/logo.png'

const cursorX = ref(0)
const cursorY = ref(0)
const mouse = ref({ x: 0, y: 0 })
const logoUrl = logoImg

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


onMounted(() => window.addEventListener('mousemove', updateCursor))
onUnmounted(() => window.removeEventListener('mousemove', updateCursor))
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

    --color-text-dark: #2b1f14;
    --color-text-light: #f5ede0;
    --color-glass: rgba(180, 130, 80, 0.25);

    /* Fonts */
    --font-main: 'Cormorant Garamond', serif;
    --font-ui: 'Jost', sans-serif;
}

#cursor-dot {
    width: 8px;
    height: 8px;
    background: var(--color-accent);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
}

#cursor-ring {
    width: 36px;
    height: 36px;
    border: 1.5px solid #b85c38;
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%, -50%);
    transition: left .12s ease, top .12s ease;
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
    color: #2b1f14;
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
    font-size: clamp(36px, 5.5vw, 72px);
    font-weight: 700;
    color: var(--color-text-dark);
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
    bottom: 22%;
    left: 8%;
    width: 160px;
    animation: floatA 5s ease-in-out infinite;
}

.item-sidetable {
    bottom: 20%;
    left: 3%;
    width: 140px;
    animation: floatB 6s ease-in-out infinite 1s;
}

.item-stool {
    bottom: 18%;
    left: 70%;
    width: 100px;
    margin-left: -50px;
    animation: floatA 4.5s ease-in-out infinite 0.5s;
}

.item-chair {
    bottom: 18%;
    right: 4%;
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
    top: 8%;
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