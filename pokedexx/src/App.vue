<template>
  <div id="app">
  <div class="column is-half is-offset-one-quarter">
    <img src="./assets/logo.png" alt="logo">
    <hr>
    <h4 class="is-size-4">Pokedex</h4>
    <input class="input is-rounded" type="text" placeholder="Busca pokemeon pelo nome" v-model="busca"> <br>
    <button class="button is-fullwidth is-success" @click="buscar">Busca</button>
      <div v-for="(poke, index) in filteredPokemon" :key="poke.url">
        <Pokemon :name="poke.name" :url="poke.url" :num="index+1"/>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
import Pokemon from './components/Pokemon.vue'

export default {
  name: 'App',
  components: { Pokemon },
  data(){
    return {
      pokemons:[],
      filteredPokemon: [],
      busca: ''
    }
  },
  created: function(){
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=151%offset=0').then(res =>{
      this.pokemons = res.data.results;
      this.filteredPokemon = res.data.results;
    })
  }, methods: {
    buscar: function() {
      this.filteredPokemon = this.pokemons
        if(this.busca== '' || this.busca == ' '){
          this.filteredPokemon = this.pokemons
        } else{
          this.filteredPokemon = this.pokemons.filter(pok => pok.name == this.busca)
        }
      }
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
