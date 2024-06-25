<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>
                    Products
                    <RouterLink to="/products/create" class="btn btn-outline-primary btn-sm float-end">Add Product</RouterLink>
                </h4>
            </div>
            <div class="card-body p-0">
                <table class="table table-bordered table-hover">
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
                                <RouterLink to="/products/reviews/create" class="btn btn-outline-primary btn-sm">Add Review</RouterLink>
                                
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
                                            <button type="button" 
                                            @click="deleteProduct(product.id)"
                                            class="btn btn-outline-danger btn-sm">
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
                    <tfoot>
                        <tr>
                            <td colspan="9">
                <nav>
                    <ul class="pagination justify-content-center">
                        <li class="page-item" :class="{ disabled: !pagination.prev }">
                            <a class="page-link" href="#" @click.prevent="getproducts(pagination.prev)">Previous</a>
                        </li>
                        
                        <li class="page-item" v-for="page in pagination.links" :key="page.label" :class="{ active: page.active }">
                            <a class="page-link" href="#" @click.prevent="page.url && getproducts(page.url)">{{ page.label }}</a>
                        </li>

                        <li class="page-item" :class="{ disabled: !pagination.next }">
                            <a class="page-link" href="#" @click.prevent="getproducts(pagination.next)">Next</a>
                        </li>
                    </ul>
                </nav>
                            </td>
                        </tr>
                    </tfoot>
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
            products: [],
            pagination: {
                prev: null,
                next: null,
                links: []
            }
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
                this.pagination.prev = res.data.links.prev;
                this.pagination.next = res.data.links.next;
                this.pagination.links = res.data.meta.links;
            })

            .catch(error => {
                    console.log('Error fetching products:', error);
            });

        },
        deleteProduct(productId){
            if(confirm('Are you sure, you want to delete this data?')){
                axios.delete(`http://127.0.0.1:8000/api/products/${productId}`)
                .then(res => {
                    console.log(res)
                    alert(res.data.message);
                    this.getproducts();
                })
                .catch(error => {
                    if (error.response) {
                        if(error.response.status == 404){
                            alert(error.response.data.message);
                        }
                    }
                });
            }
        }
    },
}

</script>
