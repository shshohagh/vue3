<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h4>
                    Products
                    <RouterLink to="/products/create" class="btn btn-primary float-end">Add Product</RouterLink>
                </h4>
            </div>
            <div class="card-body">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th class="text-center">ID</th>
                            <th class="text-left">Name</th>
                            <th class="text-left">Details</th>
                            <th class="text-left">Price</th>
                            <th class="text-left">Stock</th>
                            <th class="text-left">Discount</th>
                            <th class="text-left">Total Price</th>
                            <th class="text-left">Review Link</th>
                            <th class="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody v-if="this.products.length > 0">
                        <tr v-for="(product, index) in products" :key="index">
                            <td class="text-center">{{ product.id }}</td>
                            <td class="text-left">{{ product.name }}</td>
                            <td class="text-left">{{ product.details }}</td>
                            <td class="text-left">{{ product.price }}</td>
                            <td class="text-left">{{ product.stock }}</td>
                            <td class="text-left">{{ product.discount }}</td>
                            <td class="text-left">{{ product.totalPrice }}</td>
                            <td class="text-left">
                                {{ product.rating }}<br>
                                {{ product.href.review }}<br>
                                <RouterLink to="/products/reviews/create" class="btn btn-primary btn-sm">Add Review</RouterLink>
                                
                            </td>
                            <td class="">
                                <table class="">
                                    <tr>
                                        <td> 
                                            <RouterLink to="/" class="btn btn-outline-primary btn-sm">
                                                Edit
                                            </RouterLink>
                                        </td>
                                        <td>
                                            <button type="button" class="btn btn-outline-danger btn-sm">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                </table>
                               
                                
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr><td colspan="4" class="text-center">Loading..</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
export default {
    name: 'products',
    data(){
        return {
            products: []
        }
    },
    mounted() {
        this.getproducts();
    },
    methods: {
        getproducts(){

            axios.get('http://127.0.0.1:8000/api/products')
            .then(res => {
                this.products = res.data.data;
            })

            .catch(error => {
                    console.log('Error fetching products:', error);
            });

        }
    },
}

</script>
