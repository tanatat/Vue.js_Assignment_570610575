import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import FirebaseAuth from '@/components/FirebaseAuth'
import Signup2 from '@/components/SignupValidate'
import About from '@/components/About.vue'
import BookMarker from '@/components/BookMarker.vue'
import Profile from '@/components/Profile.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Vue.js_Assignment_570610575/hello',
      name: 'Hello',
      component: HelloWorld,
      meta: {
        requiresAuth: true
      },
      children: [{
        path: '/Vue.js_Assignment_570610575/hello/about',
        name: 'About',
        component: About
      },
      {
        path: '/Vue.js_Assignment_570610575/hello/bookmarks',
        name: 'Bookmark',
        component: BookMarker
      },
      {
        path: '/Vue.js_Assignment_570610575/hello/profile',
        name: 'Profile',
        component: Profile
      }
    ]
    },
    {
      path: '/Vue.js_Assignment_570610575/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Vue.js_Assignment_570610575/signup2',
      name: 'Signup2',
      component: Signup2
    },
    {
      path: '*', 
      redirect: { name: 'Login'}
    },
    {
      path: '/Vue.js_Assignment_570610575/firebaseauth',
      name: 'Auth',
      component: FirebaseAuth
    }
  ],
  mode: 'history',
})



