const esbuild = require("esbuild");

const isWatch = process.argv.includes("--watch");
const isPro = process.argv.includes("--production");

/**
 * @type {import('esbuild').Plugin}
 */
const esbuildProblemMatcherPlugin = {
  name: "esbuild-problem-matcher",
  setup(build) {
    build.onStart(() => {
      console.log("[watch] build started");
    });
    build.onEnd((result) => {
      result.errors.forEach(({ text, location }) => {
        console.error(`✘ [ERROR] ${text}`);
        console.error(`${location.file}:${location.line}:${location.column}:`);
      });
      console.log(`[watch] build finished`);
    });
  },
};

async function main() {
  const ctx = await esbuild.context({
    entryPoints: ["src/index.ts"],
    bundle: true,
    format: "cjs",
    minify: isPro,
    sourcemap: !isPro,
    sourcesContent: false,
    platform: "node",
    outfile: "dist/extension.js",
    external: ["vscode"],
    logLevel: "silent",
    plugins: [esbuildProblemMatcherPlugin],
  });
  if (isWatch) {
    await ctx.watch();
    return;
  }

  await ctx.rebuild();
  await ctx.dispose();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
