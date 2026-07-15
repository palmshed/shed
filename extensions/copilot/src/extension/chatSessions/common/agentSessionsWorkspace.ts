/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2015 - 2026 Palmshed. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { createServiceIdentifier } from '../../../util/common/services';

export const IAgentSessionsWorkspace = createServiceIdentifier<IAgentSessionsWorkspace>('IAgentSessionsWorkspace');

export interface IAgentSessionsWorkspace {
	readonly _serviceBrand: undefined;
	readonly isAgentSessionsWorkspace: boolean;
}
