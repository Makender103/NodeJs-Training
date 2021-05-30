
<template>
<div>
    <h2>Edição de usuario</h2>
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
                <hr>
            <button class="button is-success" @click="update()">Editar</button>

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
            email: '',
            id: -1,
            erro: undefined
        }
    },
    methods: {
        async update() {
            try {
                const result = await axios.put("http://localhost:8000/user/", {
                    name: this.name,
                    email: this.email,
                    id: this.id
                })
                console.log(result)
                this.$router.push({name: 'Users'})
            } catch(err) {
                let msgErro = err.response.data.err;
                this.erro = msgErro
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
            const res = await axios.get("http://localhost:8000/user/"+this.$route.params.id, req)
            console.log(res)
            this.name = res.data.name;
            this.email = res.data.email;
            this.id = res.data.id
            
        } catch (error) {
           var msgErro = error.response.data.err
            console.log(msgErro)
           this.erro = msgErro
        }
    }
}
</script>

<style scoped>

</style>