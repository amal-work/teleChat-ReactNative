module.exports = {
	presets: [
		['module:metro-react-native-babel-preset', {
            unstable_disableES6Transforms: true
        }],
		'module:react-native-dotenv',
	],
	plugins: [
		'@babel/plugin-proposal-optional-chaining',
		'@babel/plugin-proposal-nullish-coalescing-operator',
		[
			'module-resolver',
			{
				root: ['./src'],
				extensions: ['.ts', '.tsx', '.android.tsx', '.ios.tsx'],
				alias: {
					app: './src/app',
					components: './src/components',
					consts: './src/consts',
					environment: './src/environment',
					helpers: './src/helpers',
					hooks: './src/hooks',
					screens: './src/screens',
					types: './src/types',
				},
			},
		],
	],
};
