const { spawnSync } = require("node:child_process");

describe("agenda contract", () => {
  it("valida a colecao _agenda pelo script de contrato", () => {
    const result = spawnSync("ruby", ["scripts/validate_agenda.rb"], {
      encoding: "utf-8",
    });

    expect(result.status).toBe(0);
  });
});
