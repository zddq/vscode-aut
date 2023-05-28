/**
 * @name vscode-icon-theme-json配置
 */
export interface IVsAutIconThemeJsonConfig {
  iconDefinitions: IIconDefinitions;

  fileNames: Record<string, string>;
  fileExtensions: Record<string, string>;

  folderNames: Record<string, string>;
  folderNamesExpanded: Record<string, string>;

  file: string;
  folder: string;
  folderExpanded: string;
  rootFolder: string;
  rootFolderExpanded: string;
  languageIds: Record<string, string>;
  /** 配置文件资源管理器的箭头是否应在此主题启用时隐藏。 */
  hidesExplorerArrows: boolean;
  light?: {
    fileNames: Record<string, string>;
    fileExtensions: Record<string, string>;
    folderNames: Record<string, string>;
    folderNamesExpanded: Record<string, string>;
  };
  /** 高对比度颜色主题中文件图标的可选关联。 */
  highContrast?: {
    fileExtensions: {};
    fileNames: {};
  };
}

/**
 * @name 将文件与图标关联时可使用的所有图标的说明
 */
export interface IIconDefinitions {
  [key: string]: IIconDefinitionsValue;
}

/** @name iconDefinitionsValue 可选值 */
export interface IIconDefinitionsValue {
  /** 使用 SVG 或 PNG 时: 到图像的路径。该路径相对于图标设置文件。 */
  iconPath: string;
  /** 使用某种字体时: 字体的 ID。如果未设置，则默认为第一个字体定义。 */
  fontId?: string;
  /**
   * 使用某种字体时: 文本字体的字体大小(以百分比表示)。如果未设置，则默认为字体定义中的大小。
   * @description 字符串与 "^([\w .%_-]+)$" 的模式不匹配。
   */
  fontSize?: string;
  /**
   * 使用字形字体时: 要使用的颜色。
   * @description 颜色格式无效。请使用 #RGB、#RGBA、#RRGGBB 或 #RRGGBBAA。
   */
  fontColor?: string;
  /** 使用字形字体时: 要使用的字体中的字符。 */
  fontCharacter?: string;
}
