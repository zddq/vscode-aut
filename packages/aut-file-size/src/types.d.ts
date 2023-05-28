import * as vscode from 'vscode';

/**
 * @name VSCode文件大小信息插件所需数据结构
 */
interface IFileSizeEventCollection {
  statusBar: vscode.StatusBarItem;
  saveTextDocument: vscode.Disposable;
  changeActiveTextEditor: vscode.Disposable;
  changeConfiguration: vscode.Disposable;
  [key: string]: any;
}
