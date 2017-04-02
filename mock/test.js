function demo(opts) {
	return async (ctx, next) => {
		console.log(ctx.request.body);
		console.log(ctx.params.id);
		console.log(ctx.request.query.name);
		let data = await new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve({
					msg: 'Hello'
				});
			}, 5000);
		});
		ctx.body = data;
	};
}

module.exports = {
	'post /wait/:id': demo()
};