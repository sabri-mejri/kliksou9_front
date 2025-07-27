import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface UserData {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  businessName?: string
  category?: string
  shortDescription?: string
  role?: 'user' | 'business'
  interests?: string[]
  isLoggedIn?: boolean
}

export const useUserStore = defineStore('user', () => {
  const userData = ref<UserData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    isLoggedIn: false
  })

  const isBusinessOwner = computed(() => userData.value.role === 'business')

  const TEST_USERS: Record<string, UserData> = {
    'user@test.com': {
      email: 'user@test.com',
      password: 'test123',
      confirmPassword: 'test123',
      role: 'user',
      fullName: 'Test User',
      isLoggedIn: false
    },
    'business@test.com': {
      email: 'business@test.com',
      password: 'test123',
      confirmPassword: 'test123',
      role: 'business',
      fullName: 'Test Business',
      businessName: 'Demo Business',
      isLoggedIn: false
    }
  }

  function setUserData(data: Partial<UserData>) {
    userData.value = { ...userData.value, ...data }
    localStorage.setItem('userData', JSON.stringify(userData.value))
  }

  function loadUserData() {
    const stored = localStorage.getItem('userData')
    if (stored) {
      userData.value = JSON.parse(stored)
    }
  }

  function clearUserData() {
    userData.value = {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      isLoggedIn: false
    }
    localStorage.removeItem('userData')
  }

  function setLoggedIn(value: boolean) {
    userData.value.isLoggedIn = value
    localStorage.setItem('userData', JSON.stringify(userData.value))
    // ❌ Do NOT use router.push here
  }

  return {
    TEST_USERS,
    userData,
    isBusinessOwner,
    setUserData,
    loadUserData,
    clearUserData,
    setLoggedIn
  }
})
