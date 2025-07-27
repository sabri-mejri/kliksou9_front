<template>
  <div v-if="show" class="fixed inset-0 bg-black z-50 flex items-center justify-center">
    <div class="relative w-full max-w-md h-full max-h-screen bg-black">
      <!-- Story Progress Bar -->
      <div class="absolute top-4 left-4 right-4 flex space-x-1 z-10">
        <div 
          v-for="(segment, index) in story?.segments || []" 
          :key="index"
          class="flex-1 h-1 bg-gray-600 rounded-full overflow-hidden"
        >
          <div 
            class="h-full bg-white transition-all duration-100 ease-linear"
            :style="{ width: getProgressWidth(index) + '%' }"
          />
        </div>
      </div>

      <!-- Story Header -->
      <div class="absolute top-8 left-4 right-4 flex items-center justify-between z-10 mt-4">
        <div class="flex items-center space-x-3">
          <img 
            :src="story?.avatar || ''" 
            :alt="story?.businessName || ''"
            class="w-10 h-10 rounded-full object-cover border-2 border-white"
          />
          <div>
            <h3 class="text-white font-medium text-sm">{{ story?.businessName }}</h3>
            <p class="text-gray-300 text-xs">{{ formatTime(currentSegment?.timestamp) }}</p>
          </div>
        </div>
        <button @click="handleClose" class="text-white hover:text-gray-300 p-2">
          <X class="w-6 h-6" />
        </button>
      </div>

      <!-- Story Content -->
      <div class="w-full h-full flex items-center justify-center relative">
        <!-- Navigation Areas -->
        <div 
          @click="previousStory"
          class="absolute left-0 top-0 w-1/3 h-full z-20 cursor-pointer"
        />
        <div 
          @click="nextStory"
          class="absolute right-0 top-0 w-1/3 h-full z-20 cursor-pointer"
        />
        
        <!-- Loading overlay -->
        <div v-if="isLoading" class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
          <div class="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
        
        <!-- Story Image/Video -->
        <img 
          v-if="currentSegment?.type === 'image' && !isLoading"
          :src="currentSegment.content" 
          :alt="currentSegment.title || ''"
          class="w-full h-full object-cover"
          @load="onImageLoad"
          @error="onImageError"
        />
        <video 
          v-else-if="currentSegment?.type === 'video' && !isLoading"
          :src="currentSegment.content"
          class="w-full h-full object-cover"
          @loadeddata="onVideoLoad"
          @error="onVideoError"
          autoplay
          muted
          loop
        />
        <div v-else-if="!isLoading" class="w-full h-full flex items-center justify-center bg-gray-900">
          <p class="text-white">No content available</p>
        </div>
        
        <!-- Story Text Overlay -->
        <div 
          v-if="(currentSegment?.title || currentSegment?.description) && !isLoading"
          class="absolute bottom-32 left-4 right-4 z-10"
        >
          <h4 v-if="currentSegment.title" class="text-white text-lg font-semibold mb-2 drop-shadow-lg">
            {{ currentSegment.title }}
          </h4>
          <p v-if="currentSegment.description" class="text-white text-sm drop-shadow-lg">
            {{ currentSegment.description }}
          </p>
        </div>
      </div>

      <!-- Message Input -->
      <div class="absolute bottom-4 left-4 right-4 z-10">
        <div class="flex items-center space-x-2">
          <div class="flex-1 relative">
            <input
              v-model="messageText"
              type="text"
              :placeholder="`Reply to ${story?.businessName}...`"
              class="w-full px-4 py-3 rounded-full bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:border-white"
              @keyup.enter="sendMessage"
            />
          </div>
          <button 
            @click="sendMessage"
            :disabled="!messageText.trim()"
            class="p-3 rounded-full transition-colors"
            :class="messageText.trim() ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-600 text-gray-400 cursor-not-allowed'"
          >
            <Send class="w-5 h-5" />
          </button>
          <button 
            @click="toggleLike"
            class="p-3 rounded-full transition-colors"
            :class="isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'"
          >
            <Heart class="w-5 h-5" :class="isLiked ? 'fill-current' : ''" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { X, Send, Heart } from 'lucide-vue-next'

const props = defineProps<{
  show: boolean,
  story: {
    id: string,
    businessName: string,
    avatar: string,
    segments: Array<{
      id: string,
      type: 'image' | 'video',
      content: string,
      title?: string,
      description?: string,
      timestamp: string,
      duration?: number
    }>
  } | null
}>()

const emit = defineEmits(['close', 'message', 'like', 'story-end', 'follow'])

// Close handler
const handleClose = () => {
  emit('close')
}

// Story state
const currentSegmentIndex = ref(0)
const progress = ref(0)
const isLoading = ref(false)
const messageText = ref('')
const isLiked = ref(false)

// Timer for auto-progression
let progressTimer: ReturnType<typeof setInterval> | null = null
const STORY_DURATION = 5000 // 5 seconds per story

const currentSegment = computed(() => {
  if (!props.story?.segments) return null
  return props.story.segments[currentSegmentIndex.value]
})

const getProgressWidth = (index: number) => {
  if (index < currentSegmentIndex.value) return 100
  if (index === currentSegmentIndex.value) return progress.value
  return 0
}

const formatTime = (timestamp?: string) => {
  if (!timestamp) return 'now'
  
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  
  if (diffHours < 1) return 'now'
  if (diffHours < 24) return `${diffHours}h`
  return `${Math.floor(diffHours / 24)}d`
}

const startProgress = () => {
  if (progressTimer) clearInterval(progressTimer)
  
  progress.value = 0
  const duration = currentSegment.value?.duration || STORY_DURATION
  const increment = 100 / (duration / 100)
  
  progressTimer = setInterval(() => {
    progress.value += increment
    
    if (progress.value >= 100) {
      nextStory()
    }
  }, 100)
}

const nextStory = () => {
  if (!props.story?.segments) return
  
  if (currentSegmentIndex.value < props.story.segments.length - 1) {
    currentSegmentIndex.value++
    startProgress()
  } else {
    emit('story-end')
    emit('close')
  }
}

const previousStory = () => {
  if (currentSegmentIndex.value > 0) {
    currentSegmentIndex.value--
    startProgress()
  } else {
    emit('close')
  }
}

const onImageLoad = () => {
  isLoading.value = false
}

const onImageError = () => {
  isLoading.value = false
  console.error('Failed to load image:', currentSegment.value?.content)
}

const onVideoLoad = () => {
  isLoading.value = false
}

const onVideoError = () => {
  isLoading.value = false
  console.error('Failed to load video:', currentSegment.value?.content)
}

const sendMessage = () => {
  if (!messageText.value.trim()) return
  
  emit('message', {
    storyId: props.story?.id,
    segmentId: currentSegment.value?.id,
    message: messageText.value.trim(),
    businessName: props.story?.businessName
  })
  
  messageText.value = ''
}

const toggleLike = () => {
  isLiked.value = !isLiked.value
  emit('like', {
    storyId: props.story?.id,
    segmentId: currentSegment.value?.id,
    liked: isLiked.value
  })
}

// Pause/resume on focus
const handleVisibilityChange = () => {
  if (document.hidden) {
    if (progressTimer) clearInterval(progressTimer)
  } else if (props.show) {
    startProgress()
  }
}

// Keyboard navigation
const handleKeydown = (event: KeyboardEvent) => {
  if (!props.show) return
  
  switch (event.key) {
    case 'Escape':
      emit('close')
      break
    case 'ArrowLeft':
      previousStory()
      break
    case 'ArrowRight':
      nextStory()
      break
  }
}

// Watchers and lifecycle
watch(() => props.show, (newShow) => {
  if (newShow && props.story) {
    currentSegmentIndex.value = 0
    progress.value = 0
    isLiked.value = false
    startProgress()
  } else {
    if (progressTimer) clearInterval(progressTimer)
  }
})

onMounted(() => {
  document.addEventListener('visibilitychange', handleVisibilityChange)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  if (progressTimer) clearInterval(progressTimer)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  document.removeEventListener('keydown', handleKeydown)
})
</script>
