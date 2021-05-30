
<template>
<div>
    <h2>Registro de usuario</h2>
    <hr>
    <div class="columns is-centered">
        <div class="column is-half">
            <div v-if="erro !=undefined">
                <div class="notification is-danger">
                    {{erro}}
                </div>
            </div>
            
<hr>
            <label for="Nome">Nome</label>
            <input type="text" placeholder="nome do usuario" class="input" v-model="name">

            <label for="Email">Email</label>
            <input type="email" placeholder="makender103@gmail.com" class="input" v-model="email">

            <label for="Password">Password</label>
            <input type="text" placeholder="********" class="input" v-model="password">
                <hr>
            <button class="button is-success" @click="register">Cadastrar</button>

        </div>
    </div>
</div>
    
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            name: '',
            password: '',
            email: '',
            erro: undefined
        }
    },
    methods: {
        async register() {
            try {
                const result = await axios.post("http://localhost:8000/user", {
                    name: this.name,
                    password: this.password,
                    email: this.email
                })
                console.log(result)
                this.$router.push({name: 'Register'})
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