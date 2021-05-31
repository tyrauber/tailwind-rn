#!/usr/bin/env node
'use strict';
const fs = require('fs');
const meow = require('meow');
const postcss = require('postcss');
//const tailwind = require('tailwindcss');
const build = require('./build');
const config = require('./config');

meow(`
	Usage
	  $ create-tailwind-rn
`);

const source = `
@tailwind components;
@tailwind utilities;
`;

console.log(config)
postcss([config.getTailwind()])
	.process(source, {from: undefined})
	.then(({css}) => {
		const styles = build(css);
		fs.writeFileSync(config.getFilePath('styles'), JSON.stringify(styles, null, '\t'));
	})
	.catch(error => {
		console.error('> Error occurred while generating styles');
		console.error(error.stack);
		process.exit(1);
	});
