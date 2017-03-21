import apis from './apiconf.base';
Object.assign(apis, {
	getTagList: {
		// get /taglist
		pathname: '/taglist'
	},
	createPost: {
		// post /posts
		pathname: '/posts',
		method: 'post'
	},
	modifyPost: {
		// put /posts
		pathname: '/posts',
		method: 'put'
	}
});
export default apis;