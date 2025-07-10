const fs = require('fs');

const file = './version.json';
const version = JSON.parse(fs.readFileSync(file, 'utf8'));

version.patch += 1;

if (version.patch > 9) {
  version.patch = 0;
  version.minor += 1;
}

// Save new version
fs.writeFileSync(file, JSON.stringify(version, null, 2));

// Output string version (optional, for use in version.js)
const versionStr = `${version.major}.${version.minor}.${version.patch}`;
fs.writeFileSync('./version.js', `const version = 'v${versionStr}';`);
