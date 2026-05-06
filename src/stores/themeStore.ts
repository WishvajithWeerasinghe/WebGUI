import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
    const isDark = ref<boolean>(localStorage.getItem('theme') === 'dark')

    applyTheme(isDark.value)

    function toggle(): void {
        isDark.value = !isDark.value
        applyTheme(isDark.value)
        localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    }

    function applyTheme(dark: boolean): void {
        document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    }

    return { isDark, toggle }
})