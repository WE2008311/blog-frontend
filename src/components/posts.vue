<template>
<div id="posts">
	<div class="post-header">
		<h1 class="post-title">{{title}}</h1>
		<h3 class="post-info">
			<span>Posted By <span class="post-blue">{{author}}</span></span>
			<span>on <span class="post-blue">{{year}}/{{month}}/{{day}}</span></span>
		</h3>
	</div>
	<div class="post-content" v-html="content"></div>
</div>
</template>

<style lang="sass" scoped>
@import '../style/common';
$titleFontSize: 34px;
$infoFontSize: 12px;
#posts {
	width: 100%;
}

.post-header {
	margin-bottom: 25px;
}

.post-title {
	color: $globalBgColor;
	text-align: center;
	margin-bottom: 10px;
	font-size: $titleFontSize;
	font-weight: 500;
}

.post-blue {
	color: $infoBlue;
	cursor: pointer;
	&:hover {
		color: $infoHoverBlue;
	}
}

.post-info {
	color: $pColor;
	text-align: center;
	font-size: $infoFontSize;
	font-weight: 400;
}
</style>

<script>
import '../style/_reset.scss';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import PostService from '../lib/post-service';
export default {
	data() {
		return {
			title: '',
			author: '',
			year: 0,
			month: 0,
			day: 0,
			content: ''
		};
	},
	beforeRouteEnter(to, from, next) {
		let id = to.params.id;
		nprogress.start();
		console.log(PostService);
		PostService.getPostById(id).then(post => {
			next(vm => {
				vm.title = post.title;
				vm.author = post.author;
				vm.year = post.year;
				vm.month = post.month;
				vm.day = post.day;
				vm.content = post.content;
				nprogress.done();
			});
		}).catch(err => {
			console.error(err);
			nprogress.done();
			next(false);
		});
	}
};
</script>