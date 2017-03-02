<template>
<header id="nav-bar">
	<keep-alive>
		<component :is="logoName" :url="logo.url" :sides="logo.sides" class="logo"></component>
	</keep-alive>
	<div id="nav-main">
		<div id="intro">
			<h1 id="site-title">{{title}}</h1>
			<p id="sub-title">{{subTitle}}</p>
		</div>
		<nav id="nav-list">
			<ul>
				<router-link v-for="(item, index) in navList" tag="li" :to="item.path" active-class="nav-active" :key="index">
					<i :class="item.icon"></i><span class="nav-item">{{item.name}}</span>
				</router-link>
			</ul>
		</nav>
	</div>
	<div id="sns-bar">
		<i class="icon-github"></i>
		<i class="icon-twitter"></i>
		<i class="icon-sina-weibo"></i>
		<i class="icon-wechat"></i>
		<i class="icon-rss"></i>
	</div>
</header>
</template>

<style lang="sass" scoped>
	@import '../style/common';
	$titleFtSize: 30px;
	$titleFtWeight: 400;
	$subTitleFtSize: 14px;
	$itemBorder: 1px solid rgba($color: #fff, $alpha: 0.2);
	$itemHoverColor: #555;
	$itemFontSize: 18px;
	#nav-bar {
		width: $navBarWidth;
		height: 100%;
		min-height: 500px;
		text-align: center;
		background: $globalBgColor;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 10;
	}
	
	.logo {
		margin-top: 20px;
	}
	
	#nav-main {
		width: 100%;
		position: absolute;
		top: 120px;
	}
	
	#site-title {
		font-size: $titleFtSize;
		font-weight: $titleFtWeight;
		cursor: pointer;
		transition: color 0.3s ease;
		&:hover {
			color: $logoFtColor;
		}
	}
	
	#sub-title {
		font-size: $subTitleFtSize;
	}
	
	#intro {
		color: $globalFtColor;
		margin-bottom: 20px;
	}
	
	#nav-list {
		ul {
			width: 100%;
		}
		li {
			color: $globalFtColor;
			width: 100%;
			height: 50px;
			line-height: 50px;
			text-align: left;
			font-size: $itemFontSize;
			border-top: $itemBorder;
			cursor: pointer;
			transition: background 0.3s ease;
			i {
				margin-left: 20%;
			}

			&:last-child {
				border-bottom: $itemBorder;
			}
			&:hover {
				background: $itemHoverColor;
			}
		}
		.nav-item {
			margin-left: 10px;
		}
		.nav-active {
			background: $itemHoverColor;
		}
	}

	#sns-bar {
		color: $globalFtColor;
		width: 100%;
		font-size: 18px;
		position: absolute;
		bottom: 20px;
		i {
			margin-left: 5px;
		}
	}
</style>

<script>
	import '../style/iconfont.css';
	import '../style/_reset.scss';
	import cube from './cube';
	import avatar from './avatar';
	export default {
		data() {
			return {
				logoName: 'avatar'
			};
		},
		beforeMount() {
			this.logoName = this.$route.name === 'about' ? 'avatar' : 'cube';
		},
		watch: {
			'$route'(to, from) {
				this.logoName = to.name === 'about' ? 'avatar' : 'cube';
			}
		},
		props: {
			title: {
				type: String,
				required: true
			},
			subTitle: {
				type: String
			},
			logo: {
				type: Object
			},
			navList: {
				type: Array,
				required: true
			}
		},
		components: {
			cube,
			avatar
		}
	};
</script>