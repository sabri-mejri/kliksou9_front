<template>
  <div class="relative">
    <!-- Left Arrow -->
    <button
      @click="scrollLeft"
      class="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow p-1 hover:bg-gray-100"
      v-if="showLeftArrow"
    >
      <ChevronLeft class="w-5 h-5 text-gray-600" />
    </button>

    <!-- Story Scroll Container -->
    <div
      ref="scrollContainer"
      class="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide px-1"
      @wheel.passive="handleWheel"
    >
      <!-- Add Story -->
      <div class="flex-shrink-0 text-center">
        <div
          class="w-16 h-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mb-2 cursor-pointer hover:scale-105 transition-transform"
        >
          <Plus class="w-8 h-8 text-gray-600" />
        </div>
        <p class="text-xs text-gray-600">Add Story</p>
      </div>

      <!-- Stories -->
      <div
        v-for="story in stories"
        :key="story.id"
        class="flex-shrink-0 text-center cursor-pointer"
        @click="$emit('view', story)"
      >
        <div
          class="w-16 h-16 rounded-full p-0.5 mb-2 hover:scale-105 transition-transform"
          :class="story.viewed
            ? 'bg-gray-300'
            : 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500'"
        >
          <img
            :src="story.avatar"
            :alt="story.businessName"
            class="w-full h-full rounded-full object-cover border-2 border-white"
          />
        </div>
        <p class="text-xs text-gray-600 truncate w-16">{{ story.businessName }}</p>
      </div>
    </div>

    <!-- Right Arrow -->
    <button
      @click="scrollRight"
      class="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow p-1 hover:bg-gray-100"
      v-if="showRightArrow"
    >
      <ChevronRight class="w-5 h-5 text-gray-600" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Plus, ChevronLeft, ChevronRight } from 'lucide-vue-next'

defineProps<{ stories: any[] }>()
defineEmits(['view'])

const scrollContainer = ref<HTMLDivElement | null>(null)
const showLeftArrow = ref(false)
const showRightArrow = ref(true)

const updateArrowVisibility = () => {
  const el = scrollContainer.value
  if (el) {
    showLeftArrow.value = el.scrollLeft > 0
    showRightArrow.value = el.scrollLeft + el.clientWidth < el.scrollWidth
  }
}

const scrollLeft = () => {
  scrollContainer.value?.scrollBy({ left: -200, behavior: 'smooth' })
}
const scrollRight = () => {
  scrollContainer.value?.scrollBy({ left: 200, behavior: 'smooth' })
}

const handleWheel = (e: WheelEvent) => {
  if (e.deltaY !== 0) {
    e.preventDefault()
    scrollContainer.value?.scrollBy({ left: e.deltaY, behavior: 'smooth' })
  }
}

onMounted(() => {
  const el = scrollContainer.value
  if (el) {
    el.addEventListener('scroll', updateArrowVisibility)
    updateArrowVisibility()
  }
})
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
