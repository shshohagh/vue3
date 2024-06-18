<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h4>
                    Users
                    <RouterLink to="/users/create" class="btn btn-primary float-end">Add User</RouterLink>
                </h4>
            </div>
            <div class="card-body">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th class="text-center">ID</th>
                            <th class="text-left">Name</th>
                            <th class="text-left">Email</th>
                            <th class="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody v-if="this.users.length > 0">
                        <tr v-for="(user, index) in users" :key="index">
                            <td class="text-center">{{ user.id }}</td>
                            <td class="text-left">{{ user.name }}</td>
                            <td class="text-left">{{ user.email }}</td>
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
    name: 'users',
    data(){
        return {
            users: []
        }
    },
    mounted() {
        this.getUsers();
    },
    methods: {
        getUsers(){

            axios.get('http://127.0.0.1:8000/api/users')
            .then(res => {
                this.users = res.data.data;
            })

            .catch(error => {
                    console.log('Error fetching users:', error);
            });

        }
    },
}

</script>
