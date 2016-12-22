import marked from 'marked';
import Promise from 'bluebird';

let instance = null;

function MarkdownParser() {
	if (instance) {
		return instance;
	}
	let self = this instanceof MarkdownParser ? this : Object.create(MarkdownParser.prototype);
	instance = self;
	if (typeof self.parse != 'function') {
		MarkdownParser.prototype.parse = function (str) {
			return new Promise((resolve, reject) => {
				marked(str, (err, content) => {
					if (err) {
						reject(err);
					} else {
						resolve(content);
					}
				});
			});
		};
	}
	return self;
}

MarkdownParser.config = function (opts) {
	marked.setOptions(opts);
};

export default MarkdownParser;
