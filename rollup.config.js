import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import globals from 'rollup-plugin-node-globals';

export default {
  input: 'src/home/index.js',
  output: {
    file: 'build/js/index.min.js',
    format: 'iife',
    sourcemap: 'inline',
  },
	plugins: [
		resolve({
      browser: true,
			module: true,
			jsnext: true,
			main: true,
			modulesOnly: false,
    }),
    commonjs(),
    globals(),
  ]
};