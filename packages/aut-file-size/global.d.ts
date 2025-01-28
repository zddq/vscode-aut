import type { StatusBarItem, Disposable } from "vscode";

export {};

/**
 * VSCode文件大小信息插件所需数据结构
 */
declare global {
  interface IFileSizeEventCollection {
    statusBar: StatusBarItem;
    saveTextDocument: Disposable;
    changeActiveTextEditor: Disposable;
    changeConfiguration: Disposable;
    [key: string]: any;
  }
}
