import { TreeDataProvider, EventEmitter, Event, TreeItemCollapsibleState } from "vscode";

export class HelloWorldTree implements TreeDataProvider<Node> {
    _onDidChangeTreeData: EventEmitter<Node> = new EventEmitter<Node>();
    onDidChangeTreeData?: Event<Node | null | undefined> = this._onDidChangeTreeData.event;

    getTreeItem(element: Node): Node | Thenable<Node> {
        return element;
    }

    async getChildren(element?: Node | undefined): Promise<Node[]> {
        if (element) {
            return await element.getChildren();
        } else {
            return [new Node('1')];
        }
    }
}

class Node {
    constructor(public id: string) { }

    get label(): string {
        return this.id;
    }

    get collapsibleState() {
        return TreeItemCollapsibleState.Expanded;
    }

    async getChildren(): Promise<Node[]> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (this.id === '1') {
            return [new Node('2')];
        } else if (this.id === '2') {
            return [new Node('3')];
        } else {
            return [];
        }
    }
}