<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="max-w-md w-full">
      <div class="text-center mb-8">
        <div class="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-2xl"
             :class="role === 'business' ? 'bg-purple-100' : 'bg-blue-100'">
          <Store v-if="role === 'business'" class="w-8 h-8" 
                 :class="role === 'business' ? 'text-purple-600' : 'text-blue-600'" />
          <Users v-else class="w-8 h-8" 
                 :class="role === 'business' ? 'text-purple-600' : 'text-blue-600'" />
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          {{ role === 'business' ? 'Business Registration' : 'Create Account' }}
        </h1>
        <p class="text-gray-600">
          {{ role === 'business' ? 'Set up your business profile' : 'Join our community of local discovery' }}
        </p>
      </div>

      <form @submit.prevent="handleSubmit" class="bg-white rounded-2xl p-8 shadow-lg">
        <!-- Basic Information -->
        <div class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              v-model="formData.fullName"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              v-model="formData.email"
              type="email"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              v-model="formData.password"
              type="password"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Create a password"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <input
              v-model="formData.confirmPassword"
              type="password"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Confirm your password"
            />
          </div>

          <!-- Business-specific fields -->
          <template v-if="role === 'business'">
            <div class="border-t pt-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Business Information</h3>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                  <input
                    v-model="formData.businessName"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="Enter your business name"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    v-model="formData.category"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Select a category</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="retail">Retail</option>
                    <option value="beauty">Beauty & Wellness</option>
                    <option value="fitness">Fitness</option>
                    <option value="automotive">Automotive</option>
                    <option value="professional">Professional Services</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
                  <textarea
                    v-model="formData.shortDescription"
                    rows="3"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Briefly describe your business..."
                  ></textarea>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Logo (Optional)</label>
                  <div class="flex items-center space-x-4">
                    <div class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Camera class="w-6 h-6 text-gray-400" />
                    </div>
                    <button
                      type="button"
                      class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Upload Logo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>

        <div class="mt-8 space-y-4">
          <button
            type="submit"
            class="w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors"
            :class="role === 'business' 
              ? 'bg-purple-600 hover:bg-purple-700' 
              : 'bg-blue-600 hover:bg-blue-700'"
          >
            {{ role === 'business' ? 'Create Business Account' : 'Create Account' }}
          </button>

          <button
            type="button"
            @click="goBack"
            class="w-full py-3 px-4 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Back to Role Selection
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { Users, Store, Camera } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const role = ref<'user' | 'business'>('user')

const formData = ref({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  businessName: '',
  category: '',
  shortDescription: ''
})

onMounted(() => {
  role.value = route.params.role as 'user' | 'business'
  userStore.loadUserData()
  
  // Pre-fill form if data exists
  if (userStore.userData.fullName) {
    formData.value = { ...userStore.userData }
  }
})

const handleSubmit = () => {
  if (formData.value.password !== formData.value.confirmPassword) {
    alert('Passwords do not match!')
    return
  }

  // Save user data
  userStore.setUserData({
    ...formData.value,
    role: role.value
  })

  // Redirect to interests page
  router.push('/onboarding/interests')
}

const goBack = () => {
  router.push('/onboarding/role-selection')
}
</script>