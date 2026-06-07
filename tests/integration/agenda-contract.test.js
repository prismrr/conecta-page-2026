const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

describe("agenda contract", () => {
  it("valida a colecao _agenda pelo script de contrato", () => {
    const result = spawnSync("ruby", ["scripts/validate_agenda.rb"], {
      encoding: "utf-8",
    });

    expect(result.status).toBe(0);
  });

  it("exige campo date no formato DD/MM/AAAA no front matter", () => {
    const agendaDir = path.resolve("_agenda");
    const files = fs.readdirSync(agendaDir).filter((name) => name.endsWith(".md")).sort();

    expect(files.length).toBeGreaterThan(0);

    files.forEach((name) => {
      const content = fs.readFileSync(path.join(agendaDir, name), "utf-8");
      const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
      expect(match).not.toBeNull();

      const dateMatch = match[1].match(/^date:\s*"?(\d{2}\/\d{2}\/\d{4})"?\s*$/m);
      expect(dateMatch).not.toBeNull();
    });
  });
});
