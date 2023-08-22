import path from 'path';
import fs from 'fs';

import ts from 'rollup-plugin-typescript2';
import cjs from '@rollup/plugin-commonjs';
// import replace from '@rollup/plugin-replace';

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
 * 处理 package.json包的路径，通过传入包名获取，对应包名的 package.json的内容
 * @param {*} pkgName
 * @returns
 */
export function getPackageJSON(pkgName) {
	// ...包路径
	const path = `${resolvePkgPath(pkgName)}/package.json`;
	// 读取成字符串，并且解析 序列化
	const str = fs.readFileSync(path, { encoding: 'utf-8' });
	return JSON.parse(str);
}

/**
 * 获取所有基础的 plugin
 * 1. 需要获取解析 commonjs 规范的 plugin -> pnpm i @rollup/plugin-commonjs -D -w
 * @param {*} param0
 * 2. 需要获取将 ts 代码 转义 成 js 代码的 typescript plugin  -> pnpm i rollup-plugin-typescript2 -D -w
 * @param {*} param0
 * @returns
 */
export function getBaseRollupPlugins({
	alias = {
		__DEV__: true,
		preventAssignment: true
	},
	typescript = {}
} = {}) {
	return [cjs(), ts(typescript)];
}
