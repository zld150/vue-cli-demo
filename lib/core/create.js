const { program } = require("commander");
const { createProjectAction, addComponentAction, addPageAndRouterAction, addStoreAction } = require("./actions");

const createCommands = () => {
  // 创建项目命令
  program.command("create <project> [others...]").description("clone a repository into a folder").action(createProjectAction);

  // 新增组件命令
  program
    .command("addcpn <componentName>")
    .description("add a component to the project， 例如：zld addcpn HelloWorld [-d src/components]")
    .action((name) => {
      const directory = program.opts().directory ?? "src/components";
      addComponentAction(name, directory);
    });

  // 新增页面命令
  program
    .command("addpage <pageName>")
    .description("add vue page and router config, 例如：zld addpage Home [-d src/pages]")
    .action((name) => {
      const directory = program.opts().directory ?? `src/pages/${name.toLowerCase()}`;
      addPageAndRouterAction(name, directory);
    });

  // 新增状态存储命令
  program
    .command("addstore <storeName>")
    .description("add vue store, 例如：zld addstore user [-d src/store]")
    .action((name) => {
      const directory = program.opts().directory ?? `src/store/modules/${name.toLowerCase()}`;
      addStoreAction(name, directory);
    });
};

module.exports = createCommands;
