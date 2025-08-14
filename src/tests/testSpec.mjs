import { execSync } from "child_process";

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("Please provide at least one test name.");
  process.exit(1);
}

const files = args.map(name => `src/tests/e2e/${name}.spec.ts`).join(" ");
execSync(`npx playwright test ${files} --workers=1`, { stdio: "inherit" });
execSync("rm -rf playwright-report ./test-results");
