export interface Comment {
  id: number
  userName: string
  userAvatar: string
  text: string
  time: string
  image: string | null
}

export interface MenuItem {
  id: number
  name: string
  description: string
  price: string
  image: string
}

export interface Post {
  id: number
  businessName: string
  businessAvatar: string
  category: string
  title: string
  description: string
  image: string
  rating: number
  reviewCount: number
  likes: number
  isLiked: boolean
  showComments: boolean
  menuItems: MenuItem[]
  reviews: any[]
  comments: Comment[]
  timestamp: string
  location?: string
  tags?: string[]
}

export const mockPosts: Post[] = [
  {
    id: 1,
    businessName: 'Café Luna',
    businessAvatar: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
    category: 'Coffee Shop',
    title: 'Fresh Morning Pastries',
    description: 'Start your day with our freshly baked croissants and artisan coffee blends! ☕️ #morning #coffee #pastries',
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg',
    rating: 4.8,
    reviewCount: 124,
    likes: 45,
    isLiked: false,
    showComments: false,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    location: 'Downtown Coffee District',
    tags: ['coffee', 'pastries', 'breakfast'],
    menuItems: [
      { 
        id: 1, 
        name: 'Cappuccino', 
        description: 'Rich espresso with steamed milk', 
        price: '4.99',
        image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg'
      },
      { 
        id: 2, 
        name: 'Croissant', 
        description: 'Buttery, flaky pastry', 
        price: '3.99',
        image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg'
      },
      { 
        id: 3, 
        name: 'Avocado Toast', 
        description: 'Fresh avocado on sourdough', 
        price: '8.99',
        image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
      }
    ],
    reviews: [],
    comments: [
      {
        id: 1,
        userName: 'CoffeeLover',
        userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
        text: 'The croissants are amazing! ',
        time: '1h',
        image: null
      },
      {
        id: 2,
        userName: 'Foodie123',
        userAvatar: 'https://images.pexels.com/photos/1029243/pexels-photo-1029243.jpeg',
        text: 'Best coffee in town! ☕️',
        time: '30m',
        image: null
      }
    ]
  },
  {
    id: 2,
    businessName: 'Bloom Boutique',
    businessAvatar: 'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg',
    category: 'Fashion',
    title: 'New Summer Collection',
    description: 'Discover our latest summer collection! Perfect for those warm days ahead  #fashion #summer #style',
    image: 'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg',
    rating: 4.6,
    reviewCount: 89,
    likes: 67,
    isLiked: true,
    showComments: false,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    location: 'Fashion District',
    tags: ['fashion', 'summer', 'clothing'],
    menuItems: [
      { 
        id: 4, 
        name: 'Summer Dress', 
        description: 'Light and breezy summer dress', 
        price: '49.99',
        image: 'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg'
      },
      { 
        id: 5, 
        name: 'Denim Jacket', 
        description: 'Classic denim jacket for any occasion', 
        price: '39.99',
        image: 'https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg'
      }
    ],
    reviews: [],
    comments: [
      {
        id: 3,
        userName: 'StyleQueen',
        userAvatar: 'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg',
        text: 'Love this collection! ',
        time: '2h',
        image: null
      }
    ]
  },
  {
    id: 3,
    businessName: 'Tech Repair Pro',
    businessAvatar: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg',
    category: 'Electronics',
    title: 'iPhone Screen Repair',
    description: 'Professional iPhone screen repair service! Fast, reliable, and affordable 📱 #tech #repair #iphone',
    image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg',
    rating: 4.9,
    reviewCount: 234,
    likes: 89,
    isLiked: false,
    showComments: false,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    location: 'Tech Hub',
    tags: ['tech', 'repair', 'iphone'],
    menuItems: [
      { 
        id: 6, 
        name: 'iPhone Screen Repair', 
        description: 'Professional screen replacement', 
        price: '89.99',
        image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg'
      },
      { 
        id: 7, 
        name: 'Battery Replacement', 
        description: 'New battery installation', 
        price: '49.99',
        image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg'
      }
    ],
    reviews: [],
    comments: [
      {
        id: 4,
        userName: 'TechGuy',
        userAvatar: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg',
        text: 'Great service! Fixed my phone in 30 minutes',
        time: '1h',
        image: null
      }
    ]
  },
  {
    id: 4,
    businessName: 'Fitness Plus',
    businessAvatar: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg',
    category: 'Fitness',
    title: 'New Equipment Arrival',
    description: 'Brand new state-of-the-art fitness equipment just arrived! Time to get that summer body 💪🏋️‍♀️ #fitness #gym #workout',
    image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg',
    rating: 4.7,
    reviewCount: 156,
    likes: 123,
    isLiked: true,
    showComments: false,
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    location: 'Fitness District',
    tags: ['fitness', 'gym', 'workout'],
    menuItems: [
      { 
        id: 8, 
        name: 'Personal Training', 
        description: 'One-on-one training sessions', 
        price: '59.99',
        image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg'
      },
      { 
        id: 9, 
        name: 'Group Classes', 
        description: 'High-energy group fitness classes', 
        price: '19.99',
        image: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg'
      }
    ],
    reviews: [],
    comments: [
      {
        id: 5,
        userName: 'FitnessFanatic',
        userAvatar: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg',
        text: 'Can\'t wait to try the new equipment! ',
        time: '3h',
        image: null
      }
    ]
  },
  {
    id: 5,
    businessName: 'Art Studio Creative',
    businessAvatar: 'https://images.pexels.com/photos/1029243/pexels-photo-1029243.jpeg',
    category: 'Art',
    title: 'Painting Workshop',
    description: 'Join our creative painting workshop this weekend! Unleash your inner artist 🎨✨ #art #workshop #creative',
    image: 'https://images.pexels.com/photos/1029243/pexels-photo-1029243.jpeg',
    rating: 4.8,
    reviewCount: 78,
    likes: 56,
    isLiked: false,
    showComments: false,
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    location: 'Arts District',
    tags: ['art', 'workshop', 'creative'],
    menuItems: [
      { 
        id: 10, 
        name: 'Painting Workshop', 
        description: '2-hour creative painting session', 
        price: '29.99',
        image: 'https://images.pexels.com/photos/1029243/pexels-photo-1029243.jpeg'
      },
      { 
        id: 11, 
        name: 'Art Supplies Kit', 
        description: 'Complete painting supplies', 
        price: '39.99',
        image: 'https://images.pexels.com/photos/1029243/pexels-photo-1029243.jpeg'
      }
    ],
    reviews: [],
    comments: [
      {
        id: 6,
        userName: 'ArtLover',
        userAvatar: 'https://images.pexels.com/photos/1029243/pexels-photo-1029243.jpeg',
        text: 'This workshop was amazing! ',
        time: '5h',
        image: null
      }
    ]
  },
  {
    id: 6,
    businessName: 'Pet Grooming Palace',
    businessAvatar: 'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg',
    category: 'Pet Care',
    title: 'Pamper Your Pet',
    description: 'Give your furry friend the royal treatment! Professional grooming services 🐕✂️ #pets #grooming #care',
    image: 'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg',
    rating: 4.9,
    reviewCount: 203,
    likes: 145,
    isLiked: true,
    showComments: false,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    location: 'Pet Care Center',
    tags: ['pets', 'grooming', 'care'],
    menuItems: [
      { 
        id: 12, 
        name: 'Full Grooming', 
        description: 'Complete pet grooming service', 
        price: '69.99',
        image: 'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg'
      },
      { 
        id: 13, 
        name: 'Nail Trim', 
        description: 'Professional nail trimming', 
        price: '19.99',
        image: 'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg'
      }
    ],
    reviews: [],
    comments: [
      {
        id: 7,
        userName: 'PetParent',
        userAvatar: 'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg',
        text: 'My dog looks so happy after grooming! ',
        time: '1d',
        image: null
      }
    ]
  }
] 