// ReactElement
import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import {
	Type,
	Key,
	Ref,
	Props,
	ReactElementType,
	ElementType
} from 'shared/ReactTypes';

const ReactElement = function (
	type: Type,
	key: Key,
	ref: Ref,
	props: Props
): ReactElementType {
	const element = {
		// 如何区分这种数据类型是个 ReactElement 呢，通过 typeof 内部字段来 指明当前这个数据结构是个 ReactElement
		$$typeof: REACT_ELEMENT_TYPE,
		type,
		key,
		ref,
		props,
		__mark: 'zl' // 为了将我们实现的 ReactElement 和原生实现区分开，我们定义  __mark 字段
	};
	return element;
};

export const jsx = (type: ElementType, config: any, ...maybeChildren: any) => {
	let key: Key = null;
	const props: Props = {};
	let ref: Ref = null;

	for (const prop in config) {
		const val = config[prop];
		// 属性中存在key，且值存在，转化为 字符串
		if (prop === 'key') {
			if (val !== undefined) {
				key = '' + val;
			}
			continue;
		}
		if (prop === 'ref') {
			if (val !== undefined) {
				ref = val;
			}
			continue;
		}
		// 不拷贝原型上的属性
		if (Object.prototype.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}
		const maybeChildrenLength = maybeChildren.length;
		// children 有两种情况  child  [child,child,child]
		if (maybeChildrenLength) {
			if (maybeChildrenLength === 1) {
				props.children = maybeChildren[0];
			} else {
				props.children = maybeChildren;
			}
		}
		return ReactElement(type, key, ref, props);
	}
};

// 此处表示生产环节和开发环境 用同一个jsx方法，真实的react中是不同的实现，因为在开发环境可以多做一些额外的检查
export const jsxDev = jsx;
