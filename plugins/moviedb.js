import Vue from 'vue';
import { MovieDb } from 'moviedb-promise';
import { apiKey } from '../config';

Vue.prototype.$mdb = new MovieDb(apiKey);
