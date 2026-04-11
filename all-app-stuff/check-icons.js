const fs    = require('fs');
const path  = require('path');
const http  = require('http');
const https = require('https');

const appsFile = path.join(__dirname, 'apps.json');

if (!fs.existsSync(appsFile)) {
    console.error('❌  apps.json not found in current directory');
    process.exit(1);
}

const apps = JSON.parse(fs.readFileSync(appsFile, 'utf8'));

function isAbsoluteUrl(str) {
    return /^https?:\/\//i.test(str);
}

function checkUrl(url) {
    return new Promise(resolve => {
        const mod = url.startsWith('https') ? https : http;
        const req = mod.request(url, { method: 'HEAD' }, res => {
            resolve({ status: res.statusCode, ok: res.statusCode < 400 });
        });
        req.on('error', err => resolve({ status: null, ok: false, err: err.message }));
        req.setTimeout(5000, () => { req.destroy(); resolve({ status: 'timeout', ok: false }); });
        req.end();
    });
}

function checkFile(relativePath) {
    const candidates = [
        path.join(__dirname, relativePath),
        path.join(__dirname, '..', relativePath),
        path.join(__dirname, relativePath.replace(/^[^/\\]+[/\\]/, '')),
    ];
    const found = candidates.some(p => fs.existsSync(p));
    return { ok: found, status: found ? 200 : 404 };
}

async function main() {
    const broken = [];
    let checked = 0;

    process.stdout.write(`\nChecking ${apps.length} app icons...\n\n`);

    for (const app of apps) {
        const raw = (app.iconUrl || '').split('?')[0].trim();

        if (!raw) {
            broken.push({ id: app.id, name: app.name, url: '(none)', status: 'missing' });
            checked++;
            process.stdout.write(`\r  ${checked}/${apps.length}`);
            continue;
        }

        const result = isAbsoluteUrl(raw) ? await checkUrl(raw) : checkFile(raw);

        checked++;
        process.stdout.write(`\r  ${checked}/${apps.length}`);

        if (!result.ok) {
            broken.push({ id: app.id, name: app.name, url: raw, status: result.status ?? result.err });
        }
    }

    process.stdout.write('\n\n');

    if (broken.length === 0) {
        console.log('All icons OK');
    } else {
        console.log(`${broken.length} broken icon${broken.length !== 1 ? 's' : ''}:\n`);
        for (const b of broken) {
            console.log(`  [${b.status}]  ${b.name}`);
            console.log(`           ${b.url}\n`);
        }
    }

    const now     = new Date().toISOString().replace('T', ' ').slice(0, 19);
    const outFile = path.join(__dirname, 'broken-icons.md');

    let md = `# Broken Icons Report\n\n`;
    md    += `**Generated:** ${now}  \n`;
    md    += `**Apps checked:** ${apps.length}  \n`;
    md    += `**Broken:** ${broken.length}\n\n`;

    if (broken.length === 0) {
        md += ` All icons resolved successfully.\n`;
    } else {
        md += `| Status | App | Path |\n`;
        md += `|--------|-----|------|\n`;
        for (const b of broken) {
            md += `| \`${b.status}\` | ${b.name} | \`${b.url}\` |\n`;
        }
    }

    fs.writeFileSync(outFile, md, 'utf8');
    console.log(`Report saved to broken-icons.md`);
}

main();