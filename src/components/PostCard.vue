<template>
  <div class="bg-white rounded-2xl shadow-sm overflow-hidden relative">
    <!-- Post Header -->
    <div class="p-6 pb-4">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-3">
          <img 
            :src="post.businessAvatar" 
            :alt="post.businessName"
            class="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 class="font-semibold text-gray-900">{{ post.businessName }}</h3>
            <div class="flex items-center space-x-2">
              <div class="flex items-center">
                <Star 
                  v-for="i in 5" 
                  :key="i"
                  class="w-4 h-4"
                  :class="i <= post.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'"
                />
              </div>
              <span class="text-sm text-gray-500">{{ post.rating }}/5 ({{ post.reviewCount }} reviews)</span>
            </div>
          </div>
        </div>
        <button class="p-2 text-gray-400 hover:text-gray-600">
          <MoreHorizontal class="w-5 h-5" />
        </button>
      </div>
      <p class="text-gray-700 mb-4">{{ post.description }}</p>
    </div>

    <!-- Post Image with Price and Buy Now Button -->
    <div class="relative">
      <img 
        :src="post.image" 
        :alt="post.title"
        class="w-full h-80 object-cover"
      />
      <!-- Price badge -->
      <span class="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow">
        ${{ post.price }}
      </span>
      <!-- Buy Now Button -->
      <button
        @click="$emit('buy-now', post)"
        class="absolute bottom-3 right-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg flex items-center"
        title="Buy Now"
      >
        <ShoppingCart class="w-5 h-5" />
      </button>
    </div>

    <!-- Add to Basket Button -->
    <div class="flex justify-end px-6 pt-4">
      <button
        @click="$emit('add-to-basket', post)"
        class="flex items-center space-x-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
      >
        <ShoppingCart class="w-5 h-5" />
        <span>Add to Basket</span>
      </button>
    </div>

    <!-- Post Actions (like, comment, share, time) -->
    <div class="p-6 pt-4">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-6">
          <button 
            @click="$emit('like')"
            class="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
          >
            <Heart 
              class="w-6 h-6" 
              :class="post.isLiked ? 'text-red-500 fill-current' : ''"
            />
            <span class="text-sm font-medium">{{ post.likes }}</span>
          </button>
          <button 
            @click="$emit('toggle-comments')"
            class="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors"
          >
            <MessageCircle class="w-6 h-6" />
            <span class="text-sm font-medium">{{ post.comments.length }}</span>
          </button>
          <button class="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors">
            <Share2 class="w-6 h-6" />
            <span class="text-sm font-medium">Share</span>
          </button>
        </div>
        <span class="text-xs text-gray-400">{{ formatTime(post.timestamp) }}</span>
      </div>
      <!-- Comments Section -->
      <div v-if="post.showComments" class="border-t border-gray-100 pt-3">
        <div class="space-y-2 mb-3">
          <div 
            v-for="comment in post.comments.slice(0, 3)" 
            :key="comment.id"
            class="flex items-start space-x-2"
          >
            <img 
              :src="comment.userAvatar" 
              :alt="comment.userName"
              class="w-6 h-6 rounded-full object-cover"
            />
            <div class="flex-1">
              <div class="bg-gray-100 rounded-lg p-2">
                <p class="font-medium text-gray-900 text-xs">{{ comment.userName }}</p>
                <p class="text-gray-700 text-xs">{{ comment.text }}</p>
              </div>
              <div class="flex items-center space-x-3 mt-1">
                <button class="text-xs text-gray-500 hover:text-gray-700">Like</button>
                <button class="text-xs text-gray-500 hover:text-gray-700">Reply</button>
                <span class="text-xs text-gray-500">{{ comment.time }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Add Comment -->
        <div class="flex items-center space-x-2">
          <img 
            src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg" 
            alt="Your avatar"
            class="w-6 h-6 rounded-full object-cover"
          />
          <div class="flex-1 flex items-center space-x-2">
            <input
              :value="newComment"
              @input="handleCommentInput"
              type="text"
              placeholder="Add a comment..."
              class="flex-1 px-3 py-2 border border-gray-300 rounded-full text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              @keyup.enter="$emit('comment')"
            />
            <button 
              @click="$emit('photo-upload')"
              class="p-1 text-gray-400 hover:text-gray-600"
            >
              <Camera class="w-4 h-4" />
            </button>
            <button 
              @click="$emit('comment')"
              class="p-1 text-blue-600 hover:text-blue-700"
            >
              <Send class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Star, MoreHorizontal, Heart, MessageCircle, Share2, Camera, Send, ShoppingCart } from 'lucide-vue-next'
import { mockPosts } from '../mocks/posts'
import { ref } from 'vue';

const posts = ref(mockPosts)

defineProps<{
  post: any,
  newComment: string
}>()

const emit = defineEmits(['like', 'comment', 'toggle-comments', 'review', 'update:newComment', 'photo-upload', 'add-to-basket', 'buy-now'])

const formatTime = (timestamp?: string) => {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  if (diffMins < 1) return 'now'
  if (diffMins < 60) return `${diffMins}m`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours}h`
  return `${Math.floor(diffHours / 24)}d`
}

// Handle input event with proper TypeScript typing
const handleCommentInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target) {
    emit('update:newComment', target.value)
  }
}
</script>