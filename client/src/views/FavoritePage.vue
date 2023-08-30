<script>
import CardFavorite from '../components/CardFavorite.vue';
import SideBar from '../components/SideBar.vue';
import { useProductStore } from '../stores/productStore'
import { mapActions, mapState } from 'pinia'


export default {
    data() {
        return {
            totalPrice: 0,
            shippingPrice: 30000,
        }
    },
    computed: {
        ...mapState(useProductStore, ['favorites', 'favoritesPrice'])
    },
    methods: {
        ...mapActions(useProductStore, ['fetchFavorites']),
    },
    components: { CardFavorite, SideBar },
    created() {
        this.fetchFavorites();
    },
}
</script>

<template>
    <div class="h-screen bg-gray-100 pt-20">
        <h1 class="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div class="rounded-lg md:w-2/3">
                <CardFavorite v-for="favorite in favorites" :key="favorite.id" :favorite="favorite"
                    style="cursor: pointer" />
            </div>
            <!-- Sub total -->
            <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                <div class="mb-2 flex justify-between">
                    <p class="text-gray-700">Subtotal</p>
                    <p class="text-gray-700">Rp. {{ favoritesPrice.toLocaleString("id-ID") }}</p>
                </div>
                <div class="flex justify-between">
                    <p class="text-gray-700">Shipping</p>
                    <p class="text-gray-700">Rp. {{ shippingPrice.toLocaleString("id-ID") }}</p>
                </div>
                <hr class="my-4" />
                <div class="flex justify-between">
                    <p class="text-lg font-bold">Total</p>
                    <div class="">
                        <p class="mb-1 text-lg font-bold">Rp. {{ (favoritesPrice + shippingPrice).toLocaleString("id-ID") }}
                        </p>
                        <p class="text-sm text-gray-700">including VAT</p>
                    </div>
                </div>
                <button class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check
                    out</button>
                <button @click.prevent="$router.push('/')"
                    class="mt-6 w-full rounded-md bg-green-500 py-1.5 font-medium text-blue-50 hover:bg-green-600">Back
                    to Home</button>
            </div>
        </div>
    </div>
</template>