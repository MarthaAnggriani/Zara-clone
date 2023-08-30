<script>
import { useProductStore } from '../stores/productStore';
import { mapActions } from 'pinia';
export default {
    data() {
        return {
            isLogin: false,
            user: {
                email: '',
                password: '',
            }
        }
    },
    methods: {
        ...mapActions(useProductStore, ['handleLogin', 'googleLogin']),

        async loginGoogle(response) {
            try {
                this.googleLogin(response.credential);
            } catch (err) {
                console.log(err)
            }
        },
        onhandleLogin() {
            this.handleLogin(this.user);
        },
    }
}
</script>


<template>
    <!-- Login -->
    <section class="bg-white dark:bg-gray-900">
        <div class="flex justify-center min-h-screen">
            <div class="hidden bg-cover lg:block lg:w-3/5" style="background-image: url('/src/images/bg-woman-white.jpg')">
            </div>
            <div class="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
                <div class="w-full">
                    <img src="/src/images/zara-2-logo-black-and-white.png" alt="..." width="200" height="200">
                    <h1 class="text-3xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
                        Sign In
                    </h1>

                    <p class="mt-4 text-gray-500 dark:text-gray-400">
                        Welcome in ZARA! <br>
                        Please input yout account first...
                    </p>
                    <form class="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2" @submit.prevent="onhandleLogin">
                        <div>
                            <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email</label>
                            <input type="email" placeholder="admin@example.com" v-model="user.email"
                                class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>

                        <div>
                            <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Password</label>
                            <input type="password" placeholder="Enter your password" v-model="user.password"
                                class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>
                        <button
                            class="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                            <span>Sign In</span>

                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                    </form><br>
                    <!-- google signIn -->
                    <div>
                        <GoogleLogin :callback="loginGoogle" prompt style="display: inline-block" />
                    </div>
                    <!-- end of google signIn -->
                    <p class="mt-4 text-gray-500 dark:text-gray-400">
                        Don't have any account? Let's <a @click.prevent="$router.push(`/register`)">SignUp</a>
                    </p>
                </div>
            </div>
        </div>
    </section>
    <!-- End of Login -->
</template>