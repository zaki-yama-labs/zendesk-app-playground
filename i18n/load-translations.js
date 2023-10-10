const fs = require("fs");
const path = require("path");

const translations = getTranslationsFromDir("./translations");
writeTranslationsToFile(translations);

function getTranslationsFromDir(translationsDir) {
  const jsonFiles = fs
    .readdirSync(translationsDir)
    .filter((file) => path.extname(file) === ".json");

  let translations = {};

  jsonFiles.forEach((file) => {
    const fileData = fs.readFileSync(path.join(translationsDir, file));
    const filename = file.replace(".json", "").toLowerCase();
    const json = JSON.parse(fileData.toString());
    translations[filename] = json;
  });

  return translations;
}

function writeTranslationsToFile(translations) {
  const translationsString = JSON.stringify(translations);
  const translationsObj = `const translations = ${translationsString};`;
  const translationsFile = "./assets/translation-strings.js";

  fs.writeFileSync(translationsFile, translationsObj);
  console.log(`🚀 Translations written to ${translationsFile}`);
}
