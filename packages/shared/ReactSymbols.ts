//
/**
1. 为什么取名 ReactSymbols ？为了防止别人滥用 ReactElement 我们需要将其定义成一个 独一无二的值
2. 需要判断当前的宿主环境支不支持 Symbol
*/

const supportSymbol = typeof Symbol === 'function' && Symbol.for;

export const REACT_ELEMENT_TYPE = supportSymbol
	? Symbol.for('react.element')
	: 0xeac7;
