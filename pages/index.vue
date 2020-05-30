<template>
  <div>
    <h1>{{$t('search.title')}}</h1>
    <b-row>
      <b-col lg="10" md="8" sm="12" class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          :placeholder="$t('search.placeholder')"
          :aria-label="$t('search.placeholder')"
          aria-describedby="basic-addon2"
          v-model="search"
        />
      </b-col>

      <b-col lg="2" mg="4" sm="12" style="padding-right: 15px; padding-left:15px; width:100%">
        <button
          type="button"
          class="btn btn-light"
          style="width:100%"
          @click="clearSearch"
        >{{$t('search.clear')}}</button>
      </b-col>
    </b-row>
    <MovieTable :movies="response" v-if="response && response.results"></MovieTable>
    <div
      style="color:lightgray"
      v-if="!search || (search && search.length === 0)"
    >{{$t('search.no_search')}}</div>
    <b-row
      v-if="response && response.results && response.page < response.total_pages"
      style="margin-bottom:40px; margin-top:40px;display: box;"
    >
      <div class="mx-auto">
        <div
          style="color: lightgray"
        >{{response.results.length + ' out of '+response.total_results}}</div>
        <button type="button" class="btn btn-info" @click="loadMore">{{$t('loadMore')}}</button>
      </div>
    </b-row>
  </div>
</template>

<script>
import MovieTable from '~/components/MovieTable.vue'
import _ from 'lodash'

export default {
  components: {
    MovieTable
  },
  data: () => ({
    response: {},
    search: ''
  }),
  methods: {
    debounceSearch: _.debounce(async function() {
      this.response = await this.searchOnline(this.search)
    }, 200),
    async searchOnline(search = '', page = 1) {
      return this.$mdb.searchMovie({
        query: search,
        page,
        language: this.$i18n.locale,
        append_to_response: 'videos'
      })
    },
    clearSearch() {
      this.search = ''
    },
    async loadMore() {
      const response = await this.searchOnline(
        this.search,
        this.response.page + 1
      )
      response.results = this.response
        ? [...this.response.results, ...response.results]
        : response
      this.response = response
    }
  },
  watch: {
    async search() {
      this.debounceSearch()
    }
  }
}
</script>

<style>
.container-fluid {
  margin-top: 80px;
  justify-content: center;
  align-items: center;
  text-align: left;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
