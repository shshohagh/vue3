<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h4>
                    Add Review
                </h4>
            </div>
            <div class="card-body">
                <ul class="alert alert-warning" v-if="Object.keys(this.errorList).length > 0">
                    <li class="mb-0 ms-3" v-for="(error, index) in this.errorList" :key="index">
                        {{ error[0] }}
                    </li>
                </ul>
                <div class="mb-3">
                    <label for="">Product Id</label>
                    <input type="number" v-model="model.review.product_id" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="">Customer</label>
                    <input type="text" v-model="model.review.customer" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="">Review</label>
                    <input type="text" v-model="model.review.review" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="">Star</label>
                    <input type="number" min="1" max="5" v-model="model.review.star" class="form-control">
                </div>
                <div class="mb-3">
                    <button type="button" @click="saveReview" class="btn btn-primary">Save</button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'reviewCreate',
        data() {
            return {
                errorList: '',
                model: {
                    review: {
                        product_id: '',
                        customer: '',
                        review: '',
                        star: '',
                    }
                }
            }
        },

        methods: {
            saveReview(){
                axios.post('http://127.0.0.1:8000/api/products/reviews',this.model.review)
                .then(res => {
                    console.log(res)
                    alert(res.data.message);
                    this.model.review = {
                        product_id: '',
                        customer: '',
                        review: '',
                        star: '',
                    }
                    this.errorList ='';
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