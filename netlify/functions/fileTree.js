const fs = require("fs");
const path = require("path");

exports.handler = async function () {
  const rootPath = path.resolve(__dirname, "../../crafted-gamz");

  function buildTree(currentPath) {
    try {
      const entries = fs.readdirSync(currentPath, { withFileTypes: true });

      return entries
        .filter(entry =>
          !entry.name.startsWith(".") &&
          entry.name !== "node_modules" &&
          entry.name !== "netlify"
        )
        .map(entry => {
          const fullPath = path.join(currentPath, entry.name);
          return entry.isDirectory()
            ? {
                name: entry.name,
                children: buildTree(fullPath)
              }
            : { name: entry.name };
        });
    } catch (err) {
      return [];
    }
  }

  const tree = buildTree(rootPath);

  function renderTree(tree, depth = 0) {
    return tree
      .map(entry => {
        const indent = "&nbsp;".repeat(depth * 4);
        if (entry.children) {
          return `${indent}📁 <strong>${entry.name}</strong><br>${renderTree(entry.children, depth + 1)}`;
        } else {
          return `${indent}📄 ${entry.name}<br>`;
        }
      })
      .join("");
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>File Tree</title>
      <style>
        body {
          font-family: 'Segoe UI', sans-serif;
          background: #0e1117;
          color: #c9d1d9;
          padding: 2rem;
        }
        strong {
          color: #58a6ff;
        }
      </style>
    </head>
    <body>
      <h1>📂 Crafted Gamz File Tree</h1>
      <div>${renderTree(tree)}</div>
    </body>
    </html>
  `;

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/html" },
    body: html
  };
};
