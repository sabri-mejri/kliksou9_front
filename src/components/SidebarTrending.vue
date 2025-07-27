<template>
  <div class="bg-white rounded-2xl shadow-sm p-4 mb-6">
    <h3 class="font-semibold text-gray-900 mb-4">Top Trending</h3>
    <div v-for="trend in trending" :key="trend.id" class="flex items-center mb-4">
      <img :src="trend.avatar" :alt="trend.name" class="w-10 h-10 rounded-full object-cover mr-3" />
      <div>
        <div class="font-medium text-gray-800">{{ trend.name }}</div>
        <div class="text-xs text-gray-500">{{ trend.category }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{ trending: any[] }>()
</script>