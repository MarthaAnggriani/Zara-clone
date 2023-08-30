<script setup>
import DashboardIcon from "../icons/dashboard.svg";
import ShoppingBagIcon from "../icons/shopping-bag.svg";
import WalletIcon from "../icons/wallet.svg";
import ChatIcon from "../icons/chat.svg";
import SettingsIcon from "../icons/settings.svg";
import LogoutIcon from "../icons/logout.svg";
import LayersIcon from "../icons/layers.svg";
import DraftIcon from "../icons/draft.svg";
import InvisibleIcon from "../icons/invisible.svg";
import RejectedIcon from "../icons/rejected.svg";
import MailIcon from "../icons/mail.svg";


const sidebar = [
    [
        { name: "Products", icon: ShoppingBagIcon, page: '/' },
        { name: "Favorite", icon: WalletIcon, page: '/favorites' },
    ],
    [
        { name: "Help", icon: ChatIcon },
        { name: "Settings", icon: SettingsIcon },
        { name: "Logout", icon: LogoutIcon, page: "logout" },
    ],
];

const status = [
    { name: "Published", icon: LayersIcon },
    { name: "Draft", icon: DraftIcon },
    { name: "Hidden", icon: InvisibleIcon },
    { name: "Rejected", icon: RejectedIcon },
    { name: "Under Review", icon: MailIcon },
];
</script>

<script>
import { mapActions, mapState } from 'pinia'
import { useProductStore } from "../stores/productStore";

export default {
    data() {
        return {
            isLogin: true,
        }
    },
    methods: {
        ...mapActions(useProductStore, ['handleLogout']),
        onhandleLogout() {
            this.handleLogout;
        }
    }
}
</script>

<template>
    <section>
        <div class="w-full min-h-screen font-sans text-gray-900 bg-gray-50 flex">
            <aside class="py-6 px-10 w-64 border-r border-gray-200">
                <img src="/src/images/zara-brand-logo.png" alt="" class="w-28" />
                <ul v-for="group in sidebar" class="flex flex-col gap-y-6 pt-20">
                    <li v-for="item in group">
                        <a v-if="item.page === 'logout'" @click.prevent=handleLogout
                            class="flex gap-x-4 items-center py-2 text-gray-500 hover:text-indigo-600 group">
                            <span
                                class="absolute w-1.5 h-8 bg-indigo-600 rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out" />
                            <Component :is="item.icon" class="w-6 h-6 fill-current" />
                            <span>{{ item.name }}</span>
                        </a>
                        <a v-else @click.prevent="$router.push(item.page)"
                            class="flex gap-x-4 items-center py-2 text-gray-500 hover:text-indigo-600 group">
                            <span
                                class="absolute w-1.5 h-8 bg-indigo-600 rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out" />
                            <Component :is="item.icon" class="w-6 h-6 fill-current" />
                            <span>{{ item.name }}</span>
                        </a>
                    </li>
                </ul>
            </aside>
        </div>
    </section>
</template>