<template lang="pug">
  div#app
    mobile-input(:mobile.sync='mobile')
</template>

<script>
import HelloWorld from './components/HelloWorld'
// import Autocomplete from './components/Autocomplete'
import Croppie from './components/Croppie'
import MobileInput from '../src/components/MobileInput'

export default {
  name: 'App',
  components: {
    HelloWorld,
    'croppie': Croppie,
    MobileInput
  },
  data() {
    return {
      mobile: '112341234'
    }
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
