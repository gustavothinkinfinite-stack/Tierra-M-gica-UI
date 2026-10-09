import { readFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFileSync(join(root, path), "utf8");
const errors = [];
const check = (condition, message) => {
  if (!condition) errors.push(message);
};

let moduleManifest;
try {
  moduleManifest = JSON.parse(read("module.json"));
} catch (error) {
  errors.push(`module.json: ${error.message}`);
}
try {
  JSON.parse(read("lang/es.json"));
} catch (error) {
  errors.push(`lang/es.json: ${error.message}`);
}

if (moduleManifest) {
  check(moduleManifest.id === "tierra-magica-ui", "Unexpected module id");
  check(/^\\d+\\.\\d+\\.\\d+$/.test(moduleManifest.version), "Invalid semantic version");
  check(moduleManifest.download?.includes(`/v${moduleManifest.version}/`), "Download URL version mismatch");
  for (const path of [
    ...(moduleManifest.esmodules ?? []),
    ...(moduleManifest.styles ?? []),
    ...(moduleManifest.languages ?? []).map((language) => language.path)
  ]) {
    check(existsSync(join(root, path)), `Missing manifest resource: ${path}`);
  }
  for (const path of moduleManifest.esmodules ?? []) {
    try {
      execFileSync(process.execPath, ["--check", join(root, path)], { stdio: "pipe" });
    } catch (error) {
      errors.push(`JavaScript syntax failed in ${path}: ${error.message}`);
    }
  }
}

const pauseCSS = read("styles/pause.css");
const assetReferences = [...pauseCSS.matchAll(/url\\(["']?(\\.\\.\\/assets\\/[^)"']+)/g)];
for (const match of assetReferences) {
  const resolved = join(root, "styles", match[1]);
  check(existsSync(resolved), `Missing pause asset: ${match[1]}`);
}

if (errors.length) {
  for (const error of errors) console.error("FAIL:", error);
  process.exitCode = 1;
} else {
  console.log("PASS: module manifest, locale, script syntax and pause assets");
}
