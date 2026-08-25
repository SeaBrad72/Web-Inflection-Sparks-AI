import { describe, it, expect } from "vitest";
import { SPARKWRIGHT, sparkwrightSchema } from "./sparkwright";

describe("SPARKWRIGHT content module", () => {
  it("validates against its own schema", () => {
    expect(() => sparkwrightSchema.parse(SPARKWRIGHT)).not.toThrow();
  });

  it("rejects a version that is not a semver tag", () => {
    const bad = { ...SPARKWRIGHT, version: "3.218" };
    expect(() => sparkwrightSchema.parse(bad)).toThrow();
  });

  it("rejects a stat card missing its source attribution", () => {
    const bad = {
      ...SPARKWRIGHT,
      stats: [{ figure: "45%", label: "of AI-generated code shipped a flaw" }],
    };
    expect(() => sparkwrightSchema.parse(bad)).toThrow();
  });

  it("rejects an unknown maturity stage", () => {
    const bad = { ...SPARKWRIGHT, maturity: "production" };
    expect(() => sparkwrightSchema.parse(bad)).toThrow();
  });

  it("requires at least one harness", () => {
    const bad = { ...SPARKWRIGHT, harnesses: [] };
    expect(() => sparkwrightSchema.parse(bad)).toThrow();
  });


});
