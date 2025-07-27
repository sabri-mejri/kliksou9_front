<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Store Header -->
    <div class="bg-white shadow-sm">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex items-start space-x-6">
          <div class="h-24 w-24 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <Store class="h-12 w-12 text-white" />
          </div>
          <div class="flex-1">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ store.name }}</h1>
            <p class="text-lg text-gray-600 mb-3">{{ store.category }}</p>
            <p class="text-gray-700 leading-relaxed">{{ store.description }}</p>
            
            <!-- Store Info -->
            <div class="flex flex-wrap items-center gap-6 mt-4 text-sm text-gray-600">
              <div class="flex items-center">
                <MapPin class="h-4 w-4 mr-1" />
                {{ store.location }}
              </div>
              <div class="flex items-center">
                <Phone class="h-4 w-4 mr-1" />
                {{ store.phone }}
              </div>
              <div class="flex items-center">
                <Clock class="h-4 w-4 mr-1" />
                {{ store.hours }}
              </div>
              <div class="flex items-center">
                <Star class="h-4 w-4 mr-1 text-yellow-500" />
                {{ store.rating }} ({{ store.reviewCount }} reviews)
              </div>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="flex flex-col space-y-3">
            <button class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center">
              <Heart class="h-4 w-4 mr-2" />
              Follow
            </button>
            <button class="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
              <Share2 class="h-4 w-4 mr-2" />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Store Content -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Recent Posts -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <MessageSquare class="h-5 w-5 mr-2 text-indigo-600" />
              Recent Posts
            </h2>
            <div class="space-y-6">
              <div v-for="post in store.posts" :key="post.id" class="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
                <div class="flex items-start space-x-4">
                  <div class="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                    <Store class="h-5 w-5 text-white" />
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center space-x-2 mb-2">
                      <span class="font-semibold text-gray-900">{{ store.name }}</span>
                      <span class="text-gray-500 text-sm">{{ post.timeAgo }}</span>
                    </div>
                    <p class="text-gray-700 mb-3">{{ post.content }}</p>
                    <div v-if="post.image" class="mb-3">
                      <img :src="post.image" :alt="post.content" class="rounded-lg w-full h-48 object-cover" />
                    </div>
                    <div class="flex items-center space-x-4 text-sm text-gray-500">
                      <button class="flex items-center hover:text-indigo-600 transition-colors">
                        <ThumbsUp class="h-4 w-4 mr-1" />
                        {{ post.likes }}
                      </button>
                      <button class="flex items-center hover:text-indigo-600 transition-colors">
                        <MessageCircle class="h-4 w-4 mr-1" />
                        {{ post.comments }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Gallery -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Camera class="h-5 w-5 mr-2 text-indigo-600" />
              Gallery
            </h2>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div v-for="image in store.gallery" :key="image.id" class="aspect-square rounded-lg overflow-hidden">
                <img :src="image.url" :alt="image.alt" class="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Contact Info -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div class="space-y-3">
              <div class="flex items-center text-gray-600">
                <MapPin class="h-4 w-4 mr-3 text-gray-400" />
                <span class="text-sm">{{ store.fullAddress }}</span>
              </div>
              <div class="flex items-center text-gray-600">
                <Phone class="h-4 w-4 mr-3 text-gray-400" />
                <span class="text-sm">{{ store.phone }}</span>
              </div>
              <div class="flex items-center text-gray-600">
                <Mail class="h-4 w-4 mr-3 text-gray-400" />
                <span class="text-sm">{{ store.email }}</span>
              </div>
              <div class="flex items-center text-gray-600">
                <Globe class="h-4 w-4 mr-3 text-gray-400" />
                <a :href="store.website" class="text-sm text-indigo-600 hover:text-indigo-700">{{ store.website }}</a>
              </div>
            </div>
          </div>

          <!-- Hours -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Business Hours</h3>
            <div class="space-y-2">
              <div v-for="day in store.businessHours" :key="day.day" class="flex justify-between text-sm">
                <span class="text-gray-600">{{ day.day }}</span>
                <span class="text-gray-900 font-medium">{{ day.hours }}</span>
              </div>
            </div>
          </div>

          <!-- Reviews Summary -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Customer Reviews</h3>
            <div class="text-center mb-4">
              <div class="text-3xl font-bold text-gray-900">{{ store.rating }}</div>
              <div class="flex items-center justify-center mb-2">
                <Star v-for="i in 5" :key="i" :class="i <= Math.floor(store.rating) ? 'text-yellow-500' : 'text-gray-300'" class="h-4 w-4" />
              </div>
              <div class="text-sm text-gray-600">{{ store.reviewCount }} reviews</div>
            </div>
            <button class="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm">
              View All Reviews
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { 
  Store, MapPin, Phone, Clock, Star, Heart, Share2, 
  MessageSquare, ThumbsUp, MessageCircle, Camera,
  Mail, Globe
} from 'lucide-vue-next'

const route = useRoute()

// Mock store data - in a real app, this would come from an API
const store = ref({
  id: route.params.id,
  name: "Artisan Coffee Roasters",
  category: "Coffee Shop & Roastery",
  description: "Locally owned coffee shop specializing in small-batch roasted beans and handcrafted beverages. We source our beans directly from farmers and roast them fresh daily.",
  location: "Downtown District",
  fullAddress: "123 Main Street, Downtown District, City 12345",
  phone: "(555) 123-4567",
  email: "hello@artisancoffee.com",
  website: "www.artisancoffee.com",
  hours: "Mon-Fri 6AM-8PM",
  rating: 4.8,
  reviewCount: 127,
  businessHours: [
    { day: "Monday", hours: "6:00 AM - 8:00 PM" },
    { day: "Tuesday", hours: "6:00 AM - 8:00 PM" },
    { day: "Wednesday", hours: "6:00 AM - 8:00 PM" },
    { day: "Thursday", hours: "6:00 AM - 8:00 PM" },
    { day: "Friday", hours: "6:00 AM - 8:00 PM" },
    { day: "Saturday", hours: "7:00 AM - 9:00 PM" },
    { day: "Sunday", hours: "7:00 AM - 7:00 PM" }
  ],
  posts: [
    {
      id: 1,
      content: "Fresh batch of Ethiopian Yirgacheffe just finished roasting! Come try our newest single-origin coffee with notes of citrus and floral undertones. ☕✨",
      timeAgo: "2 hours ago",
      likes: 24,
      comments: 8,
      image: "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 2,
      content: "Join us this Saturday for our monthly cupping session! Learn about different coffee origins and brewing methods. Free for all coffee lovers! 🌍",
      timeAgo: "1 day ago",
      likes: 31,
      comments: 12,
      image: null
    },
    {
      id: 3,
      content: "New seasonal menu is here! Try our Pumpkin Spice Latte made with real pumpkin and our signature espresso blend. Perfect for the fall weather! 🎃",
      timeAgo: "3 days ago",
      likes: 45,
      comments: 15,
      image: "https://images.pexels.com/photos/4109743/pexels-photo-4109743.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
  ],
  gallery: [
    { id: 1, url: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400", alt: "Coffee shop interior" },
    { id: 2, url: "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=400", alt: "Fresh roasted beans" },
    { id: 3, url: "https://images.pexels.com/photos/4109743/pexels-photo-4109743.jpeg?auto=compress&cs=tinysrgb&w=400", alt: "Latte art" },
    { id: 4, url: "https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=400", alt: "Coffee brewing" },
    { id: 5, url: "https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=400", alt: "Coffee beans" },
    { id: 6, url: "https://images.pexels.com/photos/1936936/pexels-photo-1936936.jpeg?auto=compress&cs=tinysrgb&w=400", alt: "Barista at work" }
  ]
})

onMounted(() => {
  // In a real app, fetch store data based on route.params.id
  console.log('Loading store profile for ID:', route.params.id)
})
</script>