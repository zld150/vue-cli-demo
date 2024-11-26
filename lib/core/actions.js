const util = require("util");
const path = require("path");
const download = util.promisify(require("download-git-repo"));
const terminal = require("../utils/terminal");
const { vueRepo } = require("../config/reop-config");
const { compileEjs, writeToFile } = require("../utils/utils");

// 创建项目action
const createProjectAction = async (project) => {
  // 1.clone项目
  await download(vueRepo, project, { clone: true });
  // 2.进入项目目录, 安装依赖
  const command = process.platform === "win32" ? "npm.cmd" : "npm";
  await terminal.spawn(command, ["install"], { cwd: `./${project}` });
  // 3.运行项目并自动打开浏览器（已经在模板的package.json中配置启动项参数 --open）
  await terminal.spawn(command, ["run", "serve"], { cwd: `./${project}` });
};

// 新增组件action
const addComponentAction = async (name, dest) => {
  // 1.编译ejs模板
  const moduleContent = await compileEjs("vue-component", { name, lowerName: name.toLowerCase() });
  // 2.将编辑后的模板写入到目标文件中
  const targetPath = path.resolve(dest, `${name}.vue`);
  writeToFile(targetPath, moduleContent);
};

// 新增页面与路由action
const addPageAndRouterAction = async (name, dest) => {
  // 1.编译相关的ejs模板
  const data = { name, lowerName: name.toLowerCase() };
  const pageMoudleContent = await compileEjs("vue-component", data);
  const routerMoudleContent = await compileEjs("vue-router.js", data);
  // 2.写入文件
  const pageTargetPath = path.resolve(dest, `${name}.vue`);
  const routerTargetPath = path.resolve(dest, "router.js");
  writeToFile(pageTargetPath, pageMoudleContent);
  writeToFile(routerTargetPath, routerMoudleContent);
};

// 新增状态存储action
const addStoreAction = async (name, dest) => {
  // 1.编译相关的ejs模板
  const storeModuleContent = await compileEjs("vue-store.js", {});
  const typesModuleContent = await compileEjs("vue-types.js", {});
  // 2.写入文件
  const storeTargetPath = path.resolve(dest, `${name}.js`);
  const typesTargetPath = path.resolve(dest, "types.js");
  writeToFile(storeTargetPath, storeModuleContent);
  writeToFile(typesTargetPath, typesModuleContent);
};

module.exports = {
  createProjectAction,
  addComponentAction,
  addPageAndRouterAction,
  addStoreAction,
};
