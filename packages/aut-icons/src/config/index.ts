import { IDefaultVsIconThemeConfig } from "./type";

export { fileConfig } from "./file";
export { folderConfig } from "./folder";
export const initOtherVsIconThemeConfig: IDefaultVsIconThemeConfig = {
  file: "file",
  folder: "folder",
  folderExpanded: "folder-open",
  rootFolder: "folder-root",
  rootFolderExpanded: "folder-root-open",
  hidesExplorerArrows: false,
};
