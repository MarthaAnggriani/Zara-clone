<script setup>
import { mapActions } from 'pinia'
import { useProductStore } from '../stores/productStore'

</script>
<script>
export default {
    props: ['product'],
    methods: {
        ...mapActions(useProductStore, ['addMyFavorite']),

        handleAddFavorite() {
            console.log(this.product.id);
            this.addMyFavorite(this.product.id)
        }
    }
}
</script>
<template>
    <article @click.prevent="$router.push(`/product/${product.id}`)"
        class="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
        <a>
            <div class="relative flex items-end overflow-hidden rounded-xl">
                <img :src="product.imgUrl" alt="..." />
                <div
                    class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="h-4 w-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>

                    <button class="text-sm">Add to cart</button>
                </div>
            </div>

            <div class="mt-1 p-2">
                <h2 class="text-slate-700">{{ product.name }}</h2>
                <p class="mt-1 text-sm text-slate-400">{{ product.Category.name }}</p>

                <div class="mt-3 flex items-end justify-between">
                    <p class=" text-blue-500">Rp.{{ product.price.toLocaleString("id-ID") }}</p>
                </div>
                <div
                    class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="h-4 w-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>

                    <button @click.prevent="addMyFavorite(this.product.id)" class=" text-sm">Add to cart</button>
                </div>
            </div>
        </a>
    </article>
</template>