import Promise from 'bluebird';
import trimHtml from 'trim-html';
import MarkdownParser from './markdown-parser';
import StatusCode from './status-code';
/* global apis */

let parser = new MarkdownParser();
let pm = [];
let tmpPosts = [];
let postsCatche = {};
let total = 0;

export default {
	getPosts(page, limit) {
		return apis.getPosts.get({
			page,
			limit
		}).then(resp => {
			if (resp.data.status != StatusCode.OK) {
				throw new Error(resp.data.errMsg);
			}
			let posts = tmpPosts = resp.data.posts;
			total = resp.data.total;
			// 每次请求预览列表都清空promise列表和post缓存
			// 在获取响应之后清空而不要在发起请求之前清空，否则有个并发请求的坑会导致pm没被清空而累加
			pm = [];
			postsCatche = {};
			for (let i in posts) {
				pm.push(parser.parse(posts[i].content));
			}
			return Promise.all(pm);
		}).then(contents => {
			for (let k in contents) {
				tmpPosts[k].content = trimHtml(contents[k], {
					limit: 400
				}).html;
				// 缓存post列表
				postsCatche[tmpPosts[k].id] = tmpPosts[k];
			}
			return {
				total,
				posts: tmpPosts
			};
		});
	}
};