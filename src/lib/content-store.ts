// Camada de overrides do painel de controle (/yomapanel).
// O conteúdo-base continua em src/content/yoma.ts; o que a Kristina edita
// fica gravado no Upstash Redis (texto/preços/cores) e no Vercel Blob (imagens),
// e é mesclado por cima do conteúdo-base a cada request — sem rebuild do site.
//
// Todo campo de texto editável existe nos 3 idiomas ({it,en,pt}, tipo `Texto`/
// `TextoLista` de yoma.ts). O override grava o objeto inteiro (as 3 línguas
// juntas) a cada salvamento — getContent(locale) é quem resolve pro idioma
// pedido no fim, caindo pra `it` se a tradução daquele campo estiver vazia.
import { Redis } from "@upstash/redis";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import * as yoma from "@/content/yoma";
import type { Disciplina, Listino, Locale, Massaggio, Texto, TextoLista, Evento } from "@/content/yoma";
import { LOCALE_PADRAO } from "@/content/yoma";

const OVERRIDES_KEY = "yoma:overrides";
const IMAGES_KEY = "yoma:images";
const COLORS_KEY = "yoma:colors";

export type ContentOverrides = {
  contatti?: Partial<typeof yoma.contatti>;
  hero?: Partial<{ titolo: Texto; sottotitolo: Texto; motto: Texto }>;
  studio?: Partial<{ titolo: Texto; paragrafi: TextoLista; eventi: Texto; citazione: Texto }>;
  kristina?: Partial<{ nome: string; ruolo: Texto; motto: Texto; bio: TextoLista }>;
  discipline?: Record<string, Partial<Pick<Disciplina, "nome" | "sottotitolo" | "testo" | "immagine">>>;
  massaggi?: Record<string, Partial<Pick<Massaggio, "durata" | "prezzo" | "testo" | "immagine">>>;
  listini?: Record<string, Listino>;
  eventi?: Evento[];
  avvertenzaMassaggi?: Texto;
};

function redis(): Redis | null {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

// Enquanto o Redis não estiver configurado na Vercel, o painel funciona
// em modo "rascunho": lê/grava normalmente, mas nada persiste entre deploys.
export const kvConfigurado = redis() !== null;

// Fallback só para `next dev` sem Upstash configurado: grava num arquivo local
// (pasta .data/, fora do git) pra dar pra testar o painel de ponta a ponta.
// Em produção, sem Redis configurado, as funções de salvar lançam erro.
const usarArquivoLocal = !kvConfigurado && process.env.NODE_ENV !== "production";
const PASTA_DADOS = path.join(process.cwd(), ".data");

async function lerArquivoLocal<T>(nome: string, vazio: T): Promise<T> {
  try {
    const conteudo = await readFile(path.join(PASTA_DADOS, nome), "utf-8");
    return JSON.parse(conteudo) as T;
  } catch {
    return vazio;
  }
}

async function gravarArquivoLocal(nome: string, dado: unknown) {
  await mkdir(PASTA_DADOS, { recursive: true });
  await writeFile(path.join(PASTA_DADOS, nome), JSON.stringify(dado, null, 2), "utf-8");
}

export async function getOverrides(): Promise<ContentOverrides> {
  if (usarArquivoLocal) return lerArquivoLocal<ContentOverrides>("overrides.json", {});
  const r = redis();
  if (!r) return {};
  try {
    return (await r.get<ContentOverrides>(OVERRIDES_KEY)) ?? {};
  } catch {
    return {};
  }
}

export async function saveOverrides(parcial: ContentOverrides) {
  const atual = await getOverrides();
  const novo = { ...atual, ...parcial };
  if (usarArquivoLocal) return gravarArquivoLocal("overrides.json", novo);
  const r = redis();
  if (!r) throw new Error("Redis não configurado (KV_REST_API_URL / KV_REST_API_TOKEN ausentes).");
  await r.set(OVERRIDES_KEY, novo);
}

export async function getImageMap(): Promise<Record<string, string>> {
  if (usarArquivoLocal) return lerArquivoLocal<Record<string, string>>("images.json", {});
  const r = redis();
  if (!r) return {};
  try {
    return (await r.get<Record<string, string>>(IMAGES_KEY)) ?? {};
  } catch {
    return {};
  }
}

export async function setImage(original: string, url: string) {
  const mapa = await getImageMap();
  mapa[original] = url;
  if (usarArquivoLocal) return gravarArquivoLocal("images.json", mapa);
  const r = redis();
  if (!r) throw new Error("Redis não configurado.");
  await r.set(IMAGES_KEY, mapa);
}

export async function getColors(): Promise<Record<string, string>> {
  if (usarArquivoLocal) return lerArquivoLocal<Record<string, string>>("colors.json", {});
  const r = redis();
  if (!r) return {};
  try {
    return (await r.get<Record<string, string>>(COLORS_KEY)) ?? {};
  } catch {
    return {};
  }
}

export async function saveColors(parcial: Record<string, string>) {
  const atual = await getColors();
  const novo = { ...atual, ...parcial };
  if (usarArquivoLocal) return gravarArquivoLocal("colors.json", novo);
  const r = redis();
  if (!r) throw new Error("Redis não configurado.");
  await r.set(COLORS_KEY, novo);
}

function t(texto: Texto | undefined, locale: Locale): string {
  if (!texto) return "";
  return texto[locale] || texto[LOCALE_PADRAO];
}

function tLista(lista: TextoLista | undefined, locale: Locale): string[] {
  if (!lista) return [];
  const valor = lista[locale];
  return valor && valor.length > 0 ? valor : lista[LOCALE_PADRAO];
}

// Pro /yomapanel: os campos de texto ainda em {it,en,pt}, sem resolver pra um
// idioma — é dali que o formulário tira o defaultValue dos 3 inputs por campo.
export async function getConteudoEditavel() {
  const [overrides, images] = await Promise.all([getOverrides(), getImageMap()]);
  const resolveImg = (src: string) => images[src] ?? src;

  const contatti = { ...yoma.contatti, ...overrides.contatti };
  const hero = { ...yoma.hero, ...overrides.hero };
  const studio = { ...yoma.studio, ...overrides.studio };
  const kristina = { ...yoma.kristina, ...overrides.kristina };

  const discipline = yoma.discipline.map((d) => {
    const o = overrides.discipline?.[d.id];
    return { id: d.id, nome: o?.nome ?? d.nome, sottotitolo: o?.sottotitolo ?? d.sottotitolo, testo: o?.testo ?? d.testo, immagine: resolveImg(o?.immagine ?? d.immagine) };
  });

  const massaggi = yoma.massaggi.map((m) => {
    const o = overrides.massaggi?.[m.id];
    return {
      id: m.id,
      nome: m.nome,
      durata: o?.durata ?? m.durata,
      prezzo: o?.prezzo !== undefined ? o.prezzo : m.prezzo,
      testo: o?.testo ?? m.testo,
      immagine: resolveImg(o?.immagine ?? m.immagine),
    };
  });

  const listini = yoma.listini.map((l) => overrides.listini?.[l.id] ?? l);
  const eventi = overrides.eventi ?? yoma.eventi;
  const avvertenzaMassaggi = overrides.avvertenzaMassaggi ?? yoma.avvertenzaMassaggi;

  return { contatti, hero, studio, kristina, discipline, massaggi, listini, eventi, avvertenzaMassaggi, resolveImg };
}

export async function getContent(locale: Locale = LOCALE_PADRAO) {
  const [overrides, images] = await Promise.all([getOverrides(), getImageMap()]);
  const resolveImg = (src: string) => images[src] ?? src;

  const contatti = { ...yoma.contatti, ...overrides.contatti };

  const heroBase = { ...yoma.hero, ...overrides.hero };
  const hero = {
    titolo: t(heroBase.titolo, locale),
    sottotitolo: t(heroBase.sottotitolo, locale),
    motto: t(heroBase.motto, locale),
  };

  const studioBase = { ...yoma.studio, ...overrides.studio };
  const studio = {
    titolo: t(studioBase.titolo, locale),
    paragrafi: tLista(studioBase.paragrafi, locale),
    eventi: t(studioBase.eventi, locale),
    citazione: t(studioBase.citazione, locale),
  };

  const kristinaBase = { ...yoma.kristina, ...overrides.kristina };
  const kristina = {
    nome: kristinaBase.nome,
    ruolo: t(kristinaBase.ruolo, locale),
    motto: t(kristinaBase.motto, locale),
    bio: tLista(kristinaBase.bio, locale),
  };

  const discipline = yoma.discipline.map((d) => {
    const o = overrides.discipline?.[d.id];
    return {
      id: d.id,
      nome: t(o?.nome ?? d.nome, locale),
      sottotitolo: t(o?.sottotitolo ?? d.sottotitolo, locale),
      testo: t(o?.testo ?? d.testo, locale),
      alt: t(d.alt, locale),
      immagine: resolveImg(o?.immagine ?? d.immagine),
    };
  });

  const massaggi = yoma.massaggi.map((m) => {
    const o = overrides.massaggi?.[m.id];
    return {
      id: m.id,
      nome: t(m.nome, locale),
      durata: o?.durata ?? m.durata,
      prezzo: o?.prezzo !== undefined ? o.prezzo : m.prezzo,
      testo: t(o?.testo ?? m.testo, locale),
      immagine: resolveImg(o?.immagine ?? m.immagine),
      preferito: m.preferito,
    };
  });

  const listini = yoma.listini.map((l) => {
    const ov = overrides.listini?.[l.id] ?? l;
    return {
      id: ov.id,
      titolo: t(ov.titolo, locale),
      voci: ov.voci.map((v) => ({ nome: t(v.nome, locale), prezzo: t(v.prezzo, locale), nota: t(v.nota, locale) })),
      note: ov.note ? t(ov.note, locale) : undefined,
    };
  });

  const eventiBase = overrides.eventi ?? yoma.eventi;
  const eventi = eventiBase.map((e) => ({ id: e.id, nome: t(e.nome, locale), testo: t(e.testo, locale) }));

  const galleria = yoma.galleria.map((g) => ({ ...g, src: resolveImg(g.src), alt: t(g.alt, locale) }));
  const nav = yoma.nav.map((n) => ({ href: n.href, label: t(n.label, locale) }));
  const avvertenzaMassaggi = t(overrides.avvertenzaMassaggi ?? yoma.avvertenzaMassaggi, locale);

  function whatsappMsg(testo: string) {
    return `${contatti.whatsapp}?text=${encodeURIComponent(testo)}`;
  }

  return {
    locale,
    contatti,
    hero,
    studio,
    kristina,
    discipline,
    massaggi,
    listini,
    eventi,
    galleria,
    nav,
    avvertenzaMassaggi,
    whatsappMsg,
    resolveImg,
  };
}
