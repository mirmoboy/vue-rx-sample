<template lang="pug">
  .container
    .control
        input.input(
            v-model="search", 
            type="text", 
            @focus="onFocusSuggestion", 
            @keydown.up.prevent="keyArrows('up')"
            @keydown.down.prevent="keyArrows('down')"
            @keydown.enter.prevent="enterPressed"
            @keydown.tab.prevent="tabPressed"
            @blur="onFocusOut",
            @click="showSuggestion = true"
            ref='search'
            )
        .suggestion-container(v-show="showSuggestion", ref="dropdown")
            .suggestion-item(v-if="search !==''" v-for='(option, index) in dataSuggestion', @click="onItemClick(option.description)", :class="{ 'selected-item': option === hovered }")
                span(v-html="getValue(option, true)")
            .recent-search-label(v-if="search ==='' && hasRecent") Recent searches
            .suggestion-item(v-if="search ==='' && hasRecent" v-for='(option, index) in recentSearches', @click="onItemClick(option.description)", :class="{ 'selected-item': option === hovered }")
                span {{ option.description }}
    br
    br
    button.button(@click="onSubmit") Submit
</template>

<script>
import data from "../components/data.json";
import _ from "lodash";
export default {
  data() {
    return {
      data: data,
      showSuggestion: false,
      search: "",
      hovered: "",
      selectedIndex: 0,
      recentItems: []
    };
  },
  computed: {
    dataSuggestion() {
      try {
        const arrSearch = this.search.split(";");
        let search = arrSearch[arrSearch.length - 1] || "";
        return this.data
          .filter(option => {
            return (
              option.description
                .toString()
                .toLowerCase()
                .indexOf(search.trim().toLowerCase()) >= 0
            );
          })
          .splice(0, 5);
      } catch (err) {
        console.log("err", err);
      }
    },
    lastQuery() {
      const arrSearch = this.search.split(";");
      let search = arrSearch[arrSearch.length - 1] || "";
      return search.trim();
    },
    hasRecent() {
        // return []
      return this.recentItems.length > 0 ? true : false;
    },
    recentSearches() {
      return _.reverse(this.recentItems)
    }
  },
  watch: {
    search() {
      const option = this.dataSuggestion[0];
      this.setHovered(option);
      this.showSuggestion = true;
    }
  },
  methods: {
    onSubmit() {
      if (this.search !== "") {
        this.appendRecent(this.search);
      }
    },
    appendRecent(item) {
      if (item === '') return
      const recent = this.$cookie.get("recent");
      let _recent;
      const _item = this.removeLastIndex(item.trim(), ';')
      if (recent) {
        _recent = JSON.parse(recent)
        let length = _recent.recent.items.length;
        const indexOf = _recent.recent.items.indexOf(_item)
        if (indexOf > -1) {
          _recent.recent.items = _.remove(_recent.recent.items, function(n) {
            return n !== _item;
          })
        }
        if (length === 5) _recent.recent.items = _recent.recent.items.splice(1, length)
        _recent.recent.items.push(_item)
      } else {
        _recent = {
          recent: {
            items: [_item]
          }
        };
      }
      this.$cookie.set("recent", JSON.stringify(_recent), { expires: "1Y" })
    },
    onFocusSuggestion() {
      this.showSuggestion = true;
      let suggestion = []
      const recentSearchCookie = this.$cookie.get('recent')
      const _recent = JSON.parse(recentSearchCookie)
      if (_recent) {
          _.each(_recent.recent.items, function(item) {
              suggestion.push({
                  description: item
              })
          })
      }
      this.recentItems = suggestion
    },
    onItemClick(option) {
      this.search = this.removeLastIndex(this.search.trim(), this.lastQuery)
      this.search += " " + option.trim() + "; ";
      this.search = this.search.trimLeft();
      this.showSuggestion = false;
      this.$refs.search.focus();
    },
    keyArrows(direction) {
      const sum = direction === "down" ? 1 : -1;
      if (this.showSuggestion) {
        let index = this.dataSuggestion.indexOf(this.hovered) + sum;
        index = index > this.dataSuggestion.length - 1 ? this.dataSuggestion.length : index;
        index = index < 0 ? 0 : index;
        this.setHovered(this.dataSuggestion[index]);
        const list = this.$refs.dropdown;
        const element = list.querySelectorAll(".suggestion-item")[index];
        if (!element) return;
        const visMin = list.scrollTop;
        const visMax =
          list.scrollTop + list.clientHeight - element.clientHeight;
        if (element.offsetTop < visMin) {
          list.scrollTop = element.offsetTop;
        } else if (element.offsetTop >= visMax) {
          list.scrollTop =
            element.offsetTop - list.clientHeight + element.clientHeight;
        }
      } else {
        this.showSuggestion = true;
      }
    },
    onFocusOut() {
      setTimeout(() => {
        this.showSuggestion = false;
      }, 200);
    },
    getValue(option, isHighlight = false) {
      if (!option) return;
      const value = typeof option === "object" ? option.description : option;
      const escapedValue = this.escapeRegExpChars(this.lastQuery);
      const regex = new RegExp(`(${escapedValue})`, "gi");
      return isHighlight ? value.replace(regex, "<b>$1</b>") : value;
    },
    escapeRegExpChars(value) {
      if (!value) return value;
      return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    },
    enterPressed() {
      if (this.hovered === null) {
        return;
      } else {
        this.setSelected();
      }
    },
    tabPressed() {
      if (this.hovered === null) {
        // this.isActive = false
        return;
      }
      this.setSelected();
      this.$refs.search.focus();
    },
    setSelected() {
    //   this.search = this.search.replace(this.lastQuery, "");
      this.search = this.removeLastIndex(this.search.trim(), this.lastQuery)
      this.search += ' ' + this.hovered.description + "; ";
      this.search = this.search.trimLeft();
      this.hovered = null;
      this.showSuggestion = false;
    },
    setHovered(option) {
      if (option === undefined) return;
      this.hovered = option;
    },
    removeLastIndex(char, sep) {
        var pos = char.lastIndexOf(sep);
        return char.substring(0, pos)
    }
  }
};
</script>


<style lang="scss">
.suggestion-container {
  left: 0;
  min-width: 12rem;
  padding-top: 4px;
  position: absolute;
  top: 100%;
  z-index: 20;
}
.suggestion-item {
  background-color: white;
  border-radius: 3px;
  -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.1);
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;

  &:hover {
    background-color: #dedede;
  }
}
.selected-item {
  background-color: #dedede;
}
.recent-search-label {
  background-color: #dedede;
}
</style>
