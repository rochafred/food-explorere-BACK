const fs = require("fs");
const path = require("path");
const uploadConfig = require("../configs/upload");

class DiskStorage {
    async saveFile(file) {
      const tmpPath = path.resolve(uploadConfig.TMP_FOLDER, file);
      const uploadPath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);
  
      if (fs.existsSync(tmpPath)) {
        await fs.promises.rename(tmpPath, uploadPath);
      } else {
        console.error(`File ${tmpPath} not found`);
      }      
      return file;
    }
   
  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);
    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }
    await fs.promises.unlink(filePath);
  }
}

module.exports = DiskStorage;