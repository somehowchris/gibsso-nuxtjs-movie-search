<template>
  <div>
    <b-row style="padding-left: 15px; padding-right:15px; color: lightgray; margin-bottom:4px">
      <span v-if="movies">Showing you {{movies.results.length + ' out of '+movies.total_results}}</span>
      <span v-else>{{$t('search.no_search')}}</span>
    </b-row>
    <b-row>
      <b-col
        md="6"
        lg="6"
        xl="3"
        v-for="movie in movies.results"
        :key="movie.id"
        style="margin-top:20px"
      >
        <MovieCard :movie="movie"></MovieCard>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import MovieCard from './MovieCard'

export default {
  name: 'MovieTable',
  components: {
    MovieCard
  },
  props: {
    movies: Array
  }
}
</script>
