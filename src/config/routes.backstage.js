import routes from './routes.base';
const dashboard = resolve => require(['../components/dashboard'], resolve);
const edit = resolve => require(['../components/edit'], resolve);
const archives = resolve => require(['../components/archives-backstage'], resolve);

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
}, {
	name: 'archives',
	path: '/archives/:page',
	component: archives
});
// suck
routes.splice(5, 1);


export default routes;