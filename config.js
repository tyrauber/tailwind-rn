const tailwind = require('tailwindcss');
const path = require('path');

const config = {
  paths: (options = {config: 'tailwind.config.js', styles: 'styles.json'}) => {
    try {
      const configPath = config.getFilePath(`./postcss.config.js`);
      options = Object.assign(options, configPath.plugins.tailwindcss);
    } catch (_) {}

    return options;
	},
  getFilePath: name => {
    const filePath = path.join(__dirname,config.paths()[name]);
    console.log('getFilePath', filePath);
    return filePath;
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