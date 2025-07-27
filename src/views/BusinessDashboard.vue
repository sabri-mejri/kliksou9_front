<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <Store class="w-8 h-8 text-purple-600" />
              <h1 class="text-xl font-bold text-gray-900">Business Dashboard</h1>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <button class="p-2 text-gray-400 hover:text-gray-600 relative">
              <Bell class="w-6 h-6" />
              <span class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            <button 
              @click="$router.push('/profile')"
              class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
            >
              <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <User class="w-5 h-5 text-purple-600" />
              </div>
              <span class="text-sm font-medium text-gray-700">{{ userStore.userData.businessName || 'Business' }}</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Tab Navigation -->
      <div class="mb-8">
        <nav class="flex space-x-8">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="flex items-center space-x-2 pb-4 border-b-2 font-medium text-sm transition-colors"
            :class="activeTab === tab.id
              ? 'border-purple-500 text-purple-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          >
            <component :is="tab.icon" class="w-5 h-5" />
            <span>{{ tab.name }}</span>
            <span v-if="tab.badge" class="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {{ tab.badge }}
            </span>
          </button>
        </nav>
      </div>

      <!-- Overview Tab -->
      <div v-if="activeTab === 'overview'" class="space-y-8">
        <!-- Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="stat in stats" :key="stat.name" class="bg-white rounded-xl p-6 shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">{{ stat.name }}</p>
                <p class="text-2xl font-bold text-gray-900">{{ stat.value }}</p>
                <p class="text-sm" :class="stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'">
                  {{ stat.change }}
                </p>
              </div>
              <div class="p-3 rounded-full" :class="stat.bgColor">
                <component :is="stat.icon" class="w-6 h-6" :class="stat.iconColor" />
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activity & Quick Actions -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Recent Activity -->
          <div class="bg-white rounded-xl shadow-sm">
            <div class="p-6 border-b border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900">Recent Activity</h3>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                <div v-for="activity in recentActivity" :key="activity.id" class="flex items-start space-x-3">
                  <div class="p-2 rounded-full" :class="activity.bgColor">
                    <component :is="activity.icon" class="w-4 h-4" :class="activity.iconColor" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm text-gray-900">{{ activity.message }}</p>
                    <p class="text-xs text-gray-500">{{ activity.time }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="bg-white rounded-xl shadow-sm">
            <div class="p-6 border-b border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900">Quick Actions</h3>
            </div>
            <div class="p-6">
              <div class="grid grid-cols-2 gap-4">
                <button
                  v-for="action in quickActions"
                  :key="action.name"
                  @click="handleQuickAction(action.action)"
                  class="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
                >
                  <component :is="action.icon" class="w-8 h-8 text-gray-400 mb-2" />
                  <span class="text-sm font-medium text-gray-700">{{ action.name }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Orders Tab -->
      <div v-if="activeTab === 'orders'" class="space-y-6">
        <!-- Order Filters -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex flex-wrap gap-4">
            <button
              v-for="filter in orderFilters"
              :key="filter"
              @click="selectedOrderFilter = filter"
              class="px-4 py-2 rounded-lg font-medium text-sm transition-colors"
              :class="selectedOrderFilter === filter
                ? 'bg-purple-100 text-purple-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
            >
              {{ filter }}
            </button>
          </div>
        </div>

        <!-- Orders List -->
        <div class="space-y-4">
          <div v-for="order in filteredOrders" :key="order.id" class="bg-white rounded-xl shadow-sm">
            <div class="p-6">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <User class="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900">{{ order.customerName }}</h4>
                    <p class="text-sm text-gray-500">Order #{{ order.id }}</p>
                  </div>
                </div>
                <div class="flex items-center space-x-4">
                  <span class="px-3 py-1 rounded-full text-xs font-medium" :class="getOrderStatusClass(order.status)">
                    {{ order.status }}
                  </span>
                  <span class="text-lg font-bold text-gray-900">${{ order.total }}</span>
                </div>
              </div>

              <div class="space-y-2 mb-4">
                <div v-for="item in order.items" :key="item.name" class="flex justify-between text-sm">
                  <span class="text-gray-600">{{ item.quantity }}x {{ item.name }}</span>
                  <span class="text-gray-900">${{ item.price }}</span>
                </div>
              </div>

              <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                <div class="flex items-center space-x-4 text-sm text-gray-500">
                  <div class="flex items-center space-x-1">
                    <Clock class="w-4 h-4" />
                    <span>{{ order.time }}</span>
                  </div>
                  <div class="flex items-center space-x-1">
                    <Phone class="w-4 h-4" />
                    <span>{{ order.phone }}</span>
                  </div>
                </div>
                <div class="flex space-x-2">
                  <button
                    v-if="order.status === 'Pending'"
                    @click="updateOrderStatus(order.id, 'Preparing')"
                    class="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    Accept
                  </button>
                  <button
                    v-if="order.status === 'Preparing'"
                    @click="updateOrderStatus(order.id, 'Completed')"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Complete
                  </button>
                  <button
                    v-if="order.status === 'Pending'"
                    @click="updateOrderStatus(order.id, 'Cancelled')"
                    class="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Posts Tab -->
      <div v-if="activeTab === 'posts'" class="space-y-6">
        <!-- Create Post Button -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <button
            @click="showCreatePost = true"
            class="w-full flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
          >
            <Plus class="w-6 h-6 text-gray-400" />
            <span class="text-gray-600 font-medium">Create New Post</span>
          </button>
        </div>

        <!-- Posts List -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="post in businessPosts" :key="post.id" class="bg-white rounded-xl shadow-sm overflow-hidden">
            <img :src="post.image" :alt="post.title" class="w-full h-48 object-cover" />
            <div class="p-4">
              <h4 class="font-semibold text-gray-900 mb-2">{{ post.title }}</h4>
              <p class="text-sm text-gray-600 mb-4">{{ post.description }}</p>
              <div class="flex items-center justify-between text-sm text-gray-500">
                <div class="flex items-center space-x-4">
                  <div class="flex items-center space-x-1">
                    <Heart class="w-4 h-4" />
                    <span>{{ post.likes }}</span>
                  </div>
                  <div class="flex items-center space-x-1">
                    <MessageCircle class="w-4 h-4" />
                    <span>{{ post.comments }}</span>
                  </div>
                  <div class="flex items-center space-x-1">
                    <Share2 class="w-4 h-4" />
                    <span>{{ post.shares }}</span>
                  </div>
                </div>
                <button class="text-purple-600 hover:text-purple-700 font-medium">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Store Preview Tab -->
      <div v-if="activeTab === 'preview'" class="space-y-6">
        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900">Store Preview</h3>
            <p class="text-sm text-gray-500">This is how your store appears to customers</p>
          </div>

          <!-- Store Preview Content -->
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-8">
            <!-- Store Header -->
            <div class="text-center mb-8">
              <div class="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Store class="w-12 h-12 text-purple-600" />
              </div>
              <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ userStore.userData.businessName || 'Your Business' }}</h1>
              <p class="text-gray-600 mb-4">{{ userStore.userData.shortDescription || 'Business description goes here' }}</p>
              <div class="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <div class="flex items-center space-x-1">
                  <MapPin class="w-4 h-4" />
                  <span>Downtown Area</span>
                </div>
                <div class="flex items-center space-x-1">
                  <Phone class="w-4 h-4" />
                  <span>(555) 123-4567</span>
                </div>
                <div class="flex items-center space-x-1">
                  <Star class="w-4 h-4 text-yellow-400 fill-current" />
                  <span>4.8 (124 reviews)</span>
                </div>
              </div>
            </div>

            <!-- Recent Posts -->
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-6">Recent Posts</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="post in businessPosts.slice(0, 3)" :key="post.id" class="bg-gray-50 rounded-lg overflow-hidden">
                  <img :src="post.image" :alt="post.title" class="w-full h-32 object-cover" />
                  <div class="p-4">
                    <h4 class="font-medium text-gray-900 mb-1">{{ post.title }}</h4>
                    <p class="text-sm text-gray-600">{{ post.description.substring(0, 60) }}...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 text-center">
            <button class="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
              Edit Store Information
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Post Modal -->
    <div v-if="showCreatePost" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-2xl max-w-md w-full p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Create New Post</h3>
          <button @click="showCreatePost = false" class="text-gray-400 hover:text-gray-600">
            <X class="w-6 h-6" />
          </button>
        </div>

        <form @submit.prevent="createPost" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Post Title</label>
            <input
              v-model="newPost.title"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter post title"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              v-model="newPost.description"
              rows="3"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              placeholder="Describe your post..."
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
            <input
              v-model="newPost.image"
              type="url"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div class="flex space-x-4 pt-4">
            <button
              type="submit"
              class="flex-1 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Create Post
            </button>
            <button
              type="button"
              @click="showCreatePost = false"
              class="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import {
  Store, Bell, User, BarChart3, ShoppingBag, FileText, Eye,
  TrendingUp, Users, Heart, MessageCircle, Clock, Phone, MapPin,
  Star, Plus, X, Share2, Calendar, DollarSign, Package
} from 'lucide-vue-next'

const router = useRouter()
const userStore = useUserStore()

const activeTab = ref('overview')
const selectedOrderFilter = ref('All Orders')
const showCreatePost = ref(false)

const newPost = ref({
  title: '',
  description: '',
  image: ''
})

const tabs = [
  { id: 'overview', name: 'Overview', icon: BarChart3 },
  { id: 'orders', name: 'Orders', icon: ShoppingBag, badge: 3 },
  { id: 'posts', name: 'Posts', icon: FileText },
  { id: 'preview', name: 'Store Preview', icon: Eye }
]

const stats = [
  {
    name: 'Total Orders',
    value: '156',
    change: '+12%',
    icon: ShoppingBag,
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    name: 'Followers',
    value: '2,341',
    change: '+8%',
    icon: Users,
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    name: 'Total Likes',
    value: '8,492',
    change: '+15%',
    icon: Heart,
    bgColor: 'bg-red-100',
    iconColor: 'text-red-600'
  },
  {
    name: 'Profile Views',
    value: '12,847',
    change: '+23%',
    icon: Eye,
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600'
  }
]

const recentActivity = [
  {
    id: 1,
    message: 'New order from Sarah Johnson',
    time: '2 minutes ago',
    icon: ShoppingBag,
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    id: 2,
    message: 'Mike Chen liked your post',
    time: '15 minutes ago',
    icon: Heart,
    bgColor: 'bg-red-100',
    iconColor: 'text-red-600'
  },
  {
    id: 3,
    message: 'New follower: Emma Davis',
    time: '1 hour ago',
    icon: Users,
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    id: 4,
    message: 'Order #1234 completed',
    time: '2 hours ago',
    icon: Package,
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600'
  }
]

const quickActions = [
  { name: 'Create Post', icon: Plus, action: 'create-post' },
  { name: 'View Analytics', icon: BarChart3, action: 'analytics' },
  { name: 'Manage Inventory', icon: Package, action: 'inventory' },
  { name: 'Edit Profile', icon: User, action: 'edit-profile' }
]

const orderFilters = ['All Orders', 'Pending', 'Preparing', 'Completed', 'Cancelled']

const orders = ref([
  {
    id: '1234',
    customerName: 'Sarah Johnson',
    status: 'Pending',
    total: '24.99',
    time: '10:30 AM',
    phone: '(555) 123-4567',
    items: [
      { name: 'Cappuccino', quantity: 2, price: '8.99' },
      { name: 'Croissant', quantity: 1, price: '4.99' },
      { name: 'Blueberry Muffin', quantity: 1, price: '3.99' }
    ]
  },
  {
    id: '1235',
    customerName: 'Mike Chen',
    status: 'Preparing',
    total: '18.50',
    time: '10:15 AM',
    phone: '(555) 987-6543',
    items: [
      { name: 'Latte', quantity: 1, price: '5.99' },
      { name: 'Sandwich', quantity: 1, price: '12.99' }
    ]
  },
  {
    id: '1236',
    customerName: 'Emma Davis',
    status: 'Completed',
    total: '32.75',
    time: '9:45 AM',
    phone: '(555) 456-7890',
    items: [
      { name: 'Americano', quantity: 3, price: '4.99' },
      { name: 'Bagel', quantity: 2, price: '6.99' },
      { name: 'Orange Juice', quantity: 1, price: '3.99' }
    ]
  }
])

const businessPosts = ref([
  {
    id: 1,
    title: 'Fresh Morning Pastries',
    description: 'Start your day with our freshly baked croissants and muffins!',
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg',
    likes: 45,
    comments: 12,
    shares: 8
  },
  {
    id: 2,
    title: 'New Coffee Blend',
    description: 'Try our signature house blend - a perfect balance of rich and smooth.',
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
    likes: 67,
    comments: 23,
    shares: 15
  },
  {
    id: 3,
    title: 'Weekend Special',
    description: 'Join us this weekend for our special brunch menu!',
    image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg',
    likes: 89,
    comments: 34,
    shares: 22
  }
])

const filteredOrders = computed(() => {
  if (selectedOrderFilter.value === 'All Orders') {
    return orders.value
  }
  return orders.value.filter(order => order.status === selectedOrderFilter.value)
})

const getOrderStatusClass = (status: string) => {
  switch (status) {
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'Preparing':
      return 'bg-blue-100 text-blue-800'
    case 'Completed':
      return 'bg-green-100 text-green-800'
    case 'Cancelled':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const updateOrderStatus = (orderId: string, newStatus: string) => {
  const order = orders.value.find(o => o.id === orderId)
  if (order) {
    order.status = newStatus
  }
}

const handleQuickAction = (action: string) => {
  switch (action) {
    case 'create-post':
      showCreatePost.value = true
      break
    case 'analytics':
      // Handle analytics view
      break
    case 'inventory':
      // Handle inventory management
      break
    case 'edit-profile':
      router.push('/profile')
      break
  }
}

const createPost = () => {
  if (newPost.value.title && newPost.value.description) {
    const post = {
      id: businessPosts.value.length + 1,
      title: newPost.value.title,
      description: newPost.value.description,
      image: newPost.value.image || 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg',
      likes: 0,
      comments: 0,
      shares: 0
    }
    
    businessPosts.value.unshift(post)
    
    // Reset form
    newPost.value = {
      title: '',
      description: '',
      image: ''
    }
    
    showCreatePost.value = false
  }
}

onMounted(() => {
  userStore.loadUserData()
})
</script>