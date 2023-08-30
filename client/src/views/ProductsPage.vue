<script setup>
import ChevronLeftIcon from "../icons/chevron-left.svg";
import ChevronRightIcon from "../icons/chevron-right.svg";
</script>

<script>
import SideBar from '../components/SideBar.vue';
import CardProduct from "../components/CardProduct.vue";
import { mapActions, mapState } from 'pinia'
import { useProductStore } from "../stores/productStore";

export default {
    data() {
        return {
            currentPage: this.$route.query.page || 1,
            options: {
                page: 1,
            },
            searchKeyword: ''
        }
    },
    computed: {
        ...mapState(useProductStore, ['products', 'totalProducts', 'currentPage'])
    },
    methods: {
        ...mapActions(useProductStore, ['fetchProducts']),

        onClickHandler(page) {
            this.fetchProducts({ page })
        },
        searchProduct() {
            this.options.filterBy = this.searchKeyword
            this.fetchProducts(this.options)
        },
        removeFilterSearch() {
            delete this.options.filterBy
            this.searchKeyword = ''
            this.fetchProducts(this.options)
        },
        updateURL() {
            const { page, filterBy } = this.options;
            const query = filterBy ? { page, filterBy } : { page };
            this.$router.push({ path: '/', query });
        }
    },
    created() {
        let params = this.$route.query
        if (params && params.page) {
            this.options.page = parseInt(params.page);
        } else {
            this.options.page = 1;
            this.updateURL();
        }
        this.fetchProducts(this.options)
    },
    components: {
        SideBar,
        CardProduct
    }
}
</script>

<template>
    <section>
        <div class="w-full min-h-screen font-sans text-gray-900 bg-gray-50 flex">
            <SideBar />
            <main class="flex-1 pb-8">
                <div class="flex items-center justify-between py-7 px-10">
                    <div>
                        <h1 class="text-4xl font-semibold leading-relaxed text-gray-800">Products</h1>
                        <p class="text-sm font-medium text-gray-500">
                            Let's go find best fashion for yourself!
                        </p>
                    </div>
                </div>
                <section class="py-10 bg-gray-100">
                    <!-- form search -->
                    <form class="form" @submit.prevent="searchProduct">
                        <div class="relative z-0 flex -space-x-px">
                            <div class="relative"><svg
                                    class="pointer-events-none absolute inset-y-0 left-0 h-full w-8 stroke-gray-400 pl-2.5"
                                    viewBox="0 0 256 256" aria-hidden="true">
                                    <circle cx="116" cy="116" r="84" fill="none" stroke-linecap="round"
                                        stroke-linejoin="round" stroke-width="16"></circle>
                                    <line x1="175.4" y1="175.4" x2="224" y2="224" fill="none" stroke-linecap="round"
                                        stroke-linejoin="round" stroke-width="16"></line>
                                </svg><label for="search-button" class="sr-only">Search Tasks</label>
                                <input v-model="searchKeyword" id="search-button" type="search" placeholder="Search name..."
                                    class="block w-full rounded-l-md border-gray-200 pl-10 text-sm transition focus:border-blue-600 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75">
                            </div><button type="submit"
                                class="inline-flex w-auto cursor-pointer select-none appearance-none items-center justify-center space-x-1 rounded-r border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 transition hover:border-gray-300 hover:bg-gray-100 focus:z-10 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300">
                                Search</button>
                        </div>
                    </form>
                    <!-- end of form search -->

                    <div class="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        <CardProduct v-for="product in products" :key="product.id" :product="product"
                            @click.prevent="$router.push(`/product/${product.id}`)" style="cursor: pointer" />
                    </div>
                </section>
            </main>
        </div>
    </section>
    <div class="flex gap-x-2 justify-center pt-8">
        <button class="flex justify-center items-center w-8 h-8">
            <ChevronLeftIcon class="w-6 h-6 to-gray-800 stroke-current hover:text-indigo-600" />
        </button>
        <!-- <button v-for="i in Math.ceil(totalProducts / 8)" :key="i" @click="onClickHandler(this.options.page)"
            :class="['flex items-center justify-center w-8 h-8 font-medium rounded-full', page === i ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-indigo-600']">
            {{ i }}
        </button> -->
        <vue-awesome-paginate :total-items="totalProducts" :items-per-page="9" :max-pages-shown="3" v-model="currentPage"
            :on-click="onClickHandler" />

        <button class="flex justify-center items-center w-8 h-8">
            <ChevronRightIcon class="w-6 h-6 to-gray-800 stroke-current hover:text-indigo-600" />
        </button>
    </div>
</template>