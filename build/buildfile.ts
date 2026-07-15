/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2015 - 2026 Palmshed. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import type { IEntryPoint } from './lib/bundle.ts';

function createModuleDescription(name: string): IEntryPoint {
	return {
		name
	};
}

export const workerEditor = createModuleDescription('vs/editor/common/services/editorWebWorkerMain');
export const workerExtensionHost = createModuleDescription('vs/workbench/api/worker/extensionHostWorkerMain');
export const workerNotebook = createModuleDescription('vs/workbench/contrib/notebook/common/services/notebookWebWorkerMain');
export const workerLanguageDetection = createModuleDescription('vs/workbench/services/languageDetection/browser/languageDetectionWebWorkerMain');
export const workerLocalFileSearch = createModuleDescription('vs/workbench/services/search/worker/localFileSearchMain');
export const workerProfileAnalysis = createModuleDescription('vs/platform/profiling/electron-browser/profileAnalysisWorkerMain');
export const workerOutputLinks = createModuleDescription('vs/workbench/contrib/output/common/outputLinkComputerMain');
export const workerBackgroundTokenization = createModuleDescription('vs/workbench/services/textMate/browser/backgroundTokenization/worker/textMateTokenizationWorker.workerMain');

export const workbenchDesktop = [
	createModuleDescription('vs/workbench/contrib/debug/node/telemetryApp'),
	createModuleDescription('vs/platform/files/node/watcher/watcherMain'),
	createModuleDescription('vs/platform/terminal/node/ptyHostMain'),
	createModuleDescription('vs/platform/agentHost/node/agentHostMain'),
	createModuleDescription('vs/platform/agentHost/node/diffWorkerMain'),
	createModuleDescription('vs/workbench/api/node/extensionHostProcess'),
	createModuleDescription('vs/workbench/workbench.desktop.main'),
	createModuleDescription('vs/sessions/sessions.desktop.main')
];

export const workbenchWeb = createModuleDescription('vs/workbench/workbench.web.main.internal');

export const sessionsWeb = createModuleDescription('vs/sessions/sessions.web.main.internal');

export const keyboardMaps = [
	createModuleDescription('vs/workbench/services/keybinding/browser/keyboardLayouts/layout.contribution.linux'),
	createModuleDescription('vs/workbench/services/keybinding/browser/keyboardLayouts/layout.contribution.darwin'),
	createModuleDescription('vs/workbench/services/keybinding/browser/keyboardLayouts/layout.contribution.win')
];

export const code = [
	// 'vs/shed/electron-main/main' is not included here because it comes in via ./src/main.js
	// 'vs/shed/node/cli' is not included here because it comes in via ./src/cli.js
	createModuleDescription('vs/shed/node/cliProcessMain'),
	createModuleDescription('vs/shed/electron-utility/sharedProcess/sharedProcessMain'),
	createModuleDescription('vs/shed/electron-browser/workbench/workbench'),
	createModuleDescription('vs/sessions/electron-browser/sessions'),
];

export const codeWeb = createModuleDescription('vs/shed/browser/workbench/workbench');

export const codeServer = [
	// 'vs/server/node/server.main' is not included here because it gets inlined via ./src/server-main.js
	// 'vs/server/node/server.cli' is not included here because it gets inlined via ./src/server-cli.js
	createModuleDescription('vs/workbench/api/node/extensionHostProcess'),
	createModuleDescription('vs/platform/files/node/watcher/watcherMain'),
	createModuleDescription('vs/platform/terminal/node/ptyHostMain'),
	createModuleDescription('vs/platform/agentHost/node/agentHostMain'),
	createModuleDescription('vs/platform/agentHost/node/diffWorkerMain'),
];

export const entrypoint = createModuleDescription;

const buildfile = {
	workerEditor,
	workerExtensionHost,
	workerNotebook,
	workerLanguageDetection,
	workerLocalFileSearch,
	workerProfileAnalysis,
	workerOutputLinks,
	workerBackgroundTokenization,
	workbenchDesktop,
	workbenchWeb,
	sessionsWeb,
	keyboardMaps,
	code,
	codeWeb,
	codeServer,
	entrypoint: createModuleDescription
};

export default buildfile;
