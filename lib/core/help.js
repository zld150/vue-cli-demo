const { program } = require("commander");
/**
 * 自定义help参数
 */
const helpOptions = () => {
  program.option("-d --directory <directory>", "a directory folder,  例如: -d /src/components");
  program.option("-f --framework <framework>", "a framework name, 例如: -f vue");
  program.on("--help", () => {
    console.log("");
    console.log("Other:");
    console.log("  other options~");
  });
  return program.opts();
};

module.exports = helpOptions;
