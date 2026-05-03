import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
    const isDark = ref(localStorage.getItem('theme') === 'dark')

    // Apply on init
    applyTheme(isDark.value)

    function toggle() {
        isDark.value = !isDark.value
        applyTheme(isDark.value)
        localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    }

    function applyTheme(dark) {
        document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    }

    return { isDark, toggle }
})
