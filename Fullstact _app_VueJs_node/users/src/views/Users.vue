
<template>
<div>
    <h1>Painel de usuario</h1>

    <table class="table">
        <thead>
            <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Cargo</th>
                <th>Açoes</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in users" :key="user.id">
                <td>{{user.name}}</td>
                <td>{{user.email}}</td>
                <td>{{user.role | processRole}}</td>
                <td> <router-link :to="{name: 'UserEdit', params:{id: user.id}}"><button class="button is-success">Editar</button></router-link> ||| 
                <button class="button is-danger" @click="showing(user.id)">Deletar</button></td>

            </tr>
        </tbody>
    </table>





    <div class="modal " :class="{modal:true, 'is-active': showModal}">
        <div class="modal-background"></div>
        <div class="modal-content">
            
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">
                        realmente quer deletar este usuario ?
                    </p>
                </header>
                <div class="card-content">
                    <p>estou aqui</p>
                </div>
                <footer class="card-footer">
                    <a class="card-footer-item" @click="hideModal()">Cancelar</a>
                    <a class="card-footer-item" @click="deleteUser()">DEletar</a>
                </footer>
            </div>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="hideModal()"></button>
    </div>
</div>
    
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
          users: [],
          showModal: false,
          deleteUserId: -1
        }
    },
    filters: {
        processRole: function(value) {
            if (value === '0'){
                return "Uauario commum"
            } else {
                return "Admin"
            }
        }
    },
    methods: {
        hideModal() {
            this.showModal= false
        },
        showing(id) {
            this.deleteUserId = id
            this.showModal= true
        },
        async deleteUser() {
        let req = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }
            try {
                 const result = await axios.delete("http://localhost:8000/user/"+this.deleteUserId, req)
                 console.log(result)
                 this.showModal= false

                 this.users = this.users.filter(u=> u.id != this.deleteUserId)
            } catch (error) {
                this.showModal= false
                console.log(error)
                
            }
        }
    }, 
    async created() {
        let req = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }
        try {
            const result = await axios.get("http://localhost:8000/user", req)
            this.users = result.data
        }catch(err) {
            console.log(err.response)
        }
    }
}
</script>

<style scoped>

</style>