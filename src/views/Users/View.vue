<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4 class="">
                    Users
                    <RouterLink to="/users/create" class="btn btn-outline-primary btn-sm float-end">Add User</RouterLink>
                </h4>
            </div>
            <div class="card-body p-0">
                <table class="table table-bordered table-hover">
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
                                    <tr class="">
                                        <td class="pe-2"> 
                                            <RouterLink :to="{ path: '/users/'+user.id+'/edit' }" class="btn btn-outline-primary btn-sm">
                                                Edit
                                            </RouterLink>
                                        </td>
                                        <td class="pe-2">
                                            <button type="button" 
                                            @click="deleteUser(user.id)" 
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
                this.users = res.data.users;
            })
            .catch(error => {
                    console.log('Error fetching users:', error);
            });

        },
        deleteUser(userId){
            if(confirm('Are you sure, you want to delete this data?')){
                axios.delete(`http://127.0.0.1:8000/api/users/${userId}`)
                .then(res => {
                    console.log(res)
                    alert(res.data.message);
                    this.getUsers();
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
