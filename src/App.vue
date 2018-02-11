<template>
  <div id="app">
    <autocomplete-component></autocomplete-component>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
// import Autocomplete from './components/Autocomplete'
import Autocomplete from './components/AutocompleteV2'

export default {
  name: 'App',
  components: {
    HelloWorld,
    'autocomplete-component': Autocomplete
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
