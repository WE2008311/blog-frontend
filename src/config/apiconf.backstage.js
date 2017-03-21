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
		pathname: '/posts/{id}',
		method: 'put',
		restful: true
	},
	deletePost: {
		// delete /posts
		pathname: '/posts/{id}',
		method: 'delete',
		restful: true
	}
});
export default apis;