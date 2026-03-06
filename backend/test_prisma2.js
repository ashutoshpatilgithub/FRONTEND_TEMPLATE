import { execSync } from 'child_process';
import fs from 'fs';
try {
    const out = execSync('npx prisma generate', { encoding: 'utf8', stdio: 'pipe' });
} catch (e) {
    const str = e.stderr || e.stdout;
    fs.writeFileSync('error_clean.txt', str.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, ''));
}
