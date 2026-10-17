// Shim só pra /v1 e /v2 — páginas legadas, "aprovadas, não mexer", que sempre
// foram só em italiano e nunca passaram pelo /yomapanel (content-store.ts). Depois
// que yoma.ts virou multi-idioma ({it,en,pt} por campo), este arquivo resolve
// tudo pro italiano de novo, reproduzindo exatamente a forma antiga (string
// simples) — assim v1/v2 continuam compilando e exibindo o texto de sempre,
// sem precisar entender o formato multi-idioma.
import * as yoma from "./yoma";
import type { Texto, TextoLista } from "./yoma";

function it(texto: Texto): string {
  return texto.it;
}
function itLista(lista: TextoLista): string[] {
  return lista.it;
}

export const contatti = yoma.contatti;
export const whatsappMsg = yoma.whatsappMsg;

export const hero = {
  titolo: it(yoma.hero.titolo),
  sottotitolo: it(yoma.hero.sottotitolo),
  motto: it(yoma.hero.motto),
};

export const studio = {
  titolo: it(yoma.studio.titolo),
  paragrafi: itLista(yoma.studio.paragrafi),
  eventi: it(yoma.studio.eventi),
  citazione: it(yoma.studio.citazione),
};

export const kristina = {
  nome: yoma.kristina.nome,
  ruolo: it(yoma.kristina.ruolo),
  motto: it(yoma.kristina.motto),
  bio: itLista(yoma.kristina.bio),
};

export const discipline = yoma.discipline.map((d) => ({
  id: d.id,
  nome: it(d.nome),
  sottotitolo: it(d.sottotitolo),
  testo: it(d.testo),
  immagine: d.immagine,
  alt: it(d.alt),
}));

export const massaggi = yoma.massaggi.map((m) => ({
  nome: it(m.nome),
  durata: m.durata,
  prezzo: m.prezzo,
  testo: it(m.testo),
  immagine: m.immagine,
  preferito: m.preferito,
}));

export const listini = yoma.listini.map((l) => ({
  id: l.id,
  titolo: it(l.titolo),
  voci: l.voci.map((v) => ({ nome: it(v.nome), prezzo: it(v.prezzo), nota: it(v.nota) })),
  note: l.note ? it(l.note) : undefined,
}));

export const eventi = yoma.eventi.map((e) => ({ nome: it(e.nome), testo: it(e.testo) }));

export const galleria = yoma.galleria.map((g) => ({ ...g, alt: it(g.alt) }));

export const nav = yoma.nav.map((n) => ({ href: n.href, label: it(n.label) }));

export const avvertenzaMassaggi = it(yoma.avvertenzaMassaggi);
