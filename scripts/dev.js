const { spawn } = require('child_process');

const watcher = spawn('node', ['scripts/build.js', '--watch'], { stdio: 'inherit' });
const server  = spawn('npx', ['serve', 'dist'], { stdio: 'inherit' });

function cleanup() {
  watcher.kill();
  server.kill();
  process.exit(0);
}

process.on('SIGINT',  cleanup);
process.on('SIGTERM', cleanup);

watcher.on('close', cleanup);
server.on('close',  cleanup);
