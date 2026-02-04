import { execSync } from "child_process";

export default async () => {
    console.log("Compiling tokens → tokens.css...");
    execSync("npx sass src/tokens-only.scss distribution/tokens.css --no-source-map", {
        stdio: "inherit"
    });
    console.log("✔ tokens compiled");
};