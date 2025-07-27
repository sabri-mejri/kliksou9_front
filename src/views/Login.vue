<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="max-w-md w-full">
      <div class="text-center mb-8">
        <div class="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
        <p class="text-gray-600">Sign in to your account</p>
      </div>

     <form @submit="handleSubmit" class="bg-white rounded-2xl p-8 shadow-lg">

        <div class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              v-model="email"
              type="email"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              v-model="password"
              type="password"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Enter your password"
            />
          </div>
        </div>

        <div class="mt-8 space-y-4">
          <button
            type="submit"
            class="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-white transition-colors"
          >
            Sign In
          </button>

          <p class="text-center text-sm text-gray-600">
            Don't have an account? 
            <router-link to="/onboarding/role-selection" class="text-blue-600 hover:text-blue-700 font-medium">
              Sign up
            </router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()

const email = ref('')
const password = ref('')

const errorMessage = ref('')


const handleSubmit = () => {
  const testUser = userStore.TEST_USERS[email.value]

  if (testUser && testUser.password === password.value) {
    userStore.setUserData(testUser)
    userStore.setLoggedIn(true)

    // ✅ Safe routing here
    if (testUser.role === 'user') {
      router.push('/feed')
    } else if (testUser.role === 'business') {
      router.push('/dashboard')
    }
  } else {
    errorMessage.value = 'Invalid email or password'
  }
}

</script>
