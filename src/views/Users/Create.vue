<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4 class="text-primary">
                    Add User
                    <RouterLink to="/users" class="btn btn-outline-primary btn-sm float-end">All Users</RouterLink>
                </h4>
            </div>
            <div class="card-body">
                <ul class="alert alert-warning" v-if="Object.keys(errorList).length > 0">
                    <li class="mb-0 ms-3" v-for="(errors, field) in errorList" :key="field">
                        <div v-for="(error, index) in errors" :key="index">
                            {{ error }}
                        </div>
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
                errorList: {},
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
                    this.errorList ={};
                    this.$router.push({ path: '/users' });
                })
                .catch(error => {
                    if (error.response) {
                        if(error.response.status == 422){
                            console.log(error.response.data.errors);
                            this.errorList = error.response.data.errors;
                        }
                        if(error.response.status == 500){
                            alert(error.response.data.message);
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