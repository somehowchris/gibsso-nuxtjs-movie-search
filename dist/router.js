import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0deaa349 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _c8cbb858 = () => interopDefault(import('../pages/_category.vue' /* webpackChunkName: "pages/_category" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/de/",
    component: _0deaa349,
    name: "index___de"
  }, {
    path: "/en/",
    component: _0deaa349,
    name: "index___en"
  }, {
    path: "/de/:category",
    component: _c8cbb858,
    name: "category___de"
  }, {
    path: "/en/:category",
    component: _c8cbb858,
    name: "category___en"
  }, {
    path: "/",
    component: _0deaa349,
    name: "index___de___default"
  }, {
    path: "/:category",
    component: _c8cbb858,
    name: "category___de___default"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
