
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'src/data/easterEggs.ts');
const IMAGE_DIR = path.join(process.cwd(), 'public/images/easter-eggs');

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

// Function to safe-ify filenames
function safeName(name: string): string {
    return name.replace(/\s+/g, '-').replace(/\.\.+/g, '.');
}

try {
  let dataContent = fs.readFileSync(DATA_FILE, 'utf-8');
  const actualFilesFull = getAllFiles(IMAGE_DIR);
  
  let renameCount = 0;
  let codeUpdateCount = 0;

  actualFilesFull.forEach(fullPath => {
      const dir = path.dirname(fullPath);
      const filename = path.basename(fullPath);
      const newFilename = safeName(filename);

      if (filename !== newFilename) {
          const newFullPath = path.join(dir, newFilename);
          
          console.log(`[RENAME] "${filename}" -> "${newFilename}"`);
          
          // Rename file
          fs.renameSync(fullPath, newFullPath);
          renameCount++;

          // Update code content
          // We need to be careful to replace only the reference
          // The code uses '/images/easter-eggs/FILENAME'
          
          // Escape special regex chars in filename for search
          const escapedFilename = filename.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const regex = new RegExp(`'/images/easter-eggs/${escapedFilename}'`, 'g');
          
          if (regex.test(dataContent)) {
              dataContent = dataContent.replace(regex, `'/images/easter-eggs/${newFilename}'`);
              codeUpdateCount++;
              console.log(`    -> Updated code reference`);
          } else {
              console.log(`    -> WARNING: File renamed but no direct code reference found!`);
          }
      }
  });

  if (renameCount > 0) {
      fs.writeFileSync(DATA_FILE, dataContent, 'utf-8');
      console.log(`\nOperation Complete.`);
      console.log(`Renamed ${renameCount} files.`);
      console.log(`Updated ${codeUpdateCount} references in src/data/easterEggs.ts`);
  } else {
      console.log("No unsafe filenames found.");
  }


} catch (err) {
  console.error("Error:", err);
}
