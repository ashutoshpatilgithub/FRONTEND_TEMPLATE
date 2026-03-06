import { execSync } from 'child_process';
try {
    const out = execSync('npx prisma generate', { encoding: 'utf8', stdio: 'pipe' });
    console.log("OUT", out);
} catch (e) {
    console.log("ERR", e.stderr || e.stdout);
}
