import Vue from 'vue';
import VueRouter from 'vue-router';
import Apis from 'st-api';
import MarkdownParser from './lib/markdown-parser';
import routes from './config/routes.base';
import app from './components/app';
import HttpClient from './lib/http-client';
import apiConfig from './config/apiconf.base';

Vue.use(VueRouter);
/* global DEBUG */
if (DEBUG) {
	console.log('debug');
}

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