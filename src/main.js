import Vue from 'vue';
import router from './config/router.base';
import app from './components/app';

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