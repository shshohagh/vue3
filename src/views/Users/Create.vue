<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h4>
                    Add User
                    <RouterLink to="/users" class="btn btn-primary float-end">All Users</RouterLink>
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
                    <input type="text" v-model="model.user.name" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="">Email</label>
                    <input type="email" v-model="model.user.email" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="">Password</label>
                    <input type="password" v-model="model.user.password" class="form-control">
                </div>
                <div class="mb-3">
                    <button type="button" @click="saveUser" class="btn btn-primary">Save</button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'userCreate',
        data() {
            return {
                errorList: '',
                model: {
                    user: {
                        name: '',
                        email: '',
                        password: '',
                    }
                }
            }
        },

        methods: {
            saveUser(){
                axios.post('http://127.0.0.1:8000/api/users',this.model.user)
                .then(res => {
                    console.log(res)
                    alert(res.data.message);
                    this.model.user = {
                        name: '',
                        email: '',
                        password: '',
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