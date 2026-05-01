<template>
    <div class="page-wrapper">
        <!-- NAV -->
        <nav class="nav">
            <RouterLink to="/" class="logo-wrap">
                <img src="@/assets/logo.png" alt="Hexan Logo" class="nav-logo" />
            </RouterLink>
            <div class="nav-steps">
                <div v-for="(step, i) in steps" :key="step" class="step-item">
                    <div class="step-dot" :class="{ active: currentStep >= i, done: currentStep > i }">
                        <svg v-if="currentStep > i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="12" height="12"><polyline points="20 6 9 17 4 12"/></svg>
                        <span v-else>{{ i + 1 }}</span>
                    </div>
                    <span class="step-label" :class="{ active: currentStep >= i }">{{ step }}</span>
                    <div v-if="i < steps.length - 1" class="step-line" :class="{ done: currentStep > i }"></div>
                </div>
            </div>
            <div class="nav-right">
                <RouterLink to="/products" class="back-link">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="14" height="14"><polyline points="15 18 9 12 15 6"/></svg>
                    Back to Products
                </RouterLink>
            </div>
        </nav>

        <div class="page-body">
            <!-- MAIN FORM -->
            <main class="main-content">
                <h1 class="page-title">Shipping Details</h1>

                <div class="form-section">
                    <!-- Name Row -->
                    <div class="form-row two-col">
                        <div class="form-group">
                            <label class="form-label">FIRST NAME</label>
                            <input v-model="form.firstName" type="text" class="form-input" placeholder="" />
                        </div>
                        <div class="form-group">
                            <label class="form-label">LAST NAME</label>
                            <input v-model="form.lastName" type="text" class="form-input" placeholder="" />
                        </div>
                    </div>

                    <!-- Street -->
                    <div class="form-group">
                        <label class="form-label">STREET ADDRESS</label>
                        <input v-model="form.street" type="text" class="form-input" placeholder="" />
                    </div>

                    <!-- City + Zip -->
                    <div class="form-row two-col">
                        <div class="form-group">
                            <label class="form-label">CITY</label>
                            <input v-model="form.city" type="text" class="form-input" placeholder="" />
                        </div>
                        <div class="form-group">
                            <label class="form-label">ZIP / POSTAL CODE</label>
                            <input v-model="form.zip" type="text" class="form-input" placeholder="" />
                        </div>
                    </div>

                    <!-- Country + State -->
                    <div class="form-row two-col">
                        <div class="form-group">
                            <label class="form-label">COUNTRY</label>
                            <select v-model="form.country" class="form-input form-select">
                                <option value="">Select country</option>
                                <option>United States</option>
                                <option>United Kingdom</option>
                                <option>Canada</option>
                                <option>Australia</option>
                                <option>Sri Lanka</option>
                                <option>India</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">STATE / PROVINCE</label>
                            <input v-model="form.state" type="text" class="form-input" placeholder="" />
                        </div>
                    </div>

                    <!-- Phone -->
                    <div class="form-group">
                        <label class="form-label">PHONE NUMBER</label>
                        <input v-model="form.phone" type="tel" class="form-input" placeholder="" />
                    </div>
                </div>

                <!-- SHIPPING METHOD -->
                <div class="shipping-method">
                    <h3 class="method-title">SHIPPING METHOD</h3>
                    <div
                        v-for="method in shippingMethods"
                        :key="method.id"
                        class="method-option"
                        :class="{ selected: selectedMethod === method.id }"
                        @click="selectedMethod = method.id"
                    >
                        <div class="method-radio">
                            <div class="radio-dot" :class="{ active: selectedMethod === method.id }"></div>
                        </div>
                        <div class="method-info">
                            <p class="method-name">{{ method.name }}</p>
                            <p class="method-eta">{{ method.eta }}</p>
                        </div>
                        <span class="method-price">${{ method.price.toFixed(2) }}</span>
                    </div>
                </div>

                <!-- BACK + CONTINUE -->
                <div class="form-actions">
                    <RouterLink to="/products" class="btn-back">← Back to Products</RouterLink>
                    <button class="btn-continue" @click="continueToPayment">
                        CONTINUE TO PAYMENT →
                    </button>
                </div>

                <p class="secure-note">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="13" height="13"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                    All transactions are secure and encrypted. Your privacy is fully protected.
                </p>
            </main>

            <!-- ORDER SUMMARY SIDEBAR -->
            <aside class="sidebar">
                <h3 class="sidebar-title">Order Inventory</h3>

                <div class="order-items">
                    <div v-for="item in cartItems" :key="item.id" class="order-item">
                        <div class="item-img-wrap">
                            <img :src="item.thumbnail" :alt="item.title" class="item-img" />
                            <span class="item-qty">{{ item.qty }}</span>
                        </div>
                        <div class="item-info">
                            <p class="item-name">{{ item.title }}</p>
                            <p class="item-cat">{{ item.category }}</p>
                        </div>
                        <span class="item-price">${{ (item.price * item.qty).toFixed(2) }}</span>
                    </div>
                </div>

                <!-- Coupon -->
                <div class="coupon-row">
                    <input v-model="couponCode" type="text" placeholder="coupon code" class="coupon-input" />
                    <button class="coupon-btn" @click="applyCoupon">APPLY</button>
                </div>

                <!-- Totals -->
                <div class="totals">
                    <div class="total-row">
                        <span>SUBTOTAL</span>
                        <span>${{ subtotal.toFixed(2) }}</span>
                    </div>
                    <div class="total-row">
                        <span>SHIPPING</span>
                        <span>${{ selectedShipping.price.toFixed(2) }}</span>
                    </div>
                    <div class="total-row discount" v-if="discountAmount > 0">
                        <span>DISCOUNT</span>
                        <span>-${{ discountAmount.toFixed(2) }}</span>
                    </div>
                    <div class="total-row grand">
                        <span>Total</span>
                        <span>${{ grandTotal.toFixed(2) }}</span>
                    </div>
                </div>

                <button class="btn-place-order" @click="continueToPayment">
                    PLACE ORDER →
                </button>

                <p class="sidebar-note">
                    By placing this order, you agree to our Terms of Service and Privacy Policy. Hevan Room is committed to your satisfaction.
                </p>
            </aside>
        </div>

        <!-- FOOTER MINIMAL -->
        <div class="footer-minimal">
            <p>© 2024 Hevan Room. All rights reserved.</p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentStep = ref(0)
const steps = ['Cart', 'Payment', 'Review']

const form = ref({
    firstName: '', lastName: '', street: '',
    city: '', zip: '', country: '', state: '', phone: ''
})

const shippingMethods = [
    { id: 'priority', name: 'Priority Courier', eta: 'Arrives in approximately 2–3 business days', price: 12.00 },
    { id: 'standard', name: 'Standard Shipping', eta: 'Arrives in approximately 5–7 business days', price: 5.00 },
    { id: 'free', name: 'Free Shipping', eta: 'Arrives in approximately 10–14 business days', price: 0.00 },
]

const selectedMethod = ref('priority')
const couponCode = ref('')
const discountAmount = ref(0)

// Sample cart items — in a real app these would come from a Pinia store
const cartItems = ref([
    { id: 1, title: 'The Heirloom Oak Chair', category: 'furniture', thumbnail: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=200&q=80', price: 1419.00, qty: 1 },
    { id: 2, title: 'Nickel', category: 'decor', thumbnail: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=200&q=80', price: 430.00, qty: 1 },
])

const selectedShipping = computed(() => shippingMethods.find(m => m.id === selectedMethod.value))
const subtotal = computed(() => cartItems.value.reduce((s, i) => s + i.price * i.qty, 0))
const grandTotal = computed(() => subtotal.value + selectedShipping.value.price - discountAmount.value)

function applyCoupon() {
    if (couponCode.value.toLowerCase() === 'hevan10') {
        discountAmount.value = subtotal.value * 0.1
    } else {
        discountAmount.value = 0
        alert('Invalid coupon code')
    }
}

function continueToPayment() {
    currentStep.value = 1
    // navigate to payment page or show confirmation
    alert('Proceeding to payment… (connect your payment gateway here)')
}
</script>

<style scoped>
.page-wrapper { background: #faf6f0; min-height: 100vh; font-family: 'Jost', sans-serif; }

/* NAV */
.nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 48px;
    background: rgba(232,217,196,.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(180,140,100,.2);
    position: sticky;
    top: 0;
    z-index: 100;
}
.nav-logo { height: 40px; object-fit: contain; }

/* Steps */
.nav-steps { display: flex; align-items: center; gap: 0; }
.step-item { display: flex; align-items: center; gap: 8px; }
.step-dot {
    width: 26px; height: 26px;
    border-radius: 50%;
    border: 1.5px solid rgba(180,140,100,.4);
    background: transparent;
    color: #a09080;
    font-size: 11px;
    display: flex; align-items: center; justify-content: center;
    transition: all .3s;
    flex-shrink: 0;
}
.step-dot.active { border-color: #b85c38; color: #b85c38; }
.step-dot.done { background: #b85c38; border-color: #b85c38; color: #fff; }
.step-label { font-size: 12px; letter-spacing: .08em; color: #a09080; transition: color .3s; white-space: nowrap; }
.step-label.active { color: #2b1f14; }
.step-line { width: 40px; height: 1px; background: rgba(180,140,100,.3); margin: 0 10px; }
.step-line.done { background: #b85c38; }

.nav-right { }
.back-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: #7a6050;
    text-decoration: none;
    letter-spacing: .06em;
    transition: color .2s;
}
.back-link:hover { color: #b85c38; }

/* LAYOUT */
.page-body {
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 48px;
    padding: 40px 48px 80px;
    max-width: 1100px;
    margin: 0 auto;
    align-items: start;
}

/* MAIN */
.page-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(24px, 3vw, 36px);
    font-weight: 600;
    color: #2b1f14;
    margin-bottom: 32px;
}

.form-section { margin-bottom: 36px; }

.form-row { display: flex; gap: 20px; }
.form-row.two-col > * { flex: 1; }

.form-group { margin-bottom: 20px; }

.form-label {
    display: block;
    font-size: 10px;
    letter-spacing: .14em;
    color: #a09080;
    margin-bottom: 7px;
    font-weight: 600;
}

.form-input {
    width: 100%;
    border: none;
    border-bottom: 1px solid rgba(180,140,100,.4);
    background: transparent;
    padding: 10px 0;
    font-size: 13px;
    font-family: 'Jost', sans-serif;
    color: #2b1f14;
    outline: none;
    transition: border-color .2s;
    box-sizing: border-box;
}
.form-input:focus { border-bottom-color: #b85c38; }
.form-select { cursor: pointer; }

/* Shipping Method */
.shipping-method { margin-bottom: 36px; }
.method-title {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .14em;
    color: #a09080;
    margin-bottom: 14px;
}
.method-option {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 16px;
    border: 1px solid rgba(180,140,100,.25);
    background: #fff;
    cursor: pointer;
    margin-bottom: 8px;
    transition: border-color .2s, background .2s;
}
.method-option.selected { border-color: #b85c38; background: rgba(184,92,56,.04); }
.method-option:hover { border-color: rgba(184,92,56,.4); }

.method-radio { flex-shrink: 0; }
.radio-dot {
    width: 18px; height: 18px;
    border-radius: 50%;
    border: 1.5px solid rgba(180,140,100,.5);
    display: flex; align-items: center; justify-content: center;
    transition: border-color .2s;
}
.radio-dot.active { border-color: #b85c38; }
.radio-dot.active::after {
    content: '';
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #b85c38;
}

.method-info { flex: 1; }
.method-name { font-size: 13px; font-weight: 500; color: #2b1f14; margin-bottom: 3px; }
.method-eta { font-size: 11px; color: #7a6050; }
.method-price { font-size: 13px; font-weight: 500; color: #2b1f14; white-space: nowrap; }

/* Actions */
.form-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    flex-wrap: wrap;
    gap: 12px;
}
.btn-back {
    font-size: 12px;
    color: #7a6050;
    text-decoration: none;
    letter-spacing: .06em;
    transition: color .2s;
}
.btn-back:hover { color: #b85c38; }

.btn-continue {
    background: #8b3a20;
    color: #f5ede0;
    border: none;
    padding: 14px 32px;
    font-size: 12px;
    font-family: 'Jost', sans-serif;
    letter-spacing: .14em;
    cursor: pointer;
    transition: background .3s;
}
.btn-continue:hover { background: #2b1f14; }

.secure-note {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 11px;
    color: #a09080;
    letter-spacing: .03em;
    margin-top: 4px;
}

/* SIDEBAR */
.sidebar {
    background: #fff;
    border: 1px solid rgba(180,140,100,.2);
    padding: 24px;
    position: sticky;
    top: 90px;
}

.sidebar-title {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: #2b1f14;
    margin-bottom: 20px;
}

.order-items { display: flex; flex-direction: column; gap: 16px; margin-bottom: 20px; }

.order-item { display: flex; align-items: center; gap: 12px; }

.item-img-wrap {
    position: relative;
    flex-shrink: 0;
}
.item-img { width: 58px; height: 50px; object-fit: cover; display: block; }
.item-qty {
    position: absolute;
    top: -6px; right: -6px;
    width: 18px; height: 18px;
    border-radius: 50%;
    background: #2b1f14;
    color: #f5ede0;
    font-size: 9px;
    display: flex; align-items: center; justify-content: center;
}

.item-info { flex: 1; min-width: 0; }
.item-name { font-size: 12px; font-weight: 500; color: #2b1f14; margin-bottom: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.item-cat { font-size: 10px; color: #a09080; text-transform: capitalize; }
.item-price { font-size: 12px; font-weight: 500; color: #2b1f14; white-space: nowrap; }

/* Coupon */
.coupon-row {
    display: flex;
    gap: 0;
    margin-bottom: 20px;
    border: 1px solid rgba(180,140,100,.3);
}
.coupon-input {
    flex: 1;
    border: none;
    background: transparent;
    padding: 10px 12px;
    font-size: 12px;
    font-family: 'Jost', sans-serif;
    color: #2b1f14;
    outline: none;
}
.coupon-input::placeholder { color: #b8a090; }
.coupon-btn {
    background: #2b1f14;
    color: #f5ede0;
    border: none;
    padding: 10px 14px;
    font-size: 10px;
    font-family: 'Jost', sans-serif;
    letter-spacing: .1em;
    cursor: pointer;
    transition: background .3s;
}
.coupon-btn:hover { background: #b85c38; }

/* Totals */
.totals { border-top: 1px solid rgba(180,140,100,.2); padding-top: 16px; margin-bottom: 20px; }
.total-row {
    display: flex;
    justify-content: space-between;
    padding: 6px 0;
    font-size: 11px;
    letter-spacing: .08em;
    color: #7a6050;
}
.total-row.discount { color: #b85c38; }
.total-row.grand {
    font-size: 16px;
    font-weight: 600;
    color: #2b1f14;
    padding-top: 12px;
    margin-top: 6px;
    border-top: 1px solid rgba(180,140,100,.2);
    font-family: 'Cormorant Garamond', serif;
}

.btn-place-order {
    width: 100%;
    background: #8b3a20;
    color: #f5ede0;
    border: none;
    padding: 14px;
    font-size: 11px;
    font-family: 'Jost', sans-serif;
    letter-spacing: .14em;
    cursor: pointer;
    transition: background .3s;
    margin-bottom: 14px;
}
.btn-place-order:hover { background: #2b1f14; }

.sidebar-note {
    font-size: 10px;
    color: #a09080;
    line-height: 1.6;
    text-align: center;
}

/* FOOTER MINIMAL */
.footer-minimal {
    text-align: center;
    padding: 20px;
    border-top: 1px solid rgba(180,140,100,.15);
    font-size: 11px;
    color: #a09080;
    letter-spacing: .06em;
}

/* RESPONSIVE */
@media (max-width: 860px) {
    .page-body { grid-template-columns: 1fr; padding: 24px 20px 60px; }
    .sidebar { position: static; }
    .nav { padding: 14px 20px; flex-wrap: wrap; gap: 12px; }
    .nav-steps { order: 3; width: 100%; justify-content: center; }
    .form-row.two-col { flex-direction: column; gap: 0; }
}
</style>
