const tailwind = require('tailwindcss');

const config = {
	dir: _ => {
		try {
			return process.cwd();
		} catch (_) {
			return __dirname;
		}
	},
	paths: (options = {config: 'tailwind.config.js', styles: 'styles.json'}) => {
		try {
			const configPath = require(`${config.dir()}/postcss.config.js`);
			options = Object.assign(options, configPath.plugins.tailwindcss);
		} catch (_) {}

		return options;
	},
	getFilePath: name => {
		console.log('getFilePath', config);
		return `${config.dir()}/${config.paths()[name]}`;
	},
	getTailwind: () => {
		try {
			return tailwind(config.getFilePath('config'));
		} catch (_) {
			return tailwind;
		}
	}
};

module.exports = config;