<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>
                    Add Product
                    <RouterLink to="/products" class="btn btn-primary float-end">All products</RouterLink>
                </h4>
            </div>
            <div class="card-body">
                <ul class="alert alert-warning" v-if="Object.keys(this.errorList).length > 0">
                    <li class="mb-0 ms-3" v-for="(error, index) in this.errorList" :key="index">
                        {{ error[0] }}
                    </li>
                </ul>
                <div class="mb-3">
                    <label for="">Name</label>
                    <input type="text" v-model="model.product.name" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="">Details</label>
                    <input type="details" v-model="model.product.details" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="">Price</label>
                    <input type="number" v-model="model.product.price" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="">Stock</label>
                    <input type="number" v-model="model.product.stock" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="">Discount</label>
                    <input type="number" v-model="model.product.discount" class="form-control">
                </div>
                <div class="mb-3">
                    <button type="button" @click="saveProduct" class="btn btn-primary">Save</button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'productCreate',
        data() {
            return {
                errorList: '',
                model: {
                    product: {
                        name: '',
                        details: '',
                        price: '',
                        stock: '',
                        discount: '',
                    }
                }
            }
        },

        methods: {
            saveProduct(){
                axios.post('http://127.0.0.1:8000/api/products',this.model.product)
                .then(res => {
                    console.log(res)
                    alert(res.data.message);
                    this.model.product = {
                        name: '',
                        details: '',
                        price: '',
                        stock: '',
                        discount: '',
                    }
                    this.errorList ='';
                    this.$router.push({ path: '/products' });
                })
                .catch(function (error) {
                    if (error.response) {
                        if(error.response.status == 422){
                            this.errorList = error.response.data.errors;
                        }
                        /* console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers); */
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log('Error', error.message);
                    }
                });
            }
        },
    }
</script>