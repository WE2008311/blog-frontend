import routes from './routes.base';
const dashboard = resolve => require(['../components/dashboard'], resolve);
const edit = resolve => require(['../components/edit'], resolve);

routes.unshift({
	name: 'dashboard',
	path: '/dashboard',
	component: dashboard
}, {
	name: 'new',
	path: '/edit',
	component: edit,
}, {
	name: 'edit',
	path: '/edit/:id',
	component: edit
});


export default routes;