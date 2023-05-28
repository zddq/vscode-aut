import vscode from 'vscode';
import fs from 'node:fs';

/**
 * @name 转换获取的文件大小
 * @param size 文件大小(单位: b)
 * @return 格式化后的字符文件大小信息
 */
function sizeConvert(size: number) {
  if (size >= 1073741824) {
    return `🌹 ${Math.floor(size / 1073741824)} GB`;
  }

  if (size >= 1048576) {
    return `🌹 ${Math.floor(size / 1048576)} MB`;
  }

  if (size >= 1024) {
    return `🌹 ${Math.floor(size / 1024)} KB`;
  }

  return `🌹 ${size} B`;
}

export const TOOLS = { sizeConvert };
