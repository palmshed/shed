/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2015 - 2026 Palmshed. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export interface IClickTarget {
	type: ClickTargetType;
	event: MouseEvent;
}

export const enum ClickTargetType {
	Container = 0,
	ContributedTextItem = 1,
	ContributedCommandItem = 2
}
