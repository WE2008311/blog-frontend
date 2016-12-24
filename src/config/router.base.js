import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const home = resolve => require(['../components/home'], resolve);
const archives = resolve => require(['../components/archives'], resolve);

const routes = [{
	name: 'home',
	path: '/home/:page',
	component: home,
}, {
	name: 'archives',
	path: '/archives',
	component: archives
}, {
	name: 'tags',
	path: '/tags'
}, {
	name: 'about',
	path: '/about'
}, {
	name: 'post',
	path: '/post/:id'
}, {
	path: '*',
	redirect: '/home/1'
}];

export default new VueRouter({
	routes
});