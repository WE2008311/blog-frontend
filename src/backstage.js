import Vue from 'vue';
import VueRouter from 'vue-router';
import Apis from 'st-api';
import MarkdownParser from './lib/markdown-parser';
import routes from './config/routes.backstage';
import app from './components/backstage.vue';
import HttpClient from './lib/http-client';
import apiConfig from './config/apiconf.backstage';

Vue.use(VueRouter);

let router = new VueRouter({
	routes
});

let client = new HttpClient();
let apis = new Apis(apiConfig, client);
window.apis = apis;

MarkdownParser.config({
	sanitize: true
});

$(() => {
	new Vue({
		el: '#app',
		template: '<app/>',
		components: {
			app
		},
		router
	});
});