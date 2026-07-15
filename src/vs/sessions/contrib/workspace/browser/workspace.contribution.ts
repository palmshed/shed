/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2015 - 2026 Palmshed. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { registerWorkbenchContribution2, WorkbenchPhase } from '../../../../workbench/common/contributions.js';
import { WorkspaceFolderManagementContribution } from './workspaceFolderManagement.js';

registerWorkbenchContribution2(WorkspaceFolderManagementContribution.ID, WorkspaceFolderManagementContribution, WorkbenchPhase.AfterRestored);
