<template>
  <div>
    <div class="card">
      <div class="card-header" v-if="movie.poster_path">
        <img
          class="card-img"
          :src="movie.poster_path ? `https://image.tmdb.org/t/p/w780${movie.poster_path}` : undefined"
          alt="Card image"
        />
      </div>
      <div v-else style="margin-top:32%"></div>
      <div class="card-body">
        <h1 class="card-title">{{movie.title}}</h1>
        <b-row>
          <b-col md="12">
            <b-row>
              <b-col md="4" class="metadata">
                <i class="fa fa-star" aria-hidden="true"></i>
                <p>{{movie.vote_average}}/10</p>
              </b-col>
              <b-col md="8">{{movie.release_date}}</b-col>
            </b-row>
          </b-col>
        </b-row>
        <p class="card-text">{{movie.overview}}</p>
        <b-row>
          <b-col
            sm="12"
            md="6"
            lg="6"
            style="margin-top:8px"
            v-if="movie.id && (trailer === undefined || trailer.key)"
          >
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="watchTrailer()"
            >{{$t('trailer.watch')}}</button>
          </b-col>
          <b-col sm="12" md="6" lg="6" style="margin-top:8px" v-if="movie.id">
            <button
              type="button"
              class="btn btn-outline-warning align-right"
              @click="toggleFavorite"
            >{{!favorite ? $t('favorite.add') : $t('favorite.remove')}}</button>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { checkForTrailerOnClick } from '../config'

export default {
  name: 'MovieCard',
  props: {
    movie: Object
  },
  data: () => ({
    show: false,
    favorite: false,
    trailer: undefined
  }),
  async created() {
    this.favorite = this.isFavorite
    if (!checkForTrailerOnClick && this.movie.id) await this.checkForTrailer()
  },
  computed: {
    isFavorite() {
      return !!localStorage.getItem(this.movie.id)
    }
  },
  methods: {
    ...mapMutations(['setMovie']),
    toggleFavorite() {
      localStorage.setItem(this.movie.id, !this.favorite)
      this.favorite = !this.favorite
    },
    async checkForTrailer() {
      this.trailer = await this.$mdb.movieInfo({
        id: this.movie.id,
        language: this.$i18n.locale,
        append_to_response: 'videos'
      })

      this.trailer =
        this.trailer.videos.results.find(el => el.type === 'Trailer') || {}
    },
    async watchTrailer() {
      if (!this.trailer && !!checkForTrailerOnClick && this.movie.id)
        await this.checkForTrailer()
      if (this.trailer && this.trailer.key) {
        this.setMovie(this.trailer)
      }
    }
  }
}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700');

@import url('https://fonts.googleapis.com/css?family=Fredericka+the+Great');

.col-md-4,
.description {
  padding: 0;
}

.description {
  font-family: 'Fredericka the Great', cursive;
  text-align: left;
}

.card-header,
.metadata {
  background: none;
  padding: 0;
  position: relative;
  border-style: none;
}

.metadata {
  font-size: 16px;
  i,
  p {
    float: left;
  }
  p {
    margin-top: 0;
    margin-left: 10px;
  }
  i {
    color: #ff9d00;
    margin-top: 5px;
    margin-left: 1px;
  }
}

.card-img {
  -webkit-clip-path: inset(10% 0 20% 0);
  clip-path: inset(10% 0 20% 0);
  margin-top: -15%;
}

.card-body {
  position: relative;
  margin-top: -30%;
  color: #9fa7a9;
  .card-title {
    font-weight: 600;
    color: #414345;
  }
  .card-text {
    margin-top: 8px;
    font-weight: 600;
    line-height: 30px;
  }
}

.card,
.trailer-preview {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  &:hover {
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.1), 0 8px 8px rgba(0, 0, 0, 0.18);
  }
}

.card {
  border-radius: 8pt;
  border-style: none;
  overflow: hidden;
}

.trailer-preview {
  background-color: #ff3d49;
  position: absolute;
  top: -46px;
  right: 24px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  color: white;
  font-size: 36px;
  text-align: left;
  padding-top: 13px;
  &:hover,
  &:disabled,
  &:active,
  &:focus {
    background-color: #ff3d49;
    color: white;
  }
  i {
    margin-left: 5px;
  }
}
</style>
