const fs = require('fs');
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  readJSONFile: (filePath) => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          try {
            const jsonData = JSON.parse(data);
            resolve(jsonData);
          } catch (error) {
            reject(error);
          }
        }
      });
    });
  },
});
