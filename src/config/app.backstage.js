import base from './app.base.js';

base.navList.splice(3, 0, {
	name: 'Dashboard',
	icon: 'icon-equalizer',
	path: '/dashboard'
});

base.dashboardItems = [{
	icon: 'icon-quill',
	desc: 'New Post',
	route: {
		name: 'new'
	}
}, {
	icon: 'icon-stats-dots',
	desc: 'New Post',
	route: {
		name: 'new'
	}
}, {
	icon: 'icon-stats-dots',
	desc: 'New Post',
	route: {
		name: 'new'
	}
}, {
	icon: 'icon-stats-dots',
	desc: 'New Post',
	route: {
		name: 'new'
	}
}];

export default base;
