const { normalize, isValidSession, filterSessions } = require("../../assets/js/search-utils.js");

describe("search utils", () => {
  it("normaliza texto removendo acentos e caixa", () => {
    expect(normalize("Ágenda Conécta")).toBe("agenda conecta");
  });

  it("valida shape completo de sessao", () => {
    const session = {
      id: "s1",
      title: "Teste",
      speaker: "Pessoa",
      track: "Dev",
      startTime: "14:00",
      endTime: "15:00",
      room: "Sala 1",
    };

    expect(isValidSession(session)).toBe(true);
    expect(isValidSession({ ...session, title: "" })).toBe(false);
  });

  it("filtra sessoes por termo com acento e sem acento", () => {
    const sessions = [
      {
        id: "a",
        title: "Tecnologia para impacto social na Amazonia",
        speaker: "Comunidade",
        track: "SocialGood",
        startTime: "16:20",
        endTime: "17:00",
        room: "Auditorio",
      },
      {
        id: "b",
        title: "Arquiteturas Jamstack",
        speaker: "Herbert",
        track: "Dev",
        startTime: "14:00",
        endTime: "14:50",
        room: "CCT",
      },
    ];

    expect(filterSessions(sessions, "amazônia")).toHaveLength(1);
    expect(filterSessions(sessions, "jamstack")).toHaveLength(1);
    expect(filterSessions(sessions, "inexistente")).toHaveLength(0);
  });
});
