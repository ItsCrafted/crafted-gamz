const fs = require('fs');
const path = require('path');

// Configuration
const ROOT_DIR = process.cwd();
const BACKUP_DIR = path.join(ROOT_DIR, 'backups');

// The new background structure to inject
const NEW_BG_STRUCTURE = `    <div class="bg-container">
        <iframe src="../bg.html" class="bg"></iframe>
    </div>`;

// Ensure backup directory exists
if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR);
}

function convertFile(filePath) {
    console.log(`Processing: ${filePath}`);
    
    // Read the file
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if it already has the iframe bg structure
    if (content.includes('<iframe src="../bg.html" class="bg"></iframe>')) {
        console.log(`  ✓ Already converted, skipping`);
        return false;
    }
    
    // Check if it has the old bg-container div
    const oldBgPattern = /<div class="bg-container"><\/div>/;
    
    if (!oldBgPattern.test(content)) {
        console.log(`  ✗ No matching bg-container found, skipping`);
        return false;
    }
    
    // Create backup
    const backupPath = path.join(BACKUP_DIR, path.basename(filePath));
    fs.writeFileSync(backupPath, content);
    console.log(`  → Backup created: ${backupPath}`);
    
    // Replace the old bg-container with the new one
    content = content.replace(oldBgPattern, NEW_BG_STRUCTURE);
    
    // Write the modified content back
    fs.writeFileSync(filePath, content);
    console.log(`  ✓ Converted successfully`);
    
    return true;
}

function processDirectory(dirPath) {
    const files = fs.readdirSync(dirPath);
    let convertedCount = 0;
    let skippedCount = 0;
    
    files.forEach(file => {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);
        
        // Skip directories and non-HTML files
        if (stat.isDirectory() || !file.endsWith('.html')) {
            return;
        }
        
        // Skip the bg.html file itself
        if (file === 'bg.html') {
            console.log(`Skipping bg.html`);
            return;
        }
        
        if (convertFile(filePath)) {
            convertedCount++;
        } else {
            skippedCount++;
        }
    });
    
    return { convertedCount, skippedCount };
}

// Main execution
console.log('='.repeat(60));
console.log('HTML Background Converter');
console.log('='.repeat(60));
console.log(`Working directory: ${ROOT_DIR}`);
console.log(`Backup directory: ${BACKUP_DIR}`);
console.log('='.repeat(60));
console.log('');

const { convertedCount, skippedCount } = processDirectory(ROOT_DIR);

console.log('');
console.log('='.repeat(60));
console.log('Summary:');
console.log(`  Files converted: ${convertedCount}`);
console.log(`  Files skipped: ${skippedCount}`);
console.log(`  Backups saved to: ${BACKUP_DIR}`);
console.log('='.repeat(60));