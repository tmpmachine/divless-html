import pkg from "./package.json";

export default [
  {
    input: "divless.js", // your entry point
    output: [
      { file: pkg.main, format: "cjs" },
    ],
    plugins: [
    ],
  },
];