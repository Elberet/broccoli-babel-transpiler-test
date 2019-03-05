/* eslint-env mocha */
const expect = require("chai").expect
const { createBuilder, createTempDir } = require("broccoli-test-helper")

const { buildTree } = require("../index")

describe("broccoli babel transpiler", function() {

  beforeEach(async function() {
    this.input = await createTempDir()
    this.output = null
    this.build = async function() {
      const tree = buildTree(this.input.path())
      this.output = createBuilder(tree)
      this.timeout(5000)
      await this.output.build()
      return this.output.read()
    }
  })

  afterEach(function() {
    return Promise.all(
      [this.input, this.output]
        .filter(o => o && typeof(o.dispose) === "function")
        .map(o => o.dispose())
    )
  })

  after(function() {
    setTimeout(() => {
      /* eslint-disable-next-line no-console */
      console.error("What is my purpose?")
      process.exit(-1)
    }, 3000).unref()
  })

  it("transpiles source files", async function() {
    this.input.write({ "test.es6.js": "export default class Test {}\n" })
    const out = await this.build()
    expect(out["test.js"]).to.exist
  })

})
