import { IFolderConfigData } from "../config/type";
import { IIconDefinitionsValue } from "../global";

export function getFolderIconThemeJsonConfig(folderConfig: IFolderConfigData) {
  const iconDefinitions = getFolderIconDefinitions(folderConfig);
  const folderNames = getFolderNames(folderConfig);
  const folderNamesExpanded = getFolderNamesExpanded(folderConfig);
  return { iconDefinitions, folderNames, folderNamesExpanded };
}

function getFolderIconDefinitions(folderConfig: IFolderConfigData): Record<string, IIconDefinitionsValue> {
  try {
    return Object.keys(folderConfig).reduce((obj, ext) => ({ ...obj, [ext]: { iconPath: folderConfig[ext].iconPath } } as Record<string, IIconDefinitionsValue>), {});
  } catch (err) {
    console.error(err);
    return {};
  }
}

function getFolderNames(folderConfig: IFolderConfigData): Record<string, string> {
  try {
    return Object.keys(folderConfig).reduce((obj, ext) => ({ ...obj, ...getOneExtFileNameObj(ext, folderConfig[ext].folderNames) }), {});
  } catch (err) {
    console.error(err);
    return {};
  }

  function getOneExtFileNameObj(ext: string, folderNames: string[]) {
    return folderNames.reduce((obj, folderName) => ({ ...obj, [folderName]: ext }), {});
  }
}

function getFolderNamesExpanded(folderConfig: IFolderConfigData): Record<string, string> {
  try {
    return Object.keys(folderConfig).reduce((obj, ext) => ({ ...obj, ...getOneFolderNamesExpandedObj(ext, folderConfig[ext].folderNamesExpanded) }), {});
  } catch (err) {
    console.error(err);
    return {};
  }

  function getOneFolderNamesExpandedObj(ext: string, folderNamesExpanded: string[]) {
    return folderNamesExpanded.reduce((obj, filename) => ({ ...obj, [filename]: ext }), {});
  }
}
