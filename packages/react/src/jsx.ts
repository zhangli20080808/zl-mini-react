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

export const jsx = (type, config) => {};
