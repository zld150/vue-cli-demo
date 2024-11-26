#!/usr/bin/env node

const { program } = require("commander");
const helpOptions = require("./lib/core/help");
const createCommands = require("./lib/core/create");

// 设置版本号
program.version(require("./package.json").version);

// 帮助与可选信息
const options = helpOptions();

// 创建其他指令
createCommands();

// 解析终端指令
program.parse(process.argv);
