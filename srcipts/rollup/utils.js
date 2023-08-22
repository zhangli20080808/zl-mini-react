import path from 'path';
import fs from 'fs';

import ts from 'rollup-plugin-typescript2';
import cjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';

// 包路径
const pkgPath = path.resolve(__dirname, '../../packages');
// 打包产物路径
const distPath = path.resolve(__dirname, '../../dist/node_modules');

/**
 * 处理包路径，一般分两种，源码路径，打包后的路径
 * @param {*} pkgName
 * @param {*} isDist 当前是否是打包后的路径
 * @returns
 */
export function resolvePkgPath(pkgName, isDist) {
	if (isDist) {
		return `${distPath}/${pkgName}`;
	}
	return `${pkgPath}/${pkgName}`;
}

/**
 * 处理 package.json包的路径
 * @param {*} pkgName
 * @returns
 */
export function getPackageJSON(pkgName) {
	// ...包路径
	const path = `${resolvePkgPath(pkgName)}/package.json`;
	const str = fs.readFileSync(path, { encoding: 'utf-8' });
	return JSON.parse(str);
}

export function getBaseRollupPlugins({
	alias = {
		__DEV__: true,
		preventAssignment: true
	},
	typescript = {}
} = {}) {
	return [replace(alias), cjs(), ts(typescript)];
}
