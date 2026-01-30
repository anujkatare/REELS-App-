import fs from "fs";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "./uploads");
const ONE_HOUR = 60 * 60 * 1000;

export function cleanupUploads() {
  fs.readdir(UPLOAD_DIR, (err, files) => {
    if (err) return;

    const now = Date.now();

    files.forEach((file) => {
      const filePath = path.join(UPLOAD_DIR, file);

      fs.stat(filePath, (err, stat) => {
        if (err) return;

        const age = now - stat.mtimeMs;

        if (age > ONE_HOUR) {
          fs.unlink(filePath, (err) => {
            if (!err) {
              console.log(`🗑️ Deleted old upload: ${file}`);
            }
          });
        }
      });
    });
  });
}
