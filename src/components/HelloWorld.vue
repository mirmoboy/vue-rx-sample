<template >
  <div class="container">
    <div>msg 1: {{ msg }}</div>
    <div>msg 2: {{ msg2 }}</div>
    <div>
      <treeselect
        v-model="value"
        :multiple="true"
        :load-root-options="loadRootOptions"
        />
    </div>
  </div>
</template>


<script>
/**
 * vue-rx: https://github.com/vuejs/vue-rx
 * Rxjs: http://reactivex.io/rxjs/
 */
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/share'
import 'rxjs/add/observable/merge'
import Treeselect from '@riophae/vue-treeselect'

export default {
  name: "HelloWorld",
  components: { Treeselect },
  data () {
    return {
      msg: '',
      msg2: '',
      value: null
    }
  },
  
  observableMethods: {
    setMsg: 'setMsg$',
    setMsg2: 'setMsg2$'
  },
  
  subscriptions () {
    var msg$ = Observable.merge(this.setMsg$)
    var msg2$ = Observable.merge(this.setMsg2$)
    return { 
      msg: msg$, 
      msg2: msg2$
    }
  },

  created() {
    setTimeout( () => {
      this.setMsg('Sopas')
    }, 1000)

    setTimeout( () => {
      this.setMsg2('The 1975')
    }, 2000)
  },

  methods: {
    loadRootOptions(callback) {
      var data = [{"id":"fruits","label":"Fruits","children":[{"id":"apple","label":"Apple 🍎"},{"id":"grapes","label":"Grapes 🍇"},{"id":"pear","label":"Pear 🍐"},{"id":"strawberry","label":"Strawberry 🍓"},{"id":"watermelon","label":"Watermelon 🍉"}]},{"id":"vegetables","label":"Vegetables","children":[{"id":"corn","label":"Corn 🌽"},{"id":"carrot","label":"Carrot 🥕"},{"id":"eggplant","label":"Eggplant 🍆"},{"id":"tomato","label":"Tomato 🍅"}]}];
      setTimeout(() => callback(null, data), 2000)
    }
  }

};
</script>

<style src="@riophae/vue-treeselect/dist/vue-treeselect.min.css"></style>
