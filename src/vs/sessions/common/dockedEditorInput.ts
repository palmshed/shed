/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2015 - 2026 Palmshed. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { EditorInput } from '../../workbench/common/editor/editorInput.js';

/**
 * Base class for Agents window editors whose content is surfaced in the docked
 * detail panel (the managed Changes and Files tabs) rather than the main editor
 * area. In the single-pane (docked details) layout, re-activating such an editor
 * must not reveal the hidden editor area — {@link SinglePaneWorkbench} handles that.
 */
export abstract class DockedEditorInput extends EditorInput { }
