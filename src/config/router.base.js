import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const home = resolve => require(['../components/home'], resolve);

const routes = [{
	name: 'home',
	path: '/home/:id',
	component: home,
}, {
	name: 'archives',
	path: '/archives'
}, {
	name: 'tags',
	path: '/tags'
}, {
	name: 'about',
	path: '/about'
}, {
	path: '/',
	redirect: '/home/1'
}, {
	path: '/home',
	redirect: '/home/1'
}];

export default new VueRouter({
	routes
});