import vscode from 'vscode';
import fs from 'node:fs';

import { IFileSizeEventCollection } from './types';
import { TOOLS } from './utils';

const { workspace, window } = vscode;

/** 收集状态栏事件信息 */
const eventCollection: IFileSizeEventCollection = {
  changeActiveTextEditor: new vscode.Disposable(() => {}),
  changeConfiguration: new vscode.Disposable(() => {}),
  saveTextDocument: new vscode.Disposable(() => {}),
  statusBar: window.createStatusBarItem(),
};

/** @name 获取状态栏信息 */
function getStatusBar() {
  const configuration = workspace.getConfiguration('aut-file-size');
  eventCollection.statusBar = window.createStatusBarItem(configuration.get('position') === 'left' ? vscode.StatusBarAlignment.Left : vscode.StatusBarAlignment.Right, configuration.get('priority'));
  eventCollection.statusBar.show();
}

/**
 * @name 获取文件信息
 * @param {import('vscode').TextDocument} doc
 */
function updateSize(doc: vscode.TextDocument) {
  const size = fs.statSync(doc.fileName).size;
  const sizeMan = TOOLS.sizeConvert(size);
  eventCollection.statusBar.text = sizeMan;
}

export function activate(context: vscode.ExtensionContext) {
  getStatusBar();
  const activeTextEditor = window.activeTextEditor;
  activeTextEditor && updateSize(activeTextEditor.document);

  // 切换 vscode 文本编辑器窗口时触发
  eventCollection.changeActiveTextEditor = window.onDidChangeActiveTextEditor((textEditor) => {
    if (!textEditor) {
      eventCollection.statusBar.text = '';
      return;
    }

    updateSize(textEditor.document);
  });

  // 当前工作空间 更新 vscode 配置信息时执行(这个比其它的都先触发)
  eventCollection.changeConfiguration = workspace.onDidChangeConfiguration(() => {
    eventCollection.statusBar.dispose();
    getStatusBar();
    const activeTextEditor = window.activeTextEditor;
    activeTextEditor && updateSize(activeTextEditor.document);
  });

  // 当前工作空间 保存文档时执行
  eventCollection.saveTextDocument = workspace.onDidSaveTextDocument((doc) => {
    const activeTextEditor = window.activeTextEditor;
    if (activeTextEditor?.document.fileName !== doc.fileName) return;

    updateSize(activeTextEditor.document);
  });
}

// This method is called when your extension is deactivated
export function deactivate() {
  eventCollection.changeActiveTextEditor?.dispose();
  eventCollection.changeConfiguration?.dispose();
  eventCollection.saveTextDocument?.dispose();
  eventCollection.statusBar.dispose();
}
