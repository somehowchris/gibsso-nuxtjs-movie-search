<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand :to="localePath('/')">Moviecast</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item
            :to="localePath('/')"
            :active="$route.path === localePath(`/`)"
          >{{$t('navbar.search')}}</b-nav-item>
          <b-nav-item
            :to="localePath(`/${category}`)"
            v-for="category in categories"
            :key="category"
            :active="$route.path === localePath(`/${category}`)"
          >{{$t(`navbar.${category}`) === `navbar.${category}` ? category : $t(`navbar.${category}`)}}</b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown
            :text="$i18n.locale === 'de' ? 'Sprache wechseln' : 'Change language'"
            right
          >
            <b-dropdown-item :to="switchLocalePath('en')">Englisch</b-dropdown-item>
            <b-dropdown-item :to="switchLocalePath('de')">Deutsch</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-container fluid>
      <b-row>
        <b-col md="1" sm="0"></b-col>
        <b-col md="10" sm="12">
          <nuxt style="margin-top:40px; margin-bottom: 40px" />
        </b-col>
      </b-row>
    </b-container>
    <b-modal size="xl" v-model="trailer.show">
      <vue-plyr v-if="trailerMovie" allowfullscreen>
        <div
          :data-plyr-provider="trailerMovie.site.toLowerCase()"
          :data-plyr-embed-id="trailerMovie.key"
        ></div>
      </vue-plyr>
    </b-modal>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import { categories as configuredCategories } from '../config'
export default {
  name: 'DefaultLayout',
  data: () => ({
    categories: configuredCategories,
    trailer: {
      show: false
    }
  }),
  computed: {
    ...mapGetters(['getMovie']),
    trailerTitle() {
      return '' //this.$t('movie.trailer', { title: this.trailerMovie.title })
    },
    trailerMovie: {
      get() {
        return this.getMovie
      },
      set(movie) {
        return this.setMovie(movie)
      }
    }
  },
  methods: {
    ...mapMutations(['setMovie'])
  },
  watch: {
    trailerMovie() {
      if (this.trailerMovie !== undefined) {
        this.trailer.show = true
      }
    },
    trailer: {
      handler() {
        if (this.show === false) {
          this.setMovie(undefined)
        }
      },
      deep: true
    }
  }
}
</script>
<style>
header.modal-header,
footer.modal-footer {
  display: none !important;
}
.modal-body {
  padding: 0 !important;
}
.hanging-close {
  position: absolute;
  top: -12px;
  right: -12px;
  z-index: 9001;
}
#trailer-video {
  width: 100%;
  height: 100%;
}
.scale-media {
  padding-bottom: 56.25%;
  position: relative;
}
.scale-media iframe {
  border: none;
  height: 100%;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  background-color: white;
}
.thumbnail:hover {
  background-color: #333;
  cursor: pointer;
}
.thumbnail {
  padding: 10px;
}
.popover-title {
  font-weight: bold;
  text-align: center;
}
/* centered columns styles see -> http://goo.gl/pv4oow */
.row-centered {
  text-align: center;
}
.col-centered {
  display: inline-block;
  float: none;
  /* reset the text-align */
  text-align: left;
  /* inline-block space fix */
  margin-right: -15px;
}
.movie-btn {
  overflow: hidden;
  text-overflow: ellipsis;
}
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

/* key stuff */
.your-centered-div {
  width: 560px; /* you have to have a size or this method doesn't work */
  height: 315px; /* think about making these max-width instead - might give you some more responsiveness */

  position: absolute; /* positions out of the flow, but according to the nearest parent */
  top: 0;
  right: 0; /* confuse it i guess */
  bottom: 0;
  left: 0;
  margin: auto; /* make em equal */
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
