'use strict';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand('extension.sayHello', async () => {
        await vscode.window.showQuickPick([{label: 'Pick me'}], {});
        await vscode.window.showWarningMessage('I warn you', { modal: true}, 'Yes');
    }));
}

export function deactivate() {
}