/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2015 - 2026 Palmshed. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import type { CancellationToken, Uri } from 'vscode';

import { createServiceIdentifier } from '../../../util/common/services';

export const IMergeConflictService = createServiceIdentifier<IMergeConflictService>('IMergeConflictService');

export interface IMergeConflictService {

	readonly _serviceBrand: undefined;

	resolveMergeConflicts(documents: Uri[], cancellationToken: CancellationToken | undefined): Promise<void>;
}
