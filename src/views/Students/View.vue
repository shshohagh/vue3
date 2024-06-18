<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h4>
                    Students
                    <RouterLink to="/students" class="btn btn-primary float-end">Add Student</RouterLink>
                </h4>
            </div>
            <div class="card-body">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user, index) in users" :key="index">
                            <td>{{ user.id }}</td>
                            <td>{{ user.name }}</td>
                            <td>{{ user.email }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Users',
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
