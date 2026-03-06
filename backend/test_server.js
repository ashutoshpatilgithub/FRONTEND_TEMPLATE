import { execSync } from 'child_process';
import fs from 'fs';
try {
    execSync('node Backend.js', { encoding: 'utf8', stdio: 'pipe' });
} catch (e) {
    const errStr = e.stderr || e.stdout || e.toString();
    fs.writeFileSync('server_crash.txt', errStr);
}
