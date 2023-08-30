<script>
import { useProductStore } from '../stores/productStore';
import { mapActions } from 'pinia'

export default {
    data() {
        return {
            isLogin: false,
            newUser: {
                username: '',
                phoneNumber: '',
                email: '',
                password: ''
            }
        }
    },
    methods: {
        ...mapActions(useProductStore, ['handleRegister']),

        onhandleRegister() {
            this.handleRegister(this.newUser)
        }
    }
}
</script>

<template>
    <!-- Register -->
    <section class="bg-white dark:bg-gray-900">
        <div class="flex justify-center min-h-screen">
            <div class="hidden bg-cover lg:block lg:w-3/5" style="background-image: url('/src/images/bg-woman-blue.jpg')">
            </div>

            <div class="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
                <div class="w-full">
                    <img src="/src/images/zara-2-logo-black-and-white.png" alt="..." width="150" height="150">
                    <h1 class="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
                        Get your free account now.
                    </h1>
                    <div class="mt-6">
                        <h1 class="text-gray-500 dark:text-gray-300">Select type of account</h1>
                    </div>

                    <form class="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2" @submit.prevent="onhandleRegister">
                        <div>
                            <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">User Name</label>
                            <input type="text" placeholder="TaylorSwift" v-model="newUser.username"
                                class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>
                        <div>
                            <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Phone number</label>
                            <input type="text" placeholder="XXX-XX-XXXX-XXX" v-model="newUser.phoneNumber"
                                class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>

                        <div>
                            <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email address</label>
                            <input type="email" placeholder="admin@gmail.com" v-model="newUser.email"
                                class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>

                        <div>
                            <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Password</label>
                            <input type="password" placeholder="Enter your password" v-model="newUser.password"
                                class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>
                        <button
                            class="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                            <span>Sign Up </span>

                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                    </form>
                    <p @click.prevent="$router.push('/login')" class=" mt-4 text-gray-500 dark:text-gray-400">
                        Already have account? let's <a href="">Sign In</a>
                    </p>
                </div>
            </div>
        </div>
    </section>
    <!-- End of Register -->
</template>