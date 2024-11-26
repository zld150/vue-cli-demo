/**
 * 执行终端命令相关的代码
 */
const { spawn, exec } = require("child_process");

const commandSpawn = (...args) => {
  return new Promise((resolve) => {
    // 1.开启子进程执行命令
    const childProcess = spawn(...args);
    // 2.子进程的输出结果通过管道传递给父进程
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);
    // 3.监听子进程关闭事件, 成功后调用resolve
    childProcess.on("close", () => resolve());
  });
};

const execCommand = (...args) => {
  return new Promise((resolve, reject) => {
    exec(...args, (err, stdout, stderr) => {
      if (err) {
        reject(err);
        return;
      }
      console.log("stdout>>>", stdout.replace("\n", ""));
      console.log("stderr>>>", stderr.replace("\n", ""));
      resolve();
    });
  });
};

module.exports = {
  spawn: commandSpawn,
  exec: execCommand,
};
