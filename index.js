const babel = require("broccoli-babel-transpiler")


function buildTree(input) {

  return new babel(input, {
    filterExtensions: ["es6.js"],
    targetExtension: "js",
    sourceMaps: "inline",
    presets: [
      ["@babel/env", {
        targets: { chrome: "64", firefox: "58", ie: "11" },
        useBuiltIns: false
      }]
    ],
    croakOnIllegalOption: true
  })

}


module.exports = { buildTree }
