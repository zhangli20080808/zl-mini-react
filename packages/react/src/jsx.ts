// ReactElement
const ReactElement = function (type, key, ref, props) {
	//
	const element = {
		// 如何区分这种数据类型是个 ReactElement 呢，通过 typeof 内部字段来 指明当前这个数据结构是个 ReactElement
		$$typeof: 'xxx',
		key,
		ref,
		props,
		__mark: 'zl' // 为了将我们实现的 ReactElement 和原生实现区分开，我们定义  __mark 字段
	};
	return element;
};
