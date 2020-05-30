export const state = () => ({
  trailerMovie: undefined
})

export const getters = {
  getMovie: $state => $state.trailerMovie
}

export const mutations = {
  setMovie($state, movie) {
    $state.trailerMovie = movie;
  }
}
