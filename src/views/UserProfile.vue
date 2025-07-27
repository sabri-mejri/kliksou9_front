<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Top Navigation Bar -->
    <header class="bg-white shadow-sm border-b sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center space-x-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="Logo" class="w-8 h-8" />
            <h1 class="text-xl font-bold text-gray-900 hidden sm:block">LocalConnect</h1>
            <h1 class="text-lg font-bold text-gray-900 sm:hidden">LC</h1>
          </div>
          
          <!-- Right Navigation -->
          <div class="flex items-center space-x-4 lg:space-x-6">
            <!-- Desktop Navigation Links -->
            <div class="hidden md:flex items-center space-x-4 lg:space-x-6">
              <a href="#" class="text-sm text-gray-600 hover:text-gray-900 transition-colors">Ship</a>
              <a href="#" class="text-sm text-gray-600 hover:text-gray-900 transition-colors">Track Order</a>
              <a href="#" class="text-sm text-gray-600 hover:text-gray-900 transition-colors">Support</a>
            </div>
            
            <!-- Action Icons -->
            <div class="flex items-center space-x-1 lg:space-x-2">
              <button class="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ShoppingBag class="w-5 h-5 lg:w-6 lg:h-6" />
                <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 lg:w-5 lg:h-5 flex items-center justify-center">2</span>
              </button>
              <button class="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <svg class="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4.19 4.19A2 2 0 004 6v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-1.81 1.19zM4 6h16v12H4V6z"></path>
                </svg>
                <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 lg:w-5 lg:h-5 flex items-center justify-center">2</span>
              </button>
              <button class="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <User class="w-5 h-5 lg:w-6 lg:h-6" />
              </button>
            </div>
            
            <!-- Mobile Menu Button -->
            <button class="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="flex flex-col lg:flex-row">
      <!-- Left Sidebar -->
      <aside class="w-full lg:w-64 bg-white shadow-sm min-h-screen lg:min-h-0">
        <div class="p-6">
          <!-- Profile Summary -->
          <div class="mb-8">
            <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Profile</h3>
            <div class="flex items-center space-x-3">
              <div class="relative">
                <div class="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden">
                  <img 
                    v-if="profile.avatar" 
                    :src="profile.avatar" 
                    :alt="profile.fullName"
                    class="h-full w-full object-cover"
                  />
                  <User v-else class="h-6 w-6 text-indigo-600" />
                </div>
              </div>
              <div>
                <p class="text-sm text-gray-500">Hello</p>
                <p class="font-medium text-gray-900">{{ profile.fullName }}</p>
              </div>
            </div>
          </div>

                      <!-- Navigation -->
            <nav class="space-y-2">
              <button
                v-for="navItem in navigationItems"
                :key="navItem.id"
                @click="activeTab = navItem.id"
                class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                :class="activeTab === navItem.id 
                  ? 'bg-blue-50 text-blue-600 lg:border-r-2 lg:border-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'"
              >
                <component :is="navItem.icon" class="w-5 h-5" />
                <span>{{ navItem.label }}</span>
              </button>
            </nav>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-4 lg:p-8">
        <div class="max-w-4xl mx-auto">
          <!-- Page Header -->
          <div class="mb-8">
            <div class="flex items-center justify-between mb-4">
              <button 
                @click="goBackToFeed"
                class="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
              >
                <ArrowLeft class="w-5 h-5" />
                <span class="text-sm font-medium">Back to Feed</span>
              </button>
            </div>
            <h1 class="text-2xl font-bold text-gray-900">{{ getCurrentTabTitle() }}</h1>
            <p class="text-gray-600 mt-1">{{ getCurrentTabDescription() }}</p>
          </div>

          <!-- Tab Content -->
          <div class="bg-white rounded-lg shadow-sm border">
            <!-- Basic Information Tab -->
            <div v-if="activeTab === 'basic'" class="p-4 lg:p-6">
              <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6 space-y-4 lg:space-y-0">
                <div class="flex items-center space-x-4">
                  <div class="relative">
                    <div class="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden">
                      <img 
                        v-if="profile.avatar" 
                        :src="profile.avatar" 
                        :alt="profile.fullName"
                        class="h-full w-full object-cover"
                      />
                      <User v-else class="h-10 w-10 text-indigo-600" />
                    </div>
                                         <button 
                       @click="() => avatarInput?.click()"
                       class="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1.5 rounded-full hover:bg-blue-700 transition-colors"
                     >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                      </svg>
                    </button>
                    <input 
                      type="file" 
                      ref="avatarInput" 
                      class="hidden" 
                      accept="image/*"
                      @change="handleAvatarUpload"
                    />
                  </div>
                  <div>
                    <button class="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                      </svg>
                      <span>Change Profile Information</span>
                    </button>
                  </div>
                </div>
              </div>

                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    v-model="profile.fullName"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Date Of Birth</label>
                  <div class="relative">
                                         <input
                       v-model="profile.dateOfBirth"
                       type="date"
                       class="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                     />
                    <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <div class="flex space-x-4">
                    <label class="flex items-center space-x-2 cursor-pointer">
                                             <input
                         type="radio"
                         v-model="profile.gender"
                         value="male"
                         class="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                       />
                      <span class="text-sm text-gray-700">Male</span>
                    </label>
                    <label class="flex items-center space-x-2 cursor-pointer">
                                             <input
                         type="radio"
                         v-model="profile.gender"
                         value="female"
                         class="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                       />
                      <span class="text-sm text-gray-700">Female</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <div class="flex">
                    <div class="flex items-center px-3 py-2 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg">
                      <span class="text-sm">🇹🇷</span>
                    </div>
                                         <input
                       v-model="profile.phone"
                       type="tel"
                       class="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                       placeholder="+90-123456789"
                     />
                  </div>
                </div>
                
                                <div class="sm:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    v-model="profile.email"
                    type="email"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            </div>

            <!-- Location Tab -->
            <div v-if="activeTab === 'location'" class="p-4 lg:p-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Country</label>
                                     <select
                     v-model="profile.country"
                     class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                   >
                    <option value="">Select country</option>
                    <option value="us">United States</option>
                    <option value="uk">United Kingdom</option>
                    <option value="ca">Canada</option>
                    <option value="au">Australia</option>
                    <option value="de">Germany</option>
                    <option value="fr">France</option>
                    <option value="jp">Japan</option>
                    <option value="in">India</option>
                    <option value="tr">Turkey</option>
                  </select>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">State/Province</label>
                                     <input
                     v-model="profile.state"
                     type="text"
                     class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                     placeholder="Enter state or province"
                   />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">City</label>
                                     <input
                     v-model="profile.city"
                     type="text"
                     class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                     placeholder="Enter your city"
                   />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                                     <input
                     v-model="profile.postalCode"
                     type="text"
                     class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                     placeholder="Enter postal code"
                   />
                </div>
                
                                <div class="sm:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <textarea
                    v-model="profile.address"
                    rows="3"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your full address"
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Preferences Tab -->
            <div v-if="activeTab === 'preferences'" class="p-4 lg:p-6">
              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-3">Interests</label>
                  <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <label 
                      v-for="interest in availableInterests" 
                      :key="interest.id"
                      class="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50"
                    >
                                             <input
                         type="checkbox"
                         :value="interest.id"
                         v-model="profile.interests"
                         class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                       />
                      <span class="text-sm text-gray-700">{{ interest.label }}</span>
                    </label>
                  </div>
                </div>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Language</label>
                                         <select
                       v-model="profile.language"
                       class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                     >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="it">Italian</option>
                      <option value="pt">Portuguese</option>
                      <option value="ru">Russian</option>
                      <option value="ja">Japanese</option>
                      <option value="ko">Korean</option>
                      <option value="zh">Chinese</option>
                      <option value="tr">Turkish</option>
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
                                         <select
                       v-model="profile.timezone"
                       class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                     >
                      <option value="UTC-8">Pacific Time (UTC-8)</option>
                      <option value="UTC-7">Mountain Time (UTC-7)</option>
                      <option value="UTC-6">Central Time (UTC-6)</option>
                      <option value="UTC-5">Eastern Time (UTC-5)</option>
                      <option value="UTC+0">UTC</option>
                      <option value="UTC+1">Central European Time (UTC+1)</option>
                      <option value="UTC+2">Eastern European Time (UTC+2)</option>
                      <option value="UTC+3">Turkey Time (UTC+3)</option>
                      <option value="UTC+5:30">India Standard Time (UTC+5:30)</option>
                      <option value="UTC+8">China Standard Time (UTC+8)</option>
                      <option value="UTC+9">Japan Standard Time (UTC+9)</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-3">Notification Preferences</label>
                  <div class="space-y-3">
                    <label class="flex items-center space-x-2">
                                           <input
                       type="checkbox"
                       v-model="profile.notifications.email"
                       class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                     />
                      <span class="text-sm text-gray-700">Email notifications</span>
                    </label>
                    <label class="flex items-center space-x-2">
                                           <input
                       type="checkbox"
                       v-model="profile.notifications.push"
                       class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                     />
                      <span class="text-sm text-gray-700">Push notifications</span>
                    </label>
                    <label class="flex items-center space-x-2">
                                           <input
                       type="checkbox"
                       v-model="profile.notifications.sms"
                       class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                     />
                      <span class="text-sm text-gray-700">SMS notifications</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Security Tab -->
            <div v-if="activeTab === 'security'" class="p-4 lg:p-6">
              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                                     <input
                     v-model="securityForm.currentPassword"
                     type="password"
                     class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                     placeholder="Enter current password"
                   />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                     <input
                     v-model="securityForm.newPassword"
                     type="password"
                     class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                     placeholder="Enter new password"
                   />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                                     <input
                     v-model="securityForm.confirmPassword"
                     type="password"
                     class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                     placeholder="Confirm new password"
                   />
                </div>
                
                <div class="pt-4">
                  <button 
                    @click="changePassword"
                    :disabled="!canChangePassword"
                    class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Change Password
                  </button>
                </div>
                
                <div class="border-t pt-6">
                  <h3 class="text-lg font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-sm font-medium text-gray-700">Two-factor authentication</p>
                      <p class="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <button 
                      @click="toggleTwoFactor"
                      class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {{ profile.twoFactorEnabled ? 'Disable' : 'Enable' }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="border-t bg-gray-50 px-4 lg:px-6 py-4 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
              <button 
                @click="resetForm"
                :disabled="!hasChanges"
                class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Cancel
              </button>
                             <button 
                 @click="saveProfile"
                 :disabled="!hasChanges"
                 class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
               >
                {{ isSaving ? 'Saving...' : 'Save Changes' }}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { User, Camera, MapPin, Settings, Shield, ShoppingBag, RotateCcw, Star, Heart, CreditCard, Lock, ArrowLeft } from 'lucide-vue-next'

// Navigation configuration
const navigationItems = [
  { id: 'basic', label: 'My Accounts', icon: User },
  { id: 'orders', label: 'My Orders', icon: ShoppingBag },
  { id: 'returns', label: 'Returns & Cancel', icon: RotateCcw },
  { id: 'reviews', label: 'My Rating & Reviews', icon: Star },
  { id: 'wishlist', label: 'My Wishlist', icon: Heart },
  { id: 'payment', label: 'Payment', icon: CreditCard },
  { id: 'security', label: 'Change Password', icon: Lock }
]

const activeTab = ref('basic')
const isSaving = ref(false)
const avatarInput = ref<HTMLInputElement>()

// Available interests
const availableInterests = [
  { id: 'food', label: 'Food & Dining' },
  { id: 'fashion', label: 'Fashion' },
  { id: 'home', label: 'Home & Garden' },
  { id: 'art', label: 'Art & Culture' },
  { id: 'tech', label: 'Technology' },
  { id: 'fitness', label: 'Fitness' },
  { id: 'beauty', label: 'Beauty' },
  { id: 'travel', label: 'Travel' },
  { id: 'music', label: 'Music' },
  { id: 'sports', label: 'Sports' },
  { id: 'books', label: 'Books' },
  { id: 'photography', label: 'Photography' }
]

// Profile data
const originalProfile = reactive({
  fullName: 'Kazi Mahbub',
  username: 'kazimahbub',
  email: 'abcd1234@email.com',
  phone: '+90-123456789',
  bio: 'Passionate about local businesses and community connections.',
  dateOfBirth: '2022-01-20',
  gender: 'male',
  country: 'tr',
  state: 'Istanbul',
  city: 'Istanbul',
  postalCode: '34000',
  address: '123 Main Street, Istanbul, Turkey',
  interests: ['food', 'tech', 'art'],
  language: 'tr',
  timezone: 'UTC+3',
  notifications: {
    email: true,
    push: true,
    sms: false
  },
  twoFactorEnabled: false,
  avatar: null as string | null,
  createdAt: new Date('2022-01-20')
})

const profile = reactive({ ...originalProfile })

// Security form
const securityForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Computed properties
const hasChanges = computed(() => {
  return JSON.stringify(profile) !== JSON.stringify(originalProfile)
})

const canChangePassword = computed(() => {
  return securityForm.currentPassword && 
         securityForm.newPassword && 
         securityForm.confirmPassword &&
         securityForm.newPassword === securityForm.confirmPassword
})

// Methods
const getCurrentTabTitle = () => {
  const titles: Record<string, string> = {
    basic: 'Personal Information',
    location: 'Location Information',
    preferences: 'Preferences & Settings',
    security: 'Security Settings',
    orders: 'My Orders',
    returns: 'Returns & Cancellations',
    reviews: 'My Ratings & Reviews',
    wishlist: 'My Wishlist',
    payment: 'Payment Methods'
  }
  return titles[activeTab.value] || 'Profile'
}

const getCurrentTabDescription = () => {
  const descriptions: Record<string, string> = {
    basic: 'Manage your personal information and profile details',
    location: 'Update your address and location information',
    preferences: 'Customize your preferences and notification settings',
    security: 'Manage your account security and password',
    orders: 'View and manage your order history',
    returns: 'Handle returns and cancellations',
    reviews: 'Manage your product ratings and reviews',
    wishlist: 'View and manage your saved items',
    payment: 'Manage your payment methods and billing information'
  }
  return descriptions[activeTab.value] || 'Manage your account settings'
}

const handleAvatarUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      profile.avatar = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const saveProfile = async () => {
  isSaving.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Update original profile with current values
    Object.assign(originalProfile, { ...profile })
    
    // Show success message (you can add a toast notification here)
    console.log('Profile saved successfully!')
  } catch (error) {
    console.error('Error saving profile:', error)
  } finally {
    isSaving.value = false
  }
}

const resetForm = () => {
  Object.assign(profile, { ...originalProfile })
}

const changePassword = async () => {
  if (!canChangePassword.value) return
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Reset form
    securityForm.currentPassword = ''
    securityForm.newPassword = ''
    securityForm.confirmPassword = ''
    
    console.log('Password changed successfully!')
  } catch (error) {
    console.error('Error changing password:', error)
  }
}

const toggleTwoFactor = async () => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    profile.twoFactorEnabled = !profile.twoFactorEnabled
    console.log(`Two-factor authentication ${profile.twoFactorEnabled ? 'enabled' : 'disabled'}!`)
  } catch (error) {
    console.error('Error toggling two-factor authentication:', error)
  }
}

const goBackToFeed = () => {
  // Navigate back to user feed
  window.history.back()
}

// Initialize profile data (in real app, this would come from API)
onMounted(() => {
  // Load profile data from API/store
  console.log('Profile loaded')
})
</script>