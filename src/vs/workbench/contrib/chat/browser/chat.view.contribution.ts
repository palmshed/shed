/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2015 - 2026 Palmshed. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { WorkbenchPhase, registerWorkbenchContribution2 } from '../../../common/contributions.js';
import { AgentPluginsViewsContribution } from './agentPluginsView.js';

registerWorkbenchContribution2(AgentPluginsViewsContribution.ID, AgentPluginsViewsContribution, WorkbenchPhase.AfterRestored);
