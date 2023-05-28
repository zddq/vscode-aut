import fse from "fs-extra";
import fs from "node:fs";
import path from "node:path";

import pkg from "../package.json";

import { getFileIconThemeJsonConfig, getFolderIconThemeJsonConfig } from "./tools";
import { fileConfig, folderConfig, initOtherVsIconThemeConfig } from "./config";
import { IVsAutIconThemeJsonConfig } from "./global";

// 反序列化生成好的 vscode icon theme json file 文件
// reverseVsIconThemeJsonFile("./icons/vs-aut-icon-theme.json", "vs-aut-icon");

/** @name 生成 Ant Icons Theme Json File */
function generateVsAntIconsThemeJsonFile() {
  const { iconDefinitions: fileIconDefinitions, fileNames, fileExtensions, languageIds } = getFileIconThemeJsonConfig(fileConfig);
  const { iconDefinitions: folderIconDefinitions, folderNames, folderNamesExpanded } = getFolderIconThemeJsonConfig(folderConfig);
  const vsIconThemeJsonData: IVsAutIconThemeJsonConfig = {
    iconDefinitions: { ...fileIconDefinitions, ...folderIconDefinitions },
    fileNames,
    fileExtensions,
    languageIds,
    folderNames,
    folderNamesExpanded,
    ...initOtherVsIconThemeConfig,
  };

  printPkgInfo();

  const generateVsAntIconsThemeJsonFilePath = path.join(__dirname, "../", pkg.contributes.iconThemes[0].path);
  console.log("-------- Ant Icons Theme Json File generate...");
  fse.ensureDir(path.dirname(generateVsAntIconsThemeJsonFilePath));
  fs.writeFile(generateVsAntIconsThemeJsonFilePath, JSON.stringify(vsIconThemeJsonData, null, 2), (err) => {
    if (err) {
      console.error("-------- Ant Icons Theme Json File fail");
      console.error(err);
    }

    console.log("-------- Ant Icons Theme Json File generate success");
  });
}

function printPkgInfo() {
  const { displayName, version, license, publisher, description } = pkg;
  console.log(`${displayName} ${version} ${license} ${publisher}`);
  console.log(`${description}`);
}

generateVsAntIconsThemeJsonFile();
