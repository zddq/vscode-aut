export interface IFileConfig {
  [key: string]: IFileConfigKeyValue;
}

export interface IFileConfigKeyValue {
  /** 图标路径 */
  iconPath: string;
  /** 文件名图标配置 */
  fileNames: string[];
  /** 文件扩展名对应图标配置 */
  fileExtensions: string[];
  /** 将语言与图标相关联。对象键是语言贡献点中定义的语言 ID */
  languageIds: string[];
}

export interface IFolderConfigData {
  [k: string]: IFolderConfigValue;
}

interface IFolderConfigValue {
  /** 图标路径 */
  iconPath: string;
  /** 文件夹图标配置 */
  folderNames: string[];
  /** 文件夹打开状态下图标配置 */
  folderNamesExpanded: string[];
}

export interface IDefaultVsIconThemeConfig {
  file: "file";
  folder: "folder";
  folderExpanded: "folder-open";
  rootFolder: "folder-root";
  rootFolderExpanded: "folder-root-open";
  hidesExplorerArrows: false;
}
