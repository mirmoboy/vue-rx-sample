<template >
  <div class="container">
    <div>msg 1: {{ msg }}</div>
    <div>msg 2: {{ msg2 }}</div>
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

export default {
  name: "HelloWorld",
  data () {
    return {
      msg: '',
      msg2: ''
    }
  },
  
  observableMethods: {
    setMsg: 'setMsg$',
    setMsg2: 'setMsg2$'
  },
  
  subscriptions () {
    var msg$ = Observable.merge(this.setMsg$)
    var msg2$ = Observable.merge(this.setMsg2$)
    return { msg: msg$, msg2: msg2$ }
  },

  created() {
    setTimeout( () => {
      this.setMsg('Sopas')
    }, 1000)

    setTimeout( () => {
      this.setMsg2('The 1975')
    }, 2000)
  }

};
</script>
