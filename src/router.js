import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import CarList from '@/pages/CarList.vue'
import CarDetails from '@/pages/CarDetails.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
      // { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
      { path: '/', name:'Home', component: Home},
      { path: '/car-list', name:'CarList', component: CarList},
      { path: '/car-details', name:'CarDetails', component: CarDetails}
    ]
})

export default router