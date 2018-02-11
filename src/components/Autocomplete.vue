<template>
    <section>
        Name: {{name}}
        <b-autocomplete
            ref="search"
            v-model="name"
            :data="filteredDataArray"
            placeholder="Search"
            @select="onSelect"
            open-on-focus
            field='description'
            >
            <template slot-scope="props">
                <div class="no-hover">
                    {{props.option.description}}
                </div>
            </template>
            <template slot="empty">No results found</template>
        </b-autocomplete>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                data: [
                    {
                        suggestion: true,
                        description: 'Angular'
                    },
                    {
                        description: 'Angular 2'
                    },
                    {
                        description: 'Aurelia'
                    },
                    {
                        description: 'Backbone'
                    },
                    {
                        description: 'Ember'
                    },
                    {
                        description: 'jQuery'
                    },
                    {
                        description: 'Meteor'
                    },
                    {
                        description: 'Node.js'
                    },
                    {
                        description: 'Polymer'
                    },
                    {
                        description: 'React'
                    },
                    {
                        description: 'RxJS'
                    },
                    {
                        suggestion: true,
                        description: 'Vue.js'
                    }
                ],
                name: ''
            }
        },
        computed: {
            filteredDataArray() {
                try {
                    const arrSearch = this.name.split(';')
                    let search = arrSearch[arrSearch.length - 1] || ''
                    return this.data.filter((option) => {
                        return option.description.toString().toLowerCase()
                            .indexOf(search.trim().toLowerCase()) >= 0
                    })
                } catch(err) {
                    console.log('err', err)
                }
            }
        },
        methods: {
            onSelect(option) {
                if (option) {
                    // this.name += '; ' + option
                    console.log('this.name', this.name)
                }
                // option => selected = option
            }
        }
    }
</script>

<style>
a.dropdown-item:has(< .no-select) {
    color: red!important
}
</style>
