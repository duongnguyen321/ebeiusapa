import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJsonPath = path.resolve(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

const currentVersion = packageJson.version;
const versionParts = currentVersion.split('.').map(Number);
const [major, minor, patch] = versionParts;

const args = process.argv.slice(2);
const autoMode = args[0];

console.log(`Current version: ${currentVersion}`);

if (autoMode) {
  handleAutoMode(autoMode);
} else {
  // Inteactive mode
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('Select upgrade type:');
  console.log(`1. Patch (${major}.${minor}.${patch + 1})`);
  console.log(`2. Minor (${major}.${minor + 1}.0)`);
  console.log(`3. Major (${major + 1}.0.0)`);
  console.log('4. Custom');

  rl.question('Enter choice (1-4): ', (answer) => {
    let newVersion = '';

    switch (answer.trim()) {
      case '1':
        newVersion = `${major}.${minor}.${patch + 1}`;
        break;
      case '2':
        newVersion = `${major}.${minor + 1}.0`;
        break;
      case '3':
        newVersion = `${major + 1}.0.0`;
        break;
      case '4':
        rl.question('Enter custom version: ', (customVer) => {
          updateVersion(customVer);
          rl.close();
        });
        return;
      default:
        console.log('Invalid choice');
        rl.close();
        return;
    }

    updateVersion(newVersion);
    rl.close();
  });
}

function handleAutoMode(mode) {
  let newVersion = '';
  switch (mode.toLowerCase()) {
    case 'patch':
      newVersion = `${major}.${minor}.${patch + 1}`;
      break;
    case 'minor':
      newVersion = `${major}.${minor + 1}.0`;
      break;
    case 'major':
      newVersion = `${major + 1}.0.0`;
      break;
    default:
      console.log('Invalid value for auto mode. Use: patch, minor, or major');
      return;
  }
  updateVersion(newVersion);
}

function updateVersion(version) {
  if (!version) {
    console.log('Version is empty');
    return;
  }

  packageJson.version = version;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  console.log(`\u2705 Updated package.json version to: ${version}`);
  console.log('\u26A0\uFE0F  Remember to push these changes to GitHub!');
}
