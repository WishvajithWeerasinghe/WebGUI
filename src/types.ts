// ─── PRODUCT INTERFACES ───

export interface ProductReview {
    rating: number
    comment: string
    date: string
    reviewerName: string
    reviewerEmail: string
}

export interface ProductDimensions {
    width: number
    height: number
    depth: number
}

export interface ProductMeta {
    createdAt: string
    updatedAt: string
    barcode: string
    qrCode: string
}

export interface Product {
    id: number
    title: string
    description: string
    category: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    tags: string[]
    brand?: string
    sku: string
    weight: number
    dimensions: ProductDimensions
    warrantyInformation: string
    shippingInformation: string
    availabilityStatus: string
    reviews: ProductReview[]
    returnPolicy: string
    minimumOrderQuantity: number
    meta: ProductMeta
    thumbnail: string
    images: string[]
}

export interface ProductsResponse {
    products: Product[]
    total: number
    skip: number
    limit: number
}

// ─── CART INTERFACES ───

export interface CartItem {
    id: number
    title: string
    category: string
    thumbnail: string
    price: number
    qty: number
}

// ─── PLACED ITEM (Room View) ───

export interface PlacedItem {
    uid: number
    id: number
    title: string
    thumbnail: string
    price: number
    x: number
    y: number
    w: number
}

// ─── SHIPPING INTERFACES ───

export interface ShippingForm {
    firstName: string
    lastName: string
    street: string
    city: string
    zip: string
    country: string
    state: string
    phone: string
}

export interface ShippingMethod {
    id: string
    name: string
    eta: string
    price: number
}

// ─── SIDEBAR INTERFACES ───

export interface SidebarCategory {
    label: string
    slug: string
    count: number
}

export interface ColorFilter {
    name: string
    hex: string
    count: number
}

// ─── AUTH INTERFACES ───

export interface LoginRequest {
    username: string
    password: string
}

export interface AuthUser {
    id: number
    username: string
    email: string
    firstName: string
    lastName: string
    gender: string
    image: string
    token: string
}

// ─── COMMENT INTERFACE ───

export interface CommentForm {
    text: string
    name: string
    email: string
    website: string
    save: boolean
}
