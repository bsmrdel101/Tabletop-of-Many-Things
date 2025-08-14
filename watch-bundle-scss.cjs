const chokidar = require('chokidar');
const { exec } = require('child_process');

const watcher = chokidar.watch(['src/styles'], {
  persistent: true,
  ignoreInitial: true,
  ignored: /bundle\.scss$/
});

const runBundleScript = () => {
  exec('node generate-bundle-scss.cjs', (err, stdout, stderr) => {
    if (err) {
      console.error('Error running bundle script:', err);
      return;
    }
    if (stderr) console.error(stderr);
    if (stdout) console.log(stdout);
  });
};

watcher
  .on('add', runBundleScript)
  .on('unlink', runBundleScript)
  .on('change', runBundleScript);
