import { TreeDataProvider, TreeItem, Event, ProviderResult } from "vscode";

export class HelloWorldTree implements TreeDataProvider<TreeItem> {
    onDidChangeTreeData?: Event<TreeItem | null | undefined> | undefined;

    getTreeItem(element: TreeItem): TreeItem | Thenable<TreeItem> {
        return element;
    }
    
    getChildren(element?: TreeItem | undefined): ProviderResult<TreeItem[]> {
        return [{
            label: "Hello World"
        }];
    }
}