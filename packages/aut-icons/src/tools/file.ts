import { IFileConfig } from "../config/type";
import { IIconDefinitionsValue } from "../global";

export function getFileIconThemeJsonConfig(fileConfig: IFileConfig) {
  const iconDefinitions = getFileIconDefinitions(fileConfig);
  const fileNames = getFileNames(fileConfig);
  const fileExtensions = getFileExtensions(fileConfig);
  const languageIds = getFileLanguageIds(fileConfig);
  return { iconDefinitions, fileNames, fileExtensions, languageIds };
}

function getFileIconDefinitions(fileConfig: IFileConfig): Record<string, IIconDefinitionsValue> {
  try {
    return Object.keys(fileConfig).reduce((obj, ext) => ({ ...obj, [ext]: { iconPath: fileConfig[ext].iconPath } } as Record<string, IIconDefinitionsValue>), {});
  } catch (err) {
    console.error(err);
    return {};
  }
}

function getFileNames(fileConfig: IFileConfig): Record<string, string> {
  try {
    return Object.keys(fileConfig).reduce((obj, ext) => ({ ...obj, ...getOneExtFileNameObj(ext, fileConfig[ext].fileNames) }), {});
  } catch (err) {
    console.error(err);
    return {};
  }

  function getOneExtFileNameObj(ext: string, fileNames: string[]) {
    return fileNames.reduce((obj, filename) => ({ ...obj, [filename]: ext }), {});
  }
}

function getFileExtensions(fileConfig: IFileConfig): Record<string, string> {
  try {
    return Object.keys(fileConfig).reduce((obj, ext) => ({ ...obj, ...getOneExtFileExtensionObj(ext, fileConfig[ext].fileExtensions) }), {});
  } catch (err) {
    console.error(err);
    return {};
  }

  function getOneExtFileExtensionObj(ext: string, fileExtensions: string[]) {
    return fileExtensions.reduce((obj, filename) => ({ ...obj, [filename]: ext }), {});
  }
}

function getFileLanguageIds(fileConfig: IFileConfig): Record<string, string> {
  try {
    return Object.keys(fileConfig).reduce((obj, ext) => ({ ...obj, ...getOneLanguageIdObj(ext, fileConfig[ext].languageIds) }), {});
  } catch (err) {
    console.error(err);
    return {};
  }

  function getOneLanguageIdObj(ext: string, fileExtensions: string[]) {
    return fileExtensions.reduce((obj, filename) => ({ ...obj, [filename]: ext }), {});
  }
}
