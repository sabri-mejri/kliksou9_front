import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import RoleSelection from '../views/onboarding/RoleSelection.vue'
import SignUpForm from '../views/onboarding/SignUpForm.vue'
import InterestSelection from '../views/onboarding/InterestSelection.vue'
import UserFeed from '../views/UserFeed.vue'
import BusinessDashboard from '../views/BusinessDashboard.vue'
import UserProfile from '../views/UserProfile.vue'
import StoreProfile from '../views/StoreProfile.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/onboarding/role-selection',
      name: 'role-selection',
      component: RoleSelection
    },
    {
      path: '/onboarding/signup/:role',
      name: 'signup',
      component: SignUpForm
    },
    {
      path: '/onboarding/interests',
      name: 'interests',
      component: InterestSelection
    },
    {
      path: '/feed',
      name: 'feed',
      component: UserFeed
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: BusinessDashboard
    },
    {
      path: '/profile',
      name: 'profile',
      component: UserProfile
    },
    {
      path: '/store/:id',
      name: 'store-profile',
      component: StoreProfile
    }
  ]
})

export default router
