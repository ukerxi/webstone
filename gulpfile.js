const gulp = require('gulp');
const exec = require('child_process').exec;
let _subProcess = '';
// 启动任务
function runDev() {
  _subProcess = exec('npm run dev', function (err, stdout, stderr) {
    if (err) {
      _subProcess = {};
      console.log(err)
    } else {
      console.log(stdout)
    }
  });
  _subProcess.stdout.on('data', function(data) {
    console.log(data);
  });
}

// 启动任务
gulp.task('restart', function () {
  if (_subProcess.pid) {
    exec('taskkill /F /T /pid ' + _subProcess.pid, function (err, stdout, stderr) {
      if (err) {
        return console.log('释放进程失败！');
      } else {
        runDev();
      }
    });
  } else {
    runDev();
  }
});
gulp.task('server', function() {
  gulp.watch('routes/*', ['restart']);
  gulp.watch('routes/**/*', ['restart']);
  gulp.watch('models/*', ['restart']);
  gulp.watch('controllers/*', ['restart']);
  gulp.watch('core/*', ['restart']);
});

gulp.task('default', ['server'], function() {
  console.log('gulp start...');
  // 将你的默认的任务代码放在这
  runDev();
});
