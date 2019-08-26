const fs = require("fs");

class JSONFileHandler {
  constructor(filePath) {
    this.filePath = filePath;
  }

  getData() {
    let data;

    fs.readFile(this.filePath, "utf8", (err, jsonString) => {
      if (err) {
        console.log("File read failed:", err);
        return;
      }
      data = jsonString;
    });

    return data;
  }

  replace(newData) {
    fs.writeFile(this.filePath, newData, err => {
      if (err) {
        console.log("Error writing file", err);
      } else {
        console.log("Successfully wrote file");
      }
    });
  }
}

module.exports = JSONFileHandler;
