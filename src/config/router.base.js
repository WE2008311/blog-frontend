import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const home = resolve => require(['../components/home'], resolve);

const routes = [{
	name: 'home',
	path: '/home',
	alias: '/',
	component: home
}, {
	name: 'archives',
	path: '/archives'
}, {
	name: 'tags',
	path: '/tags'
}, {
	name: 'about',
	path: '/about'
}];

export default new VueRouter({
	routes
});