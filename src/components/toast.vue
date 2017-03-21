<template>
<transition name="fade">
	<div class="toast" v-show="showToast">
		{{content}}
		<i class="icon-cross" @click="close"></i>
	</div>
</transition>
</template>

<style lang="sass" scoped>
	@import '../style/common';
	.fade-enter, .fade-leave-to {
		opacity: 0;
	}
	.toast {
		color: #fff;
		line-height: 1.4em;
		font-size: 14px;
		text-align: center;
		max-width: 160px;
		min-width: 80px;
		padding: 12px 18px;
		background: rgba($color: #000, $alpha: 0.6);
		border-radius: 6px;
		box-shadow: 0 0 2px rgba($color: #000, $alpha: 0.7);
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		transition: opacity 0.3s ease;
		z-index: 30;
		.icon-cross {
			color: #fff;
			cursor: pointer;
			font-size: 10px;
			position: absolute;
			top: 5px;
			right: 5px;
		}
	}
</style>

<script>
	import '../style/_reset.scss';
	import '../style/iconfont.css';
	export default {
		data() {
			return {
				showToast: this.show
			};
		},
		methods: {
			close() {
				this.showToast = false;
				this.$emit( 'close');
			}
		},
		watch: {
			show(val) {
				this.showToast = val && setTimeout(() => (this.showToast = false) || this.$emit(
					'close'), 3000);
			}
		},
		props: {
			show: {
				default: false
			},
			content: {
				default: ''
			}
		}
	};
</script>