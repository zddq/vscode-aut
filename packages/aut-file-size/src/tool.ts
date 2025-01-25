const size1B = 1 * 1024; // 1B - 1字节
const size1KB = 1 * size1B * 1024; // 1KB - 1千字节
const size1MB = 1 * size1KB * 1024; // 1MB - 1兆字节
const size1GB = 1 * size1MB * 1024; // 1GB - 1千兆字节
const size1TB = 1 * size1GB * 1024; // 1TB - 1太字节
const size1PB = 1 * size1TB * 1024; // 1PB - 1拍字节
const size1EB = 1 * size1PB * 1024; // 1EB - 1艾字节
const size1ZB = 1 * size1EB * 1024; // 1ZB - 1泽字节
const size1YB = 1 * size1ZB * 1024; // 1YB - 1娆字节
const size1RB = 1 * size1YB * 1024; // 1YB - 1诺字节
const size1QB = 1 * size1RB * 1024; // 1YB - 1昆字节

/**
 * 转换获取的文件大小
 * @param size 文件大小(单位: b)
 * @return 格式化后的字符文件大小信息
 */
export function getSizeStr(size: number) {
  if (size >= size1QB) return `🌹${Math.floor(size / size1QB)}QB`; // 昆字节
  if (size >= size1RB) return `🌹${Math.floor(size / size1RB)}RB`; // 诺字节
  if (size >= size1YB) return `🌹${Math.floor(size / size1YB)}YB`; // 娆字节
  if (size >= size1ZB) return `🌹${Math.floor(size / size1ZB)}ZB`; // 泽字节
  if (size >= size1EB) return `🌹${Math.floor(size / size1EB)}EB`; // 艾字节
  if (size >= size1PB) return `🌹${Math.floor(size / size1PB)}PB`; // 拍字节
  if (size >= size1TB) return `🌹${Math.floor(size / size1TB)}TB`; // 太字节
  if (size >= size1GB) return `🌹${Math.floor(size / size1GB)}GB`; // 千兆字节
  if (size >= size1MB) return `🌹${Math.floor(size / size1MB)}MB`; // 兆字节
  if (size >= size1KB) return `🌹${Math.floor(size / size1KB)}KB`; // 千字节
  return `🌹${size}B`; // 字节
}
