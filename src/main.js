import Vue from 'vue';
import Apis from 'st-api';
import MarkdownParser from './lib/markdown-parser';
import router from './config/router.base';
import app from './components/app';
import HttpClient from './lib/http-client';
import apiConfig from './config/apiconf.base';

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