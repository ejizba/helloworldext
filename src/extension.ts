'use strict';

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const tree = new HelloWorldTree();
    context.subscriptions.push(vscode.commands.registerCommand('extension.incrementAndRefresh', async (node: Node) => {
        node.counter += 1;
        tree._onDidChangeTreeData.fire(node);
    }));

    context.subscriptions.push(vscode.commands.registerCommand('extension.refreshWholeTree', async (node: Node) => {
        tree._onDidChangeTreeData.fire();
    }));

    context.subscriptions.push(vscode.window.registerTreeDataProvider('helloworldtree1', tree));
}

export function deactivate() {
}

class HelloWorldTree implements vscode.TreeDataProvider<Node> {
    _onDidChangeTreeData: vscode.EventEmitter<Node> = new vscode.EventEmitter<Node>();
    onDidChangeTreeData: vscode.Event<Node> = this._onDidChangeTreeData.event;

    node1: Node = new Node('1');

    getTreeItem(element: Node): vscode.TreeItem {
        return element;
    }

    async getChildren(element?: Node | undefined): Promise<Node[]> {
        return [this.node1];
    }
}

class Node implements vscode.TreeItem {
    public counter: number = 0;

    constructor(public id: string) { }

    get label(): string {
        return this.counter.toString();
    }
}