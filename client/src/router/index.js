import { createRouter, createWebHistory } from 'vue-router'
import DetailProductPage from '../views/DetailProductPage.vue'
import ProductsPage from '../views/ProductsPage.vue'
import FavoritesPage from '../views/FavoritePage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import LoginPage from '../views/LoginPage.vue'
import NotFoundPage from '../views/NotFoundPage.vue'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: ProductsPage
        },
        {
            path: '/register',
            name: 'Register',
            component: RegisterPage
        },
        {
            path: '/login',
            name: 'Login',
            component: LoginPage
        },
        {
            path: '/product/:id',
            name: 'productDetail',
            component: DetailProductPage
        },
        {
            path: '/favorites/',
            name: 'favorites',
            component: FavoritesPage
        },
        { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage }
    ]
})
router.beforeEach((to, from, next) => {
    const isLogin = !!localStorage.getItem('access_token')

    if (!isLogin && (to.name === 'home' || to.name === 'event' || to.name === 'eventDetail')) {
        next('/login')
    } else if (isLogin && (to.name === 'register' || to.name === 'login')) {
        next('/')
    } else {
        next()
    }
})
export default router