const ejs = require("ejs");
const path = require("path");
const fs = require("fs");

// 编译ejs模板
const compileEjs = (templateName, data) => {
  const templatePath = path.resolve(__dirname, `../templates/${templateName}.ejs`);
  // 返回promise
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, { data }, {}, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

// 判断path是否存在，不存在则创建对应的文件夹
const dirSyncHandler = (pathName) => {
  // 方法一
  // if (fs.existsSync(pathName)) return true;
  // const dirPath = path.dirname(pathName);
  // dirSyncHandler(dirPath) || fs.mkdirSync(dirPath);

  // 方法二
  // 获取目录路径（不包含文件名）
  const dirPath = path.dirname(pathName);
  try {
    // 只创建目录，不包含文件
    fs.mkdirSync(dirPath, { recursive: true });
  } catch (err) { 
    if (err.code !== 'EEXIST') throw err;   
  }
};

// 将编译过后的ejs模板写入到目标文件中
const writeToFile = (pathName, content) => {
  // 判断path是否存在，不存在则创建对应的文件夹
  dirSyncHandler(pathName);
  fs.promises.writeFile(pathName, content);
};

module.exports = {
  compileEjs,
  writeToFile,
};
