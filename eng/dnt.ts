import { dirname, fromFileUrl } from "jsr:@std/path@1";
import { exists } from "jsr:@std/fs";
import { build, emptyDir, type EntryPoint } from "jsr:@deno/dnt";

const __dirname = dirname(fromFileUrl(import.meta.url));
const pwd = dirname(__dirname);

if (await exists(`${pwd}/node_modules`)) {
    Deno.removeSync(`${pwd}/node_modules`, { recursive: true });
}

const content = Deno.readTextFileSync(`${pwd}/.git/config`);
const lines = content.split(/\r?\n/);
let url = lines.find((line) => line.includes("url"))?.split("=")[1].trim();

if (!url) {
    throw new Error("Could not find git url in .git/config");
}

if (url.startsWith("git@")) {
    url = url.replace(":", "/").replace("git@", "https://");
}
const bugsUrl = url.replace(".git", "/discussions");
await emptyDir("./npm");

interface DenoJson {
    name: string;
    version: string;
    description: string;
    keywords: string[];
    exports: Record<string, string>;
    imports: Record<string, string>;
}

const denoJson = JSON.parse(Deno.readTextFileSync(`${pwd}/deno.json`)) as DenoJson;
const entryPoints: Array<string | EntryPoint> = [];
for (const key of Object.keys(denoJson.exports)) {
    if (key == ".") {
        entryPoints.push({ name: ".", path: denoJson.exports[key] });
    } else {
        entryPoints.push({ name: key, path: denoJson.exports[key] });
    }
}

const deps: Record<string, string> = {};
const devDeps: Record<string, string> = {
    "@types/node": "^22.0.0",
};

for (const key of Object.keys(denoJson.imports)) {
    let value = denoJson.imports[key];
    if (value.startsWith("npm:")) {
        value = value.replace("npm:", "");
    }

    const lastIdx = value.lastIndexOf("@");
    if (lastIdx === -1) {
        throw new Error(`Invalid version for ${key}`);
    }

    const name = value.substring(0, lastIdx);
    const version = value.substring(lastIdx + 1);
    console.log(name, version);
    if (name.startsWith("@types/") || name.startsWith("vite") || name.startsWith("@vite")) {
        devDeps[name] = version;
        continue;
    }

    deps[name] = version;
}

console.log(entryPoints);

await build({
    entryPoints: entryPoints,
    outDir: "./npm",
    declaration: "separate",
    esModule: true,
    shims: {},
    scriptModule: false,
    skipSourceOutput: true,
    compilerOptions: {
        "lib": ["ES2023"],
        "target": "ES2022",
        "skipLibCheck": true,
    },
    packageManager: "bun",
    package: {
        // package.json properties
        name: denoJson.name,
        version: denoJson.version,
        description: denoJson.description,
        keywords: denoJson.keywords,
        license: "MIT",
        authors: [{
            name: "jolt9dev",
            email: "dev@jolt9.com",
        }],
        scripts: {
            "test": "vitest",
            "test:bun": "bun run vitest",
        },
        repository: {
            type: "git",
            url: `git+${url}`,
        },
        bugs: {
            url: bugsUrl,
        },
        homepage: "bearz.io",
        engines: {
            "node": ">=22",
        },
        type: "module",
        dependencies: deps,
        devDependencies: devDeps,
    },
    postBuild() {
        // steps to run after building and before running the tests
        Deno.copyFileSync(`${pwd}/LICENSE.md`, "npm/LICENSE.md");
        Deno.copyFileSync(`${pwd}/README.md`, "npm/README.md");
        Deno.copyFileSync(`${pwd}/vitest.config.ts`, "npm/vitest.config.ts");
    },
});

Deno.removeSync(`${pwd}/npm/test_runner.js`);
await Deno.writeTextFile(
    `${pwd}/npm/.npmignore`,
    `vite.config.ts
.artifacts/**
node_modules/**
bun.lock
bun.lockb`,
    { append: true },
);

const cmd = new Deno.Command("bun", {
    args: ["run", "npm", "install", "--package-lock-only"],
    stdout: "inherit",
    stderr: "inherit",
    cwd: `${pwd}/npm`,
});

const o = await cmd.output();
if (o.code !== 0) {
    throw new Error("Failed to run yarn install --package-lock-only");
}

const cmd2 = new Deno.Command("deno", {
    args: ["fmt", "--line-width", "100", "--indent-width", "4", `${pwd}/npm/esm`, `${pwd}/npm/types`],
    stdout: "inherit",
    stderr: "inherit",
});

const o2 = await cmd2.output();
if (o2.code !== 0) {
    throw new Error("Failed to run deno fmt");
}
