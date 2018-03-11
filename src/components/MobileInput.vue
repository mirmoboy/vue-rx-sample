<template lang="pug">
  section
    b-dropdown(v-model='selectedItem', disabled)
      button.button(@click.prevent='', slot='trigger')
        div.flag-icon(:class='"flag-icon-" + selectedItem.code.toLowerCase()')
        span.icon.is-size-7
          i.fa.fa-chevron-down
      b-dropdown-item(v-for='opt in options', @click='onChange(opt)')
        span.flag-icon(:class='"flag-icon-" + opt.code.toLowerCase()')
        span {{ opt.name }} ({{ opt.dial_code }})
    p {{ selectedItem.dial_code }}
    input.input(:value='mobile', placeholder='x xxxx xxxx', @input="$emit('update:mobile', $event.target.value)")
    p is valid {{ isValidMobile }} - {{ mobile }}
</template>

<script>
import countryJson from "../../static/country.json";
export default {
  props: ["mobile"],
  data() {
    return {
      selectedItem: {
        name: "Australia",
        dial_code: "+61",
        code: "AU"
      },
      options: countryJson
    };
  },
  computed: {
    isValidMobile() {
      return /^\d{9}$/.test(this.mobile);
    }
  },
  methods: {
    onChange(selected) {
      const vm = this;
      vm.selectedItem = selected;
    }
  }
};
</script>

<style scoped>
@import "../../node_modules/flag-icon-css/css/flag-icon.min.css";
</style>