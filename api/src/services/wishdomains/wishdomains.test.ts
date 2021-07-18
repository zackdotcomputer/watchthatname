import {
  wishdomains,
  wishdomain,
  createWishdomain,
  updateWishdomain,
  deleteWishdomain
} from "./wishdomains";
import type { StandardScenario } from "./wishdomains.scenarios";

describe("wishdomains", () => {
  scenario("returns all wishdomains", async (scenario: StandardScenario) => {
    const result = await wishdomains();

    expect(result.length).toEqual(Object.keys(scenario.wishdomain).length);
  });

  scenario("returns a single wishdomain", async (scenario: StandardScenario) => {
    const result = await wishdomain({ id: scenario.wishdomain.one.id });

    expect(result).toEqual(scenario.wishdomain.one);
  });

  scenario("creates a wishdomain", async () => {
    const result = await createWishdomain({
      input: { domain: "String" }
    });

    expect(result.domain).toEqual("String");
  });

  scenario("updates a wishdomain", async (scenario: StandardScenario) => {
    const original = await wishdomain({ id: scenario.wishdomain.one.id });
    const result = await updateWishdomain({
      id: original.id,
      input: { domain: "String2" }
    });

    expect(result.domain).toEqual("String2");
  });

  scenario("deletes a wishdomain", async (scenario: StandardScenario) => {
    const original = await deleteWishdomain({ id: scenario.wishdomain.one.id });
    const result = await wishdomain({ id: original.id });

    expect(result).toEqual(null);
  });
});
