const fs = require('fs');

class JSONFileHandler {
  constructor(filePath) {
    this.filePath = filePath;
  }

  getData() {
    return JSON.parse(fs.readFileSync(this.filePath, 'utf8'));
  }

  replace(newData) {
    fs.writeFile(this.filePath, newData, err => {
      if (err) {
        console.log('Error writing file', err);
      } else {
        console.log('Successfully wrote file');
      }
    });
  }
}

module.exports = JSONFileHandler;
