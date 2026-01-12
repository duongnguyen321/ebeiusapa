const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const packageJsonPath = path.resolve(__dirname, '../package.json');
const packageJson = require(packageJsonPath);

const currentVersion = packageJson.version;
const versionParts = currentVersion.split('.').map(Number);

console.log(`Current version: ${currentVersion}`);
console.log('Select upgrade type:');
console.log('1. Patch (x.x.' + (versionParts[2] + 1) + ')');
console.log('2. Minor (x.' + (versionParts[1] + 1) + '.0)');
console.log('3. Major (' + (versionParts[0] + 1) + '.0.0)');
console.log('4. Custom');

rl.question('Enter choice (1-4): ', (answer) => {
  let newVersion = '';

  switch (answer.trim()) {
    case '1':
      newVersion = `${versionParts[0]}.${versionParts[1]}.${versionParts[2] + 1}`;
      break;
    case '2':
      newVersion = `${versionParts[0]}.${versionParts[1] + 1}.0`;
      break;
    case '3':
      newVersion = `${versionParts[0] + 1}.0.0`;
      break;
    case '4':
      rl.question('Enter custom version: ', (customVer) => {
        updateVersion(customVer);
      });
      return;
    default:
      console.log('Invalid choice');
      rl.close();
      return;
  }

  updateVersion(newVersion);
});

function updateVersion(version) {
  if (!version) {
    console.log('Version is empty');
    rl.close();
    return;
  }

  packageJson.version = version;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  console.log(`\u2705 Updated package.json version to: ${version}`);
  console.log('\u26A0\uFE0F  Remember to push these changes to GitHub!');
  rl.close();
}
