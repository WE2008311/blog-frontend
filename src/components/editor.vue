<template>
<div class="mkd-editor">
	<div class="edit-area">
		<textarea id="mde-editor"></textarea>
	</div>
	<div class="preview">
		<header>title</header>
		<div class="content">aaaaaa</div>
	</div>
</div>
</template>

<style lang="sass">
	@import '../style/common';
	.mkd-editor {
		display: flex;
		flex-direction: row;
	}
	.edit-area {
		flex-basis: 0;
		flex-grow: 1;
	}
	.preview {
		flex-basis: 0;
		flex-grow: 1;
	}
</style>

<script>
	import '../style/_reset.scss';
	// 自己从cdn扣下来的字体样式
	import '../style/font-awesome.min.css';
	import 'simplemde/dist/simplemde.min.css';
	import SimpleMde from 'simplemde';

	export default {
		data() {
			return {
				simplemde: null
			};
		},
		mounted() {
			this.simplemde = new SimpleMde({
				element: document.getElementById('mde-editor'),
				// 防止从cdn下载字体
				autoDownloadFontAwesome: false,
				spellChecker: false
			});
		}
	};
</script>