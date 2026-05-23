const fs = require('fs');
const path = require('path');

function processIncludes(content, filePath) {
  const dir = path.dirname(filePath);
  return content.replace(/<include\s+src="([^"]+)"\s*><\/include>/g, (match, src) => {
    const includePath = path.resolve(dir, src);
    if (!fs.existsSync(includePath)) {
      console.warn(`  [warn] include not found: ${includePath}`);
      return `<!-- include not found: ${src} -->`;
    }
    const includeContent = fs.readFileSync(includePath, 'utf8');
    return processIncludes(includeContent, includePath);
  });
}

function processFile(srcPath, destPath) {
  if (path.extname(srcPath) === '.html') {
    const content = fs.readFileSync(srcPath, 'utf8');
    fs.writeFileSync(destPath, processIncludes(content, srcPath));
  } else {
    fs.copyFileSync(srcPath, destPath);
  }
}

function buildDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    entry.isDirectory() ? buildDir(srcPath, destPath) : processFile(srcPath, destPath);
  }
}

function build() {
  fs.rmSync('dist', { recursive: true, force: true });
  buildDir('src', 'dist');
  console.log(`[${new Date().toLocaleTimeString()}] Build complete: src/ → dist/`);
}

build();

if (process.argv.includes('--watch')) {
  console.log('Watching src/ for changes…');
  fs.watch('src', { recursive: true }, (event, filename) => {
    if (filename) {
      console.log(`  changed: ${filename}`);
      build();
    }
  });
}
