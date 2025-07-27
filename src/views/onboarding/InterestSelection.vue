<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="max-w-4xl w-full">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          What interests you?
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Select topics you're interested in to personalize your feed and discover relevant local businesses
        </p>
      </div>

      <div class="bg-white rounded-2xl p-8 shadow-lg">
        <div class="flex flex-wrap gap-3 justify-center mb-8">
          <button
            v-for="interest in availableInterests"
            :key="interest"
            @click="toggleInterest(interest)"
            class="px-6 py-3 rounded-full border-2 font-medium transition-all duration-200 hover:scale-105"
            :class="selectedInterests.includes(interest)
              ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
              : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:bg-blue-50'"
          >
            {{ interest }}
          </button>
        </div>

        <div class="text-center">
          <p class="text-sm text-gray-500 mb-6">
            Selected {{ selectedInterests.length }} interests
          </p>

          <div class="space-y-4">
            <button
              @click="handleContinue"
              :disabled="selectedInterests.length === 0"
              class="w-full max-w-md mx-auto block py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Continue with {{ selectedInterests.length }} interests
            </button>

            <button
              @click="handleSkip"
              class="w-full max-w-md mx-auto block py-3 px-6 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>

      <div class="text-center mt-8">
        <button
          @click="goBack"
          class="text-gray-500 hover:text-gray-700 font-medium"
        >
          ← Back to sign up
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const selectedInterests = ref<string[]>([])

const availableInterests = [
  'Food & Dining',
  'Fashion',
  'Beauty & Wellness',
  'Fitness',
  'Technology',
  'Arts & Crafts',
  'Home & Garden',
  'Automotive',
  'Entertainment',
  'Professional Services',
  'Health & Medical',
  'Education',
  'Travel',
  'Sports',
  'Music',
  'Photography',
  'Books',
  'Gaming',
  'Pets',
  'Environment'
]

onMounted(() => {
  userStore.loadUserData()
  if (userStore.userData.interests) {
    selectedInterests.value = [...userStore.userData.interests]
  }
})

const toggleInterest = (interest: string) => {
  const index = selectedInterests.value.indexOf(interest)
  if (index > -1) {
    selectedInterests.value.splice(index, 1)
  } else {
    selectedInterests.value.push(interest)
  }
}

const handleContinue = () => {
  userStore.setUserData({
    interests: selectedInterests.value
  })
  
  // Redirect based on role
  if (userStore.isBusinessOwner) {
    router.push('/dashboard')
  } else {
    router.push('/feed')
  }
}

const handleSkip = () => {
  userStore.setUserData({
    interests: []
  })
  
  // Redirect based on role
  if (userStore.isBusinessOwner) {
    router.push('/dashboard')
  } else {
    router.push('/feed')
  }
}

const goBack = () => {
  const role = userStore.userData.role || 'user'
  router.push(`/onboarding/signup/${role}`)
}
</script>