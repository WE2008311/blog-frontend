import routes from './routes.base';
const dashboard = resolve => require(['../components/dashboard'], resolve);
const editor = resolve => require(['../components/editor'], resolve);

routes.unshift({
	name: 'dashboard',
	path: '/dashboard',
	component: dashboard
}, {
	name: 'new',
	path: '/edit',
	component: editor,
}, {
	name: 'edit',
	path: '/edit/:id',
	component: editor
});


export default routes;