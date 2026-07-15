/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2015 - 2026 Palmshed. All rights reserved.
 *--------------------------------------------------------------------------------------------*/
function foo() {
	console.log('foo');
}

function bar() {
	console.log('bar');
}

function qux() {  // this function doesn't get included in prompt context
	console.log('qux');
}

function baz() {
	foo();
	bar();
}
