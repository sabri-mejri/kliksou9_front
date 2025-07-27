<script setup lang="ts">
import { ref, computed } from 'vue'
import StoryBar from '../components/StoryBar.vue'
import StoryModal from '../components/StoryModal.vue'
import PostCard from '../components/PostCard.vue'
import SidebarSuggested from '../components/SidebarSuggested.vue'
import SidebarTrending from '../components/SidebarTrending.vue'
import SearchBar from '../components/SearchBar.vue'
import NotificationBell from '../components/NotificationBell.vue'
import { mockStories } from '../mocks/stories'
import { mockPosts } from '../mocks/posts'
import { Home, Search, User, ShoppingCart, Heart, Star } from "lucide-vue-next";

const logo = 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' // Replace with your logo path or import
const searchQuery = ref('')

// Example data for suggested users (replace with your actual logic/fetch)
const suggested = ref([
  { id: 1, name: 'User One', avatar: 'avatar1.png', category: 'Bakery' },
  { id: 2, name: 'User Two', avatar: 'avatar2.png', category: 'Fitness' }
])

const trending = ref([
  { id: 1, name: 'Bloom Boutique', category: 'Fashion', avatar: 'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg' },
  { id: 2, name: 'Café Luna', category: 'Coffee Shop', avatar: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg' },
  { id: 3, name: 'Tech Repair', category: 'Electronics', avatar: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg' }
])

// Popular Products data
const popularProducts = ref([
  {
    id: 1,
    name: 'Artisan Bread',
    price: 8.99,
    originalPrice: 12.99,
    image: 'https://images.pexels.com/photos/1440/pexels-photo-1440.jpeg',
    store: 'Fresh Bakery Co.',
    rating: 4.8,
    reviews: 124,
    discount: 31,
    isWishlisted: false
  },
  {
    id: 2,
    name: 'Handmade Ceramic Mug',
    price: 24.99,
    originalPrice: 29.99,
    image: 'https://images.pexels.com/photos/1906440/pexels-photo-1906440.jpeg',
    store: 'Pottery Studio',
    rating: 4.9,
    reviews: 89,
    discount: 17,
    isWishlisted: true
  },
  {
    id: 3,
    name: 'Organic Honey',
    price: 15.99,
    originalPrice: 19.99,
    image: 'https://images.pexels.com/photos/162786/honey-jar-honey-jar-162786.jpeg',
    store: 'Local Bee Farm',
    rating: 4.7,
    reviews: 203,
    discount: 20,
    isWishlisted: false
  },
  {
    id: 4,
    name: 'Handcrafted Soap',
    price: 6.99,
    originalPrice: 8.99,
    image: 'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg',
    store: 'Natural Essentials',
    rating: 4.6,
    reviews: 156,
    discount: 22,
    isWishlisted: false
  }
])

// Inspiration data
const inspirationItems = ref([
  {
    id: 1,
    title: 'Cozy Home Decor',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    category: 'Home & Garden',
    likes: 1247,
    isLiked: false
  },
  {
    id: 2,
    title: 'Sustainable Fashion',
    image: 'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg',
    category: 'Fashion',
    likes: 892,
    isLiked: true
  },
  {
    id: 3,
    title: 'Artisan Coffee',
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
    category: 'Food & Drink',
    likes: 1567,
    isLiked: false
  },
  {
    id: 4,
    title: 'Handmade Jewelry',
    image: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg',
    category: 'Accessories',
    likes: 734,
    isLiked: false
  },
  {
    id: 5,
    title: 'Garden Fresh',
    image: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg',
    category: 'Home & Garden',
    likes: 1103,
    isLiked: true
  },
  {
    id: 6,
    title: 'Local Art',
    image: 'https://images.pexels.com/photos/1029243/pexels-photo-1029243.jpeg',
    category: 'Art & Culture',
    likes: 678,
    isLiked: false
  }
])

// Use mock stories data and add viewed property
const stories = ref(mockStories.map(story => ({
  ...story,
  viewed: Math.random() > 0.5 // Randomly set viewed status
})))

type Comment = {
  id: number
  userName: string
  userAvatar: string
  text: string
  time: string
  image: string | null
}

const posts = ref(mockPosts)

const newComments = ref<Record<number, string>>({})

const showStoryModal = ref(false)
const activeStory = ref<any>(null)
const followedStories = ref<number[]>([])

const openStoryModal = (story: any) => {
  activeStory.value = story
  showStoryModal.value = true
}

const closeStoryModal = () => {
  showStoryModal.value = false
  activeStory.value = null
}

const followStory = (storyId: number) => {
  if (!followedStories.value.includes(storyId)) {
    followedStories.value.push(storyId)
  }
}

const filteredStories = computed(() => stories.value)

const toggleLike = (postId: number) => {
  const post = posts.value.find(p => p.id === postId)
  if (post) {
    post.isLiked = !post.isLiked
    post.likes += post.isLiked ? 1 : -1
  }
}
const toggleComments = (postId: number) => {
  const post = posts.value.find(p => p.id === postId)
  if (post) {
    post.showComments = !post.showComments
  }
}
const addComment = (postId: number) => {
  const commentText = newComments.value[postId]
  if (!commentText?.trim()) return
  const post = posts.value.find(p => p.id === postId)
  if (post) {
    const newComment = {
      id: post.comments.length + 1,
      userName: 'You',
      userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      text: commentText,
      time: 'now',
      image: null
    }
    post.comments.unshift(newComment)
    newComments.value[post.id] = ''
  }
}
const openPhotoUpload = (postId: number) => {
  // Implement photo upload logic
}
const openReviewModal = (post: any) => {
  // Implement review modal logic
}

// Basket functionality
const basketItems = ref<any[]>([])

const addToBasket = (item: any) => {
  const existingItem = basketItems.value.find(b => b.id === item.id)
  if (existingItem) {
    existingItem.quantity += 1
  } else {
    basketItems.value.push({ ...item, quantity: 1 })
  }
}

const removeFromBasket = (itemId: number) => {
  const index = basketItems.value.findIndex(b => b.id === itemId)
  if (index !== -1) {
    basketItems.value.splice(index, 1)
  }
}

const basketTotal = computed(() => {
  return basketItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

const basketItemCount = computed(() => {
  return basketItems.value.reduce((sum, item) => sum + item.quantity, 0)
})

// Tab functionality
const activeTab = ref('home')

// Filter functionality
const activeFilter = ref('all')
const showFilters = ref(false)

const filterOptions = [
  { id: 'all', label: 'All Posts', icon: '📱' },
  { id: 'food', label: 'Food & Drink', icon: '🍽️' },
  { id: 'fashion', label: 'Fashion', icon: '👗' },
  { id: 'home', label: 'Home & Garden', icon: '🏠' },
  { id: 'art', label: 'Art & Culture', icon: '🎨' },
  { id: 'tech', label: 'Technology', icon: '💻' },
  { id: 'fitness', label: 'Fitness', icon: '💪' },
  { id: 'beauty', label: 'Beauty', icon: '💄' }
]

const filteredPosts = computed(() => {
  if (activeFilter.value === 'all') {
    return posts.value
  }
  return posts.value.filter(post => post.category === activeFilter.value)
})

const setFilter = (filterId: string) => {
  activeFilter.value = filterId
  showFilters.value = false
}

// Popular Products functions
const toggleWishlist = (productId: number) => {
  const product = popularProducts.value.find(p => p.id === productId)
  if (product) {
    product.isWishlisted = !product.isWishlisted
  }
}

const addProductToBasket = (product: any) => {
  addToBasket(product)
}

// Inspiration functions
const toggleInspirationLike = (itemId: number) => {
  const item = inspirationItems.value.find(i => i.id === itemId)
  if (item) {
    item.isLiked = !item.isLiked
    item.likes += item.isLiked ? 1 : -1
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header with Logo and Search Bar -->
    <header class="bg-white shadow-sm border-b sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center space-x-2">
            <img :src="logo" alt="Logo" class="w-8 h-8" />
            <h1 class="text-xl font-bold text-gray-900 hidden sm:block">LocalConnect</h1>
            <h1 class="text-lg font-bold text-gray-900 sm:hidden">LC</h1>
          </div>
          
          <!-- Search Bar - Hidden on mobile, shown on tablet and up -->
          <div class="hidden md:block flex-1 max-w-md mx-4">
            <SearchBar
              v-model="searchQuery"
              placeholder="Search posts, reels, or stories..."
            />
          </div>
          
          <!-- Mobile Search Button -->
          <div class="md:hidden">
            <button class="p-2 text-gray-600 hover:text-gray-900">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </div>
          
          <!-- Notification Bell -->
          <NotificationBell :has-notification="true" />
        </div>
      </div>
    </header>

    <!-- Mobile Search Bar - Full width on mobile -->
    <div class="md:hidden bg-white border-b px-4 py-3">
      <SearchBar
        v-model="searchQuery"
        placeholder="Search posts, reels, or stories..."
      />
    </div>

    <!-- Main Content -->
    <div class="flex justify-center max-w-7xl mx-auto">
      <!-- Left Sidebar - Hidden on mobile, shown on xl and up -->
      <aside class="hidden xl:block w-72 mr-6 flex-shrink-0">
        <div class="sticky top-20 space-y-6">
          <SidebarSuggested :suggested="suggested" />
          
          <!-- Popular Products Section -->
          <div class="bg-white rounded-2xl shadow-sm p-4">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-lg font-semibold text-gray-900">Popular Products</h2>
              <button class="text-blue-600 text-sm font-medium hover:text-blue-700">View All</button>
            </div>
            <div class="space-y-3">
              <div 
                v-for="product in popularProducts.slice(0, 3)" 
                :key="product.id"
                class="group relative bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <!-- Product Image -->
                <div class="relative aspect-square overflow-hidden">
                  <img 
                    :src="product.image" 
                    :alt="product.name"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <!-- Discount Badge -->
                  <div class="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    -{{ product.discount }}%
                  </div>
                  <!-- Wishlist Button -->
                  <button 
                    @click="toggleWishlist(product.id)"
                    class="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                  >
                    <Heart 
                      :class="product.isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'"
                      class="w-4 h-4"
                    />
                  </button>
                </div>
                
                <!-- Product Info -->
                <div class="p-3">
                  <h3 class="font-medium text-gray-900 text-sm mb-1 truncate">{{ product.name }}</h3>
                  <p class="text-xs text-gray-500 mb-2">{{ product.store }}</p>
                  
                  <!-- Rating -->
                  <div class="flex items-center mb-2">
                    <Star class="w-3 h-3 text-yellow-400 fill-current" />
                    <span class="text-xs text-gray-600 ml-1">{{ product.rating }}</span>
                    <span class="text-xs text-gray-400 ml-1">({{ product.reviews }})</span>
                  </div>
                  
                  <!-- Price -->
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-1">
                      <span class="font-semibold text-gray-900">${{ product.price }}</span>
                      <span class="text-xs text-gray-400 line-through">${{ product.originalPrice }}</span>
                    </div>
                    <button 
                      @click="addProductToBasket(product)"
                      class="bg-blue-600 text-white text-xs px-2 py-1 rounded-full hover:bg-blue-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
      
      <!-- Main Content Area -->
      <main class="flex-1 min-w-0">
        <div class="px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <!-- Stories Section -->
          <div class="mb-6 sm:mb-8 bg-white rounded-2xl shadow-sm p-4 sm:p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Stories</h2>
            <div class="overflow-hidden">
              <StoryBar :stories="filteredStories" @view="openStoryModal" />
            </div>
          </div>
          
          <!-- Posts Filter Section -->
          <div class="mb-6 sm:mb-8 bg-white rounded-2xl shadow-sm p-4 sm:p-6">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <h2 class="text-lg font-semibold text-gray-900 mb-3 sm:mb-0">Posts</h2>
              
              <!-- Filter Controls -->
              <div class="flex items-center space-x-3">
                <!-- Active Filter Display -->
                <div class="flex items-center space-x-2">
                  <span class="text-sm text-gray-600">Filter:</span>
                  <div class="flex items-center space-x-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                    <span class="text-sm">{{ filterOptions.find(f => f.id === activeFilter)?.icon }}</span>
                    <span class="text-sm font-medium">{{ filterOptions.find(f => f.id === activeFilter)?.label }}</span>
                    <button 
                      @click="showFilters = !showFilters"
                      class="ml-1 p-0.5 hover:bg-blue-100 rounded-full transition-colors"
                    >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <!-- Clear Filter Button -->
                <button 
                  v-if="activeFilter !== 'all'"
                  @click="setFilter('all')"
                  class="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
            
            <!-- Filter Dropdown -->
            <div 
              v-if="showFilters"
              class="border-t pt-4"
            >
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  v-for="filter in filterOptions"
                  :key="filter.id"
                  @click="setFilter(filter.id)"
                  class="flex items-center space-x-2 p-3 rounded-lg text-left transition-colors"
                  :class="activeFilter === filter.id 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'"
                >
                  <span class="text-lg">{{ filter.icon }}</span>
                  <span class="text-sm font-medium">{{ filter.label }}</span>
                </button>
              </div>
            </div>
          </div>
          
          <!-- Posts Feed -->
          <div class="space-y-4 sm:space-y-6">
            <PostCard
              v-for="post in filteredPosts"
              :key="post.id"
              :post="post"
              :newComment="newComments[post.id]"
              @like="toggleLike(post.id)"
              @comment="addComment(post.id)"
              @toggle-comments="toggleComments(post.id)"
              @review="openReviewModal(post)"
              @update:newComment="val => newComments[post.id] = val"
              @photo-upload="openPhotoUpload(post.id)"
            />
          </div>
        </div>
      </main>
      
      <!-- Right Sidebar - Hidden on mobile, shown on xl and up -->
      <aside class="hidden xl:block w-72 ml-6 flex-shrink-0">
        <div class="sticky top-20 space-y-6">
          <SidebarTrending :trending="trending" />
          
          <!-- Inspiration Section -->
          <div class="bg-white rounded-2xl shadow-sm p-4">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-lg font-semibold text-gray-900">Get Inspired</h2>
              <button class="text-blue-600 text-sm font-medium hover:text-blue-700">Explore More</button>
            </div>
            <div class="space-y-3">
              <div 
                v-for="item in inspirationItems.slice(0, 4)" 
                :key="item.id"
                class="group relative bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <!-- Inspiration Image -->
                <div class="relative aspect-square overflow-hidden">
                  <img 
                    :src="item.image" 
                    :alt="item.title"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <!-- Category Badge -->
                  <div class="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                    {{ item.category }}
                  </div>
                  <!-- Like Button -->
                  <button 
                    @click.stop="toggleInspirationLike(item.id)"
                    class="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                  >
                    <Heart 
                      :class="item.isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'"
                      class="w-4 h-4"
                    />
                  </button>
                </div>
                
                <!-- Inspiration Info -->
                <div class="p-3">
                  <h3 class="font-medium text-gray-900 text-sm mb-1">{{ item.title }}</h3>
                  <div class="flex items-center text-xs text-gray-500">
                    <Heart class="w-3 h-3 mr-1" />
                    <span>{{ item.likes.toLocaleString() }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>

    <!-- Bottom Navigation Bar -->
    <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div class="flex justify-around items-center h-16">
        <button 
          @click="activeTab = 'home'"
          class="flex flex-col items-center space-y-1 p-2"
          :class="activeTab === 'home' ? 'text-blue-600' : 'text-gray-600'"
        >
          <Home class="w-6 h-6" />
          <span class="text-xs">Home</span>
        </button>
        
        <button 
          @click="activeTab = 'search'"
          class="flex flex-col items-center space-y-1 p-2"
          :class="activeTab === 'search' ? 'text-blue-600' : 'text-gray-600'"
        >
          <Search class="w-6 h-6" />
          <span class="text-xs">Search</span>
        </button>
        
        <button 
          @click="activeTab = 'profile'"
          class="flex flex-col items-center space-y-1 p-2"
          :class="activeTab === 'profile' ? 'text-blue-600' : 'text-gray-600'"
        >
          <User class="w-6 h-6" />
          <span class="text-xs">Profile</span>
        </button>
        
        <button 
          @click="activeTab = 'basket'"
          class="flex flex-col items-center space-y-1 p-2 relative"
          :class="activeTab === 'basket' ? 'text-blue-600' : 'text-gray-600'"
        >
          <ShoppingCart class="w-6 h-6" />
          <span class="text-xs">Basket</span>
          <span 
            v-if="basketItemCount > 0"
            class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
          >
            {{ basketItemCount }}
          </span>
        </button>
      </div>
    </nav>

    <!-- Story Modal -->
    <StoryModal
      :show="showStoryModal"
      :story="activeStory"
      :isFollowed="activeStory ? followedStories.includes(activeStory.id) : false"
      @close="closeStoryModal"
      @follow="followStory"
    />
  </div>
</template>

<style scoped>
/* Ensure proper scrolling behavior */
.overflow-hidden {
  overflow: hidden;
}

/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
  height: 4px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>