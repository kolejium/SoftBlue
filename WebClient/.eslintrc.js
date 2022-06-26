module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'standard'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: [
		'react',
		'@typescript-eslint'
	],
	rules: {
		semi: [0, 'always'],
		indent: ['error', 'tab', {
			SwitchCase: 1
		}],
		'array-callback-return': [0, { allowImplicit: false }],
		'no-tabs': [0, 'always'],
		'no-return-assign': [0, 'always'],
		'no-multiple-empty-lines': [1, { max: 2, maxEOF: 0 }],
		'react/jsx-uses-react': 'off',
		'react/react-in-jsx-scope': 'off',
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': [0],
		'no-empty-function': 'off',
		'@typescript-eslint/no-empty-function': [1]
	},
	globals: {
		React: true,
		JSX: true
	}
};
