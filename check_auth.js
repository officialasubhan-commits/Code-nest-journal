const fs = require('fs');
const path = require('path');

function findActionsFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      findActionsFiles(fullPath, fileList);
    } else if (file === 'actions.ts') {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const actionsFiles = findActionsFiles(path.join(__dirname, 'src', 'app', 'admin'));

for (const file of actionsFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  let inFunction = false;
  let functionName = '';
  let hasAuth = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.match(/export (?:async )?function (\w+)/)) {
      if (inFunction && !hasAuth) {
        console.log(`❌ Missing auth in ${file}: ${functionName}`);
      }
      inFunction = true;
      functionName = line.match(/export (?:async )?function (\w+)/)[1];
      hasAuth = false;
    }
    
    if (inFunction) {
      if (line.includes('assertAdmin') || line.includes('getServerSession')) {
        hasAuth = true;
      }
      // Extremely basic heuristic to find end of function - assume '}' at start of line
      if (line.startsWith('}')) {
        if (!hasAuth) {
          console.log(`❌ Missing auth in ${file}: ${functionName}`);
        }
        inFunction = false;
      }
    }
  }
  // Check the last function
  if (inFunction && !hasAuth) {
    console.log(`❌ Missing auth in ${file}: ${functionName}`);
  }
}
console.log("Check complete.");
