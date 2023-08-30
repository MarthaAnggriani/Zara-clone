import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'

export const useProductStore = defineStore('app', {
    state: () => ({
        baseUrl: "http://localhost:3000/customer",
        isLogin: false,
        products: [],
        totalProducts: 0,
        currentPage: 1,
        favorites: [],
        favoritesPrice: 0,
        productsWithId: {
            name: '',
            description: '',
            price: 0,
            imgUrl: '',
            author: '',
            category: '',
        }

    }),
    actions: {
        sweetAlert(value, data) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            switch (value) {
                case 'LoginSuccess':
                case 'RegisterSuccess':
                case 'LogoutSuccess':
                    Toast.fire({
                        icon: 'success',
                        title: data
                    })
                    break
                case 'SuccessAddedFavorite':
                    Toast.fire({
                        icon: 'success',
                        title: data
                    })
                    break
                case 'LoginError':
                case 'RegisterError':
                case 'ErrorAddedFavorite':
                case 'ErrorViewDetails':
                    Swal.fire({
                        icon: 'error',
                        iconColor: 'red',
                        confirmButtonColor: 'red',
                        background: '#191919',
                        color: 'white',
                        template: '#my-template',
                        title: data
                    })
                    break
            }
        },
        async handleRegister(newUser) {
            try {
                const { data } = await axios({
                    method: "post",
                    url: `${this.baseUrl}/register`,
                    data: newUser
                })
                // alert
                this.sweetAlert("RegisterSuccess", 'Register success')
                // ganti page
                this.newUser = ''
                this.router.push('/login')
            } catch (error) {
                let message = error.response.data.message
                this.sweetAlert('RegisterError', message);
            }
        },

        async handleLogout() {
            Swal.fire({
                title: 'Are you sure to logout?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, logout!'
            }).then(() => {
                localStorage.clear()
                this.router.push('/login')
                this.sweetAlert('LogoutSuccess', 'logout success')
            })
        },

        async handleLogin(user) {
            try {
                const { data } = await axios({
                    method: "post",
                    url: `${this.baseUrl}/login`,
                    data: user
                })
                localStorage.setItem("access_token", data.access_token)
                localStorage.setItem("email", user.email)
                this.email = user.email
                this.isLogin = true
                this.router.push("/")
                // alert
                this.sweetAlert("LoginSuccess", "Login success")
                this.page = "ProductsPage"
            } catch (error) {
                console.log(error);
                let message = error.response.data.message
                this.sweetAlert('LoginError', message);
            }
        },

        async googleLogin(googleCredential) {
            try {
                const { data } = await axios({
                    method: 'POST',
                    url: `${this.baseUrl}/google-login`,
                    headers: {
                        google_token: googleCredential
                    }
                })
                localStorage.setItem('access_token', data.access_token)
                localStorage.setItem('email', data.user.email)

                this.fetchProducts()
                this.router.push('/')
                this.isLogin = true
                this.sweetAlert('LoginSuccess', 'login success')
            } catch (error) {
                console.log(error);
                let message = error.response.data.message
                this.sweetAlert('LoginError', message);
            }
        },

        async fetchProducts(payload) {
            try {
                const { data } = await axios({
                    method: "get",
                    url: `${this.baseUrl}/products`,
                    headers: {
                        access_token: localStorage.getItem("access_token")
                    },
                    params: payload
                })
                this.products = data.products;
                this.totalProducts = data.totalProducts;
                this.currentPage = data.currentPage;
            }
            catch (error) {
                let message = error.response.data.message
                this.alertError(message);
            }
        },
        async fetchProductDetail(value, origin) {
            try {
                const { data } = await axios({
                    method: 'GET',
                    url: `${this.baseUrl}/products/${value}`,
                })
                this.productsWithId.name = data.name
                this.productsWithId.description = data.description
                this.productsWithId.price = data.price
                this.productsWithId.imgUrl = data.imgUrl
                this.productsWithId.author = data.User.username
                this.productsWithId.category = data.Category.name
                this.productsWithId.qrCodeUrl = data.qrcode
            }
            catch (err) {
                this.router.push('/NotFound')
            }
        },
        async fetchFavorites() {
            try {
                const { data } = await axios({
                    method: 'GET',
                    url: `${this.baseUrl}/favorites`,
                    headers: {
                        access_token: localStorage.access_token
                    }
                })
                this.favorites = data
                data.forEach(el => {
                    this.favoritesPrice += el.Product.price
                });
            } catch (err) {
                console.log(err)
                this.sweetAlert('ErrorAddedFavorite', err.response.data.message)
            }
        },
        async addMyFavorite(value) {
            try {
                const { data } = await axios({
                    method: 'POST',
                    url: `${this.baseUrl}/favorites/${value}`,
                    headers: {
                        access_token: localStorage.access_token
                    }
                })
                this.fetchFavorites();
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                Toast.fire({
                    icon: 'success',
                    title: 'Success add to cart'
                })
            } catch (err) {
                console.log(err);
                this.sweetAlert('ErrorAddedFavorite', err.response.data.message)
            }
        }
    }
})
