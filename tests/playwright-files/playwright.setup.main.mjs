import { execSync } from "child_process";

export default async () => {
  console.log("Compiling main.scss → main.css...");
  execSync("npx sass src/main.scss dist/main.css --no-source-map", {
    stdio: "inherit"
  });
  console.log("✔ full system compiled");
};
