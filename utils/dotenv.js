const fs = require("fs");
const path = require("path");

function config(filePath = path.join(process.cwd(), ".env")) {
    if (!fs.existsSync(filePath)) return;

    const envLines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);

    for (const rawLine of envLines) {
        const line = rawLine.trim();
        if (!line || line.startsWith("#")) continue;

        const separatorIndex = line.indexOf("=");
        if (separatorIndex === -1) continue;

        const key = line.slice(0, separatorIndex).trim();
        const value = line.slice(separatorIndex + 1).trim();

        if (!(key in process.env)) {
            process.env[key] = value;
        }
    }
}

module.exports = { config };
