<template>
    <!-- MENU OVERLAY -->
    <Teleport to="body">
        <!-- Backdrop -->
        <Transition name="fade">
            <div v-if="menuOpen || showLogin || showSignup" class="backdrop" @click="closeAll"></div>
        </Transition>

        <!-- SLIDE-IN MENU DRAWER -->
        <Transition name="slide-right">
            <div v-if="menuOpen && !showLogin && !showSignup" class="menu-drawer">
                <button class="drawer-close" @click="menuOpen = false">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>

                <div class="drawer-logo">
                    <img src="@/assets/logo.png" alt="Hexan" class="drawer-logo-img" />
                </div>

                <nav class="drawer-nav">
                    <RouterLink to="/" class="drawer-link" @click="menuOpen = false">Home</RouterLink>
                    <RouterLink to="/products" class="drawer-link" @click="menuOpen = false">Products</RouterLink>
                    <RouterLink to="/room" class="drawer-link" @click="menuOpen = false">Room</RouterLink>
                    <RouterLink to="/about" class="drawer-link" @click="menuOpen = false">About us</RouterLink>
                </nav>

                <div class="drawer-divider"></div>

                <div class="drawer-actions">
                    <!-- Login / Signup -->
                    <button class="drawer-action-btn" @click="openLogin">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="18" height="18"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        Login / Sign in
                    </button>

                    <!-- Dark Mode Toggle -->
                    <button class="drawer-action-btn" @click="toggleDark">
                        <svg v-if="!isDark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="18" height="18"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
                        <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="18" height="18"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                        {{ isDark ? 'Light Mode' : 'Dark Mode' }}
                        <span class="toggle-pill" :class="{ on: isDark }">
                            <span class="toggle-knob"></span>
                        </span>
                    </button>

                    <!-- Help -->
                    <button class="drawer-action-btn" @click="menuOpen = false">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="18" height="18"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                        Help & Support
                    </button>
                </div>

                <div class="drawer-footer">
                    <p>© 2024 Hevan Room</p>
                </div>
            </div>
        </Transition>

        <!-- LOGIN MODAL -->
        <Transition name="scale-up">
            <div v-if="showLogin" class="auth-modal">
                <button class="modal-close" @click="closeAll">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                </button>

                <!-- Left image -->
                <div class="modal-img-side">
                    <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80" alt="Room" class="modal-img" />
                    <div class="modal-img-logo">
                        <img src="@/assets/logo.png" alt="Hexan" style="height:48px;object-fit:contain;" />
                    </div>
                </div>

                <!-- Right form -->
                <div class="modal-form-side">
                    <h2 class="modal-title">USER LOGIN</h2>

                    <div class="auth-form">
                        <div class="auth-field">
                            <label class="auth-label">EMAIL</label>
                            <input v-model="login.email" type="email" placeholder="A.B.C Parks" class="auth-input" />
                        </div>
                        <div class="auth-field">
                            <label class="auth-label">PASSWORD</label>
                            <input v-model="login.password" type="password" placeholder="123 Pineapple Road Lane" class="auth-input" />
                        </div>

                        <div class="auth-forgot">
                            <a href="#" class="forgot-link">Forgot Password?</a>
                        </div>

                        <button class="btn-auth" @click="handleLogin">SIGN IN</button>

                        <p class="auth-switch">
                            Don't Have An Account?
                            <button class="switch-link" @click="switchToSignup">Sign up</button>
                        </p>
                    </div>
                </div>
            </div>
        </Transition>

        <!-- SIGNUP MODAL -->
        <Transition name="scale-up">
            <div v-if="showSignup" class="auth-modal">
                <button class="modal-close" @click="closeAll">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                </button>

                <!-- Left image -->
                <div class="modal-img-side">
                    <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80" alt="Room" class="modal-img" />
                    <div class="modal-img-logo">
                        <img src="@/assets/logo.png" alt="Hexan" style="height:48px;object-fit:contain;" />
                    </div>
                </div>

                <!-- Right form -->
                <div class="modal-form-side">
                    <h2 class="modal-title">SIGNUP</h2>

                    <div class="auth-form">
                        <div class="auth-field">
                            <label class="auth-label">USERNAME</label>
                            <input v-model="signup.username" type="text" placeholder="A.B.C Zelimir" class="auth-input" />
                        </div>
                        <div class="auth-field">
                            <label class="auth-label">EMAIL</label>
                            <input v-model="signup.email" type="email" placeholder="email@gmail.com" class="auth-input" />
                        </div>
                        <div class="auth-field">
                            <label class="auth-label">PASSWORD</label>
                            <input v-model="signup.password" type="password" placeholder="123 Pineapple Road Lane" class="auth-input" />
                        </div>

                        <label class="auth-check">
                            <input type="checkbox" v-model="signup.agree" />
                            <span>Agree Terms And Condition</span>
                        </label>

                        <button class="btn-auth" @click="handleSignup">REGISTER</button>

                        <p class="auth-switch">
                            Already Have An Account?
                            <button class="switch-link" @click="switchToLogin">Sign in</button>
                        </p>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
import { ref } from 'vue'

const menuOpen = ref(false)
const showLogin = ref(false)
const showSignup = ref(false)
const isDark = ref(false)

const login = ref({ email: '', password: '' })
const signup = ref({ username: '', email: '', password: '', agree: false })

// Expose openMenu so parent nav can call it
defineExpose({ openMenu: () => { menuOpen.value = true } })

function openLogin() {
    menuOpen.value = false
    showLogin.value = true
    showSignup.value = false
}

function switchToSignup() {
    showLogin.value = false
    showSignup.value = true
}

function switchToLogin() {
    showSignup.value = false
    showLogin.value = true
}

function closeAll() {
    menuOpen.value = false
    showLogin.value = false
    showSignup.value = false
}

function toggleDark() {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark', isDark.value)
}

function handleLogin() {
    if (!login.value.email || !login.value.password) {
        alert('Please fill in all fields.')
        return
    }
    alert(`Welcome back! Logged in as ${login.value.email}`)
    closeAll()
}

function handleSignup() {
    if (!signup.value.username || !signup.value.email || !signup.value.password) {
        alert('Please fill in all fields.')
        return
    }
    if (!signup.value.agree) {
        alert('Please agree to the terms and conditions.')
        return
    }
    alert(`Account created for ${signup.value.username}! Welcome to Hevan Room.`)
    closeAll()
}
</script>

<style scoped>
/* BACKDROP */
.backdrop {
    position: fixed;
    inset: 0;
    background: rgba(43, 20, 5, 0.45);
    backdrop-filter: blur(3px);
    z-index: 200;
}

/* DRAWER */
.menu-drawer {
    position: fixed;
    top: 0; right: 0;
    width: 300px;
    height: 100vh;
    background: #faf6f0;
    z-index: 300;
    display: flex;
    flex-direction: column;
    padding: 32px 28px;
    box-shadow: -8px 0 40px rgba(43,20,5,.18);
}

.drawer-close {
    position: absolute;
    top: 20px; right: 20px;
    background: transparent;
    border: none;
    cursor: pointer;
    color: #2b1f14;
    padding: 4px;
    transition: color .2s;
}
.drawer-close:hover { color: #b85c38; }

.drawer-logo { margin-bottom: 40px; margin-top: 8px; }
.drawer-logo-img { height: 44px; object-fit: contain; }

.drawer-nav {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 8px;
}

.drawer-link {
    font-size: 15px;
    font-family: 'Jost', sans-serif;
    letter-spacing: .06em;
    color: #2b1f14;
    text-decoration: none;
    padding: 10px 0;
    border-bottom: 1px solid rgba(180,140,100,.12);
    transition: color .2s, padding-left .2s;
}
.drawer-link:hover { color: #b85c38; padding-left: 6px; }

.drawer-divider {
    height: 1px;
    background: rgba(180,140,100,.2);
    margin: 20px 0;
}

.drawer-actions {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
}

.drawer-action-btn {
    display: flex;
    align-items: center;
    gap: 12px;
    background: transparent;
    border: none;
    font-size: 14px;
    font-family: 'Jost', sans-serif;
    letter-spacing: .05em;
    color: #2b1f14;
    cursor: pointer;
    padding: 12px 0;
    border-bottom: 1px solid rgba(180,140,100,.12);
    text-align: left;
    width: 100%;
    transition: color .2s;
}
.drawer-action-btn:hover { color: #b85c38; }

/* Toggle pill */
.toggle-pill {
    margin-left: auto;
    width: 36px; height: 20px;
    border-radius: 10px;
    background: rgba(180,140,100,.3);
    position: relative;
    transition: background .3s;
    flex-shrink: 0;
}
.toggle-pill.on { background: #b85c38; }
.toggle-knob {
    position: absolute;
    top: 3px; left: 3px;
    width: 14px; height: 14px;
    border-radius: 50%;
    background: #fff;
    transition: transform .3s;
}
.toggle-pill.on .toggle-knob { transform: translateX(16px); }

.drawer-footer {
    font-size: 11px;
    color: #a09080;
    letter-spacing: .06em;
    padding-top: 20px;
}

/* AUTH MODAL */
.auth-modal {
    position: fixed;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: min(680px, 95vw);
    background: #faf6f0;
    z-index: 300;
    display: grid;
    grid-template-columns: 1fr 1fr;
    overflow: hidden;
    box-shadow: 0 32px 80px rgba(43,20,5,.3);
}

.modal-close {
    position: absolute;
    top: 14px; right: 14px;
    background: #faf6f0;
    border: 1.5px solid rgba(180,140,100,.4);
    border-radius: 50%;
    width: 32px; height: 32px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    color: #b85c38;
    z-index: 10;
    transition: background .2s;
}
.modal-close:hover { background: #b85c38; color: #fff; }

/* Image side */
.modal-img-side {
    position: relative;
    overflow: hidden;
}
.modal-img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
}
.modal-img-logo {
    position: absolute;
    top: 16px; left: 16px;
    background: rgba(250,246,240,.85);
    padding: 8px 12px;
    backdrop-filter: blur(4px);
}

/* Form side */
.modal-form-side {
    padding: 40px 36px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.modal-title {
    font-family: 'Jost', sans-serif;
    font-size: 18px;
    font-weight: 400;
    letter-spacing: .2em;
    color: #c9a87a;
    text-align: center;
    margin-bottom: 32px;
}

.auth-form { display: flex; flex-direction: column; gap: 0; }

.auth-field { margin-bottom: 18px; }

.auth-label {
    display: block;
    font-size: 10px;
    letter-spacing: .14em;
    color: #a09080;
    font-weight: 600;
    margin-bottom: 7px;
}

.auth-input {
    width: 100%;
    border: 1px solid rgba(180,140,100,.35);
    background: #fff;
    padding: 11px 14px;
    font-size: 12px;
    font-family: 'Jost', sans-serif;
    color: #2b1f14;
    outline: none;
    box-sizing: border-box;
    transition: border-color .2s;
}
.auth-input:focus { border-color: #b85c38; }
.auth-input::placeholder { color: #c8b8a8; }

.auth-forgot {
    text-align: right;
    margin-bottom: 20px;
    margin-top: -6px;
}
.forgot-link {
    font-size: 11px;
    color: #a09080;
    text-decoration: none;
    letter-spacing: .04em;
    transition: color .2s;
}
.forgot-link:hover { color: #b85c38; }

.auth-check {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    color: #7a6050;
    cursor: pointer;
    margin-bottom: 20px;
    letter-spacing: .03em;
}

.btn-auth {
    width: 100%;
    background: #8b3a20;
    color: #f5ede0;
    border: none;
    padding: 14px;
    font-size: 12px;
    font-family: 'Jost', sans-serif;
    letter-spacing: .16em;
    cursor: pointer;
    margin-bottom: 16px;
    transition: background .3s;
}
.btn-auth:hover { background: #2b1f14; }

.auth-switch {
    font-size: 11px;
    color: #a09080;
    text-align: center;
    letter-spacing: .04em;
}
.switch-link {
    background: transparent;
    border: none;
    font-size: 11px;
    font-family: 'Jost', sans-serif;
    color: #b85c38;
    cursor: pointer;
    padding: 0;
    margin-left: 4px;
    text-decoration: underline;
    transition: color .2s;
}
.switch-link:hover { color: #2b1f14; }

/* TRANSITIONS */
.fade-enter-active, .fade-leave-active { transition: opacity .25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-right-enter-active, .slide-right-leave-active { transition: transform .3s cubic-bezier(.4,0,.2,1); }
.slide-right-enter-from, .slide-right-leave-to { transform: translateX(100%); }

.scale-up-enter-active, .scale-up-leave-active { transition: opacity .25s ease, transform .25s ease; }
.scale-up-enter-from, .scale-up-leave-to { opacity: 0; transform: translate(-50%, -48%) scale(.96); }

/* RESPONSIVE */
@media (max-width: 600px) {
    .auth-modal { grid-template-columns: 1fr; }
    .modal-img-side { display: none; }
    .menu-drawer { width: 100%; }
}
</style>
