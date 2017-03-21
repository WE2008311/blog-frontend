<template>
<div class="mkd-editor">
	<div class="edit-area">
		<textarea id="mde-editor"></textarea>
	</div>
	<div class="preview">
		<header>
			<span v-text="title"></span>
		</header>
		<div class="content mkd-content" v-html="htmlText"></div>
	</div>
</div>
</template>

<style lang="sass">
	@import '../style/common';
	@import '../style/markdown';
	.mkd-editor {
		display: flex;
		flex-direction: row;
	}
	.edit-area {
		flex-basis: 0;
		flex-grow: 1;
	}
	.preview {
		margin-left: 30px;
		flex-basis: 0;
		flex-grow: 1;
		header {
			width: 100%;
			height: 50px;
			line-height: 50px;
			text-align: center;
			border-bottom: 2px solid rgba($color: $pColor, $alpha: 0.3);
			span {
				color: $globalBgColor;
				font-size: 32px;
			}
		}
		.content {
			margin-top: 20px;
			padding: 0 10px;
		}
	}
</style>

<script>
	import '../style/_reset.scss';
	// 自己从cdn扣下来的字体样式
	import '../style/font-awesome.min.css';
	import 'simplemde/dist/simplemde.min.css';
	import SimpleMde from 'simplemde';
	import util from '../lib/util';
	import MarkdownParser from '../lib/markdown-parser';
	
	const parser = new MarkdownParser();

	export default {
		data() {
			return {
				simplemde: null,
				htmlText: ''
			};
		},
		props: ['title', 'content'],
		watch: {
			content(val) {
				// 可能存在一种情况是simplemde还未实例化，响应已经返回，触发content变更
				if (this.simplemde) {
					this.simplemde.value(val);
				}
			}
		},
		mounted() {
			this.simplemde = new SimpleMde({
				element: document.getElementById('mde-editor'),
				// 防止从cdn下载字体
				autoDownloadFontAwesome: false,
				spellChecker: false
			});
			let mde = this.simplemde;
			mde.codemirror.on('change', util.debounce(() => {
				parser.parse(mde.value()).then(text => this.htmlText = text);
			}, 700));
			// 假如响应返回先于simplemde实例化，则在这里设置simplemde的值
			mde.value(this.content);
		}
	};
</script>