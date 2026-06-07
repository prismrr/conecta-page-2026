const { normalize, isValidSession, filterSessions, sortSessions } = require("../../assets/js/search-utils.js");

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
      date: "10/06/2026",
      startTime: "14:00",
      endTime: "15:00",
      room: "Sala 1",
    };

    expect(isValidSession(session)).toBe(true);
    expect(isValidSession({ ...session, title: "" })).toBe(false);
    expect(isValidSession({ ...session, date: "2026-06-10" })).toBe(false);
  });

  it("filtra sessoes por termo com acento e sem acento", () => {
    const sessions = [
      {
        id: "a",
        title: "Tecnologia para impacto social na Amazonia",
        speaker: "Comunidade",
        track: "SocialGood",
        date: "10/06/2026",
        startTime: "16:20",
        endTime: "17:00",
        room: "Auditorio",
      },
      {
        id: "b",
        title: "Arquiteturas Jamstack",
        speaker: "Herbert",
        track: "Dev",
        date: "11/06/2026",
        startTime: "14:00",
        endTime: "14:50",
        room: "CCT",
      },
    ];

    expect(filterSessions(sessions, "amazônia")).toHaveLength(1);
    expect(filterSessions(sessions, "jamstack")).toHaveLength(1);
    expect(filterSessions(sessions, "10/06/2026")).toHaveLength(1);
    expect(filterSessions(sessions, "inexistente")).toHaveLength(0);
  });

  it("ordena sessoes por data e horario", () => {
    const sessions = [
      {
        id: "b",
        title: "Sessao B",
        speaker: "Pessoa B",
        track: "Dev",
        date: "11/06/2026",
        startTime: "09:00",
        endTime: "10:00",
        room: "Sala 2",
      },
      {
        id: "a",
        title: "Sessao A",
        speaker: "Pessoa A",
        track: "Open",
        date: "10/06/2026",
        startTime: "14:00",
        endTime: "15:00",
        room: "Sala 1",
      },
      {
        id: "c",
        title: "Sessao C",
        speaker: "Pessoa C",
        track: "Open",
        date: "11/06/2026",
        startTime: "08:00",
        endTime: "08:30",
        room: "Sala 3",
      },
    ];

    expect(sortSessions(sessions).map((s) => s.id)).toEqual(["a", "c", "b"]);
  });
});
