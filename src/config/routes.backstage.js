import router from './routes.base';
const dashboard = resolve => require(['../components/dashboard'], resolve);

router.unshift({
	name: 'dashboard',
	path: '/dashboard',
	component: dashboard
});

export default router;