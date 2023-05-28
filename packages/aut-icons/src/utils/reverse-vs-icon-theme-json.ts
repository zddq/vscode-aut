import * as fs from "node:fs";

import type { IFileConfig, IFolderConfigValue } from "../config/type";
import { IVsAutIconThemeJsonConfig } from "../global";

/**
 * @name 反序列化文件图标主题配置文件
 * @param filePath 路径地址
 */
export function reverseVsIconThemeJsonFile(filePath: string, filename: string) {
  try {
    const jsonFileData = fs.readFileSync(filePath, { encoding: "utf-8" });
    const parseData = JSON.parse(String(jsonFileData)) as unknown as IVsAutIconThemeJsonConfig;
    console.log(`total file and folder icon variable number: ${Object.keys(parseData.iconDefinitions).length}`);
    generateFileIconConfigJsonFile(parseData, filename);
    generateFolderIconConfigJsonFile(parseData, filename);
  } catch (error) {
    console.error(error);
  }
}

function generateFileIconConfigJsonFile(parseData: IVsAutIconThemeJsonConfig, name: string) {
  const fileConfigData = getFileConfigInfo(parseData);
  console.log(`File Icon Number: ${Object.keys(fileConfigData).length}`);
  console.log("generate file icon config json file...");
  fs.writeFile(`./dist/${name}-file.json`, JSON.stringify(fileConfigData, null, 2), (err) => {
    if (err) {
      console.error(err);
    }
    console.log("generate file icon config json file done =-=");
  });

  function getFileConfigInfo(jsonConfig: IVsAutIconThemeJsonConfig) {
    const result: IFileConfig = {};
    const { iconDefinitions, fileNames: FN, fileExtensions: FE, languageIds: L } = jsonConfig;
    const fileKeys = Object.keys(iconDefinitions).filter((key) => !key.startsWith("folder"));
    fileKeys.forEach((key) => {
      const iconPath = iconDefinitions[key].iconPath;
      const fileNames = getIconKeyArrInfo(FN, key);
      const fileExtensions = getIconKeyArrInfo(FE, key);
      const languageIds = getIconKeyArrInfo(L, key);
      result[key] = { iconPath, fileNames, fileExtensions, languageIds };
    });
    return result;
  }
}

function generateFolderIconConfigJsonFile(parseData: IVsAutIconThemeJsonConfig, name: string) {
  const folderConfigData = getFolderConfigInfo(parseData);
  console.log(`folder Icon Number: ${Object.keys(folderConfigData).length}`);
  console.log("generate folder icon config json file...");
  fs.writeFile(`./dist/${name}-folder.json`, JSON.stringify(folderConfigData, null, 2), (err) => {
    if (err) {
      console.error(err);
    }
    console.log("generate folder icon config json file done =-=");
  });

  function getFolderConfigInfo(jsonConfig: IVsAutIconThemeJsonConfig) {
    const result: Record<string, IFolderConfigValue> = {};
    const { iconDefinitions, folderNames: FN, folderNamesExpanded: FNE } = jsonConfig;
    const folderKeys = Object.keys(iconDefinitions).filter((key) => key.startsWith("folder"));
    folderKeys.forEach((key) => {
      const iconPath = iconDefinitions[key].iconPath;
      const folderNames = getIconKeyArrInfo(FN, key);
      const folderNamesExpanded = getIconKeyArrInfo(FNE, key);
      result[key] = { iconPath, folderNames, folderNamesExpanded };
    });
    return result;
  }
}

function getIconKeyArrInfo(obj: Record<string, string>, iconKey: string) {
  return Object.entries(obj)
    .filter(([_, val]) => val === iconKey)
    .map(([key]) => key);
}
