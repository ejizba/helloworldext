'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as archiver from 'archiver';
import * as fse from 'fs-extra';
import { glob as globGitignore } from 'glob-gitignore';
import * as os from 'os';
import * as path from 'path';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "helloworld" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', async () => {
        try {
            await zipDirectory(vscode.workspace.workspaceFolders![0].uri.fsPath);
        } catch (error) {
            vscode.window.showErrorMessage(error.message);
        }
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

async function zipDirectory(folderPath: string): Promise<string> {
    const gitignoreName: string = '.funcignore';

    let ignore: string[] = [];
    const gitignorePath: string = path.join(folderPath, gitignoreName);
    if (await fse.pathExists(gitignorePath)) {
        const funcIgnoreContents: string = (await fse.readFile(gitignorePath)).toString();
        ignore = funcIgnoreContents.split('\n').map(l => l.trim());
    }

    // tslint:disable-next-line:no-unsafe-any
    const paths: string[] = await globGitignore('**/*', { cwd: folderPath, dot: true, ignore });

    const zipFilePath: string = path.join(os.tmpdir(), 'test.zip');

    await new Promise(async (resolve: () => void, reject: (err: Error) => void): Promise<void> => {
        const zipOutput: fse.WriteStream = fse.createWriteStream(zipFilePath);
        zipOutput.on('close', resolve);

        const zipper: archiver.Archiver = archiver('zip', { zlib: { level: 9 } });

        for (const p of paths) {
            zipper.file(path.join(folderPath, p), { name: p });
        }

        zipper.on('error', reject);
        zipper.pipe(zipOutput);
        void zipper.finalize();
    });

    return zipFilePath;
}
