'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as os from 'os';
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "helloworld" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        vscode.window.showInformationMessage(`remoteName: "${vscode.env.remoteName}"`);

        const extension = vscode.extensions.getExtension('test.helloworld');
        if (extension) {
            vscode.window.showInformationMessage(`extensionKind: "${extension.extensionKind}"`);
        }

        let terminalOptions: vscode.TerminalOptions = {};
        terminalOptions.name = 'todo1';
        vscode.window.createTerminal(terminalOptions);

        terminalOptions.name = 'todo2';
        terminalOptions.cwd = vscode.Uri.file(os.homedir());
        vscode.window.createTerminal(terminalOptions);
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}