<template>
  <div>
    <div v-if="response && response.results">
      <h1>{{$t('movie.'+category) != `movie.${category}` ? $t(`movie.${category}`) : $t('movie.byCategory', {category})}}</h1>
      <MovieTable :movies="response"></MovieTable>
      <infinite-loading @infinite="infiniteScroll" v-if="showLoader"></infinite-loading>
    </div>
    <div v-else-if="category === 'latest' && response && response.id">
      <h1>{{$t('movie.newest')}}</h1>
      <MovieCard :movie="response"></MovieCard>
    </div>
    <div v-else class="row">
      <div class="mx">
        <b-spinner class="mx" style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
      </div>
    </div>
  </div>
</template>
<script>
import MovieCard from '../components/MovieCard'
import MovieTable from '../components/MovieTable'
import { categories } from '../config'
export default {
  name: 'Category',
  components: {
    MovieCard,
    MovieTable
  },
  data: () => ({
    response: {},
    showLoader: true
  }),
  computed: {
    category() {
      return this.$route.params.category
    },
    findMethod() {}
  },
  methods: {
    async searchOnline(page = 1) {
      return this.$mdb.movieByCategory({
        category: this.category,
        page,
        language: this.$i18n.locale
      })
    },
    async loadMore() {
      const response = await this.searchOnline((this.response.page || 0) + 1)
      response.results = this.response.results
        ? [...this.response.results, ...response.results]
        : response.results
      this.response = response
    },
    async infiniteScroll() {
      this.showLoader = false
      await this.loadMore()
      this.showLoader = true
    }
  },
  async created() {
    if (!this.category || !(categories.indexOf(this.category) > -1))
      this.$router.push('/')

    this.loadMore()
  }
}
</script>
