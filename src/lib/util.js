export default {
	range(start, count) {
		return Array.from({length: count}, (v, k) => k)
			.map((v, k) => v + start);
	},
	debounce(fn, delay) {
		let timer = null;
		return function () {
			let ctx = this;
			let args = arguments;
			if (timer) {
				clearTimeout(timer);
				timer = setTimeout(function () {
					timer = null;
					fn.apply(ctx, args);
				}, delay);
				return false;
			}
			timer = setTimeout(function () {
				timer = null;
				fn.apply(ctx, args);
			}, delay);
		};
	}
};