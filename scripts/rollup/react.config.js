import { getPackageJSON, resolvePkgPath, getBaseRollupPlugins } from './utils';
// import generatePackageJson from 'rollup-plugin-generate-package-json';
const { name, module } = getPackageJSON('react');
// react包的路径
const pkgPath = resolvePkgPath(name);
// react产物路径
const pkgDistPath = resolvePkgPath(name, true);

console.log(pkgPath, pkgDistPath);
export default [
	{
		input: `${pkgPath}/${module}`,
		output: {
			file: `${pkgDistPath}/index.js`,
			name: 'index.js',
			format: 'umd' // 兼容 commonjs 和 es module 的格式
		},
		// plugins: [
		// 	...getBaseRollupPlugins()
		// 	// generatePackageJson({
		// 	// 	inputFolder: pkgPath,
		// 	// 	outputFolder: pkgDistPath,
		// 	// 	baseContents: ({ name, description, version }) => ({
		// 	// 		name,
		// 	// 		description,
		// 	// 		version,
		// 	// 		main: 'index.js'
		// 	// 	})
		// 	// })
		// ]
		plugins: getBaseRollupPlugins()
	}
];
