
<template>
<div>
    <h2>Login</h2>
    <hr>
    <div class="columns is-centered">
        <div class="column is-half">
            <div v-if="erro !=undefined">
                <div class="notification is-danger">
                    {{erro}}
                </div>
            </div>
            
<hr>


            <label for="Email">Email</label>
            <input type="email" placeholder="makender103@gmail.com" class="input" v-model="email">

            <label for="Password">Password</label>
            <input type="text" placeholder="********" class="input" v-model="password">
                <hr>
            <button class="button is-success" @click="login">Logar</button>

        </div>
    </div>
</div>
    
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            password: '',
            email: '',
            erro: undefined
        }
    },
    methods: {
        async login() {
            const data ={
                    password: this.password,
                    email: this.email
            }
            try {
                const result = await axios.post("http://localhost:8000/login", data)
                localStorage.setItem('token', result.data.token)
                this.$router.push({name: 'Home'})
            } catch(err) {
                let msgErro = err.response.data.err;
                this.erro = msgErro
            }
        }
    }
}
</script>

<style scoped>

</style>