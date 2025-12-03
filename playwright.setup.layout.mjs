import { execSync } from "child_process";

export default async () => {
  console.log("Compiling grid-only.scss → distirbution/grid.css...");
  execSync("npx sass src/grid-only.scss distribution/grid.css --no-source-map", {
    stdio: "inherit",
  });
  console.log("Grid compile successful");
};
