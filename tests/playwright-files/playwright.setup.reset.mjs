import { execSync } from "child_process";

export default async () => {
  console.log("Compiling reset.scss → reset.css...");

  execSync("npx sass src/reset/reset.scss distribution/reset.css --no-source-map", {
    stdio: "inherit"
  });

  console.log("SCSS compile complete.");
};