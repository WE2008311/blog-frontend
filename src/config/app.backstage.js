import base from './app.base.js';

base.navList.splice(3, 0, {
	name: 'Dashboard',
	icon: 'icon-equalizer',
	path: '/dashboard'
});

export default base;


// export default {
// 	title: 'Test',
// 	subTitle: 'intro',
// 	pageLimit: 5,
// 	windowLimit: 10,
// 	logo: {
// 		url: 'http://www.baidu.com',
// 		sides: ['A', 'B', 'C', 'D', 'E', 'F'],
// 	},
// 	navList: [{
// 		name: 'Home',
// 		icon: 'icon-home',
// 		path: '/home'
// 	}, {
// 		name: 'Archives',
// 		icon: 'icon-folder-open',
// 		path: '/archives'
// 	}, {
// 		name: 'Tags',
// 		icon: 'icon-price-tag',
// 		path: '/tags'
// 	}, {
// 		name: 'About',
// 		icon: 'icon-user',
// 		path: '/about'
// 	}]
// };