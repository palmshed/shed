/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2015 - 2026 Palmshed. All rights reserved.
 *--------------------------------------------------------------------------------------------*/

function f() {
	const controller = {};
	const initialControllerProperties = {};
	for (const k in controller) {
		if (controller.hasOwnProperty(k)) {
			initialControllerProperties[k] = controller[k];
		}
	}
}
