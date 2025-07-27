<template>
  <button class="p-2 text-gray-400 hover:text-gray-600 relative">
    <Bell class="w-6 h-6" />
    <span v-if="hasNotification" class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
  </button>
</template>
<script setup lang="ts">
import { Bell } from 'lucide-vue-next'
defineProps<{ hasNotification?: boolean }>()
</script>