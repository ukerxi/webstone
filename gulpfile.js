const gulp = require('gulp');
const _process = require('./core/process');
const exec = require('child_process').exec;
let _subProcess = ''
// 启动任务
gulp.task('restart', function () {
  if (_subProcess.pid) {
    exec('taskkill /F /T /pid ' + _subProcess.pid, function (err, stdout, stderr) {
      if (err) {
        return console.log('释放进程失败！');
      } else {
        _subProcess = exec('npm run dev', function (err, stdout, stderr) {
          if (err) {
            console.log('重启进程！')
          } else {
            console.log(stdout)
            console.log('gulp server restart...')
          }
        });
      }
    });
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
  _subProcess = exec('npm run dev', function(err, stdout, stderr) {
    console.log('fdsfsffs')
    if (err) {
      console.log('重启进程！')
    } else {
      console.log(stdout)
      console.log(stderr)
    }
  });
});
