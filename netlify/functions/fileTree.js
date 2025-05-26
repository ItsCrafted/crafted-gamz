const fs = require("fs");
const path = require("path");

exports.handler = async function () {
  const dir = path.resolve("./");

  function getFiles(dirPath) {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    return entries.reduce((acc, entry) => {
      if (
        entry.name === "node_modules" ||
        entry.name.startsWith(".") ||
        entry.name === "netlify"
      ) return acc;

      const fullPath = path.join(dirPath, entry.name);
      acc[entry.name] = entry.isDirectory() ? getFiles(fullPath) : null;
      return acc;
    }, {});
  }

  const tree = getFiles(dir);
  return {
    statusCode: 200,
    body: JSON.stringify(tree),
  };
};
