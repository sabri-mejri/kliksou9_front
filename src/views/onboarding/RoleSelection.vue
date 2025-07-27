<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="max-w-4xl w-full">
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Welcome to LocalConnect
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Choose your role to get started and join our community of local businesses and customers
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        <!-- User Role Card -->
        <div 
          @click="handleRoleSelect('user')"
          class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-2 border border-gray-100"
        >
          <div class="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6 group-hover:bg-blue-200 transition-colors">
            <Users class="w-8 h-8 text-blue-600" />
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-4">I'm a Customer</h3>
          <p class="text-gray-600 mb-6 leading-relaxed">
            I want to browse and discover small businesses, find local gems, and connect with my community.
          </p>
          <div class="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
            Get Started
            <ArrowRight class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        <!-- Business Owner Role Card -->
        <div 
          @click="handleRoleSelect('business')"
          class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-2 border border-gray-100"
        >
          <div class="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-2xl mb-6 group-hover:bg-purple-200 transition-colors">
            <Store class="w-8 h-8 text-purple-600" />
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-4">I'm a Business Owner</h3>
          <p class="text-gray-600 mb-6 leading-relaxed">
            I want to promote my business, share posts, connect with customers, and grow my local presence.
          </p>
          <div class="flex items-center text-purple-600 font-semibold group-hover:text-purple-700">
            Get Started
            <ArrowRight class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      <div class="text-center mt-12">
        <p class="text-gray-500">
          Already have an account? 
          <router-link to="/login" class="text-blue-600 hover:text-blue-700 font-semibold ml-1 underline">
            Sign In
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Users, Store, ArrowRight } from 'lucide-vue-next'

const router = useRouter()

const handleRoleSelect = (role: 'user' | 'business') => {
  router.push(`/onboarding/signup/${role}`)
}
</script>
