// Camada de overrides do painel de controle (/admin).
// O conteúdo-base continua em src/content/yoma.ts; o que a Kristina edita
// fica gravado no Upstash Redis (texto/preços/cores) e no Vercel Blob (imagens),
// e é mesclado por cima do conteúdo-base a cada request — sem rebuild do site.
import { Redis } from "@upstash/redis";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import * as yoma from "@/content/yoma";
import type { Disciplina, Listino, Massaggio } from "@/content/yoma";

const OVERRIDES_KEY = "yoma:overrides";
const IMAGES_KEY = "yoma:images";
const COLORS_KEY = "yoma:colors";

export type ContentOverrides = {
  contatti?: Partial<typeof yoma.contatti>;
  hero?: Partial<typeof yoma.hero>;
  studio?: Partial<Omit<typeof yoma.studio, "paragrafi">> & { paragrafi?: string[] };
  kristina?: Partial<Omit<typeof yoma.kristina, "bio">> & { bio?: string[] };
  discipline?: Record<string, Partial<Disciplina>>;
  massaggi?: Record<string, Partial<Massaggio>>;
  listini?: Record<string, Listino>;
  eventi?: { nome: string; testo: string }[];
  avvertenzaMassaggi?: string;
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

export async function getContent() {
  const [overrides, images] = await Promise.all([getOverrides(), getImageMap()]);
  const resolveImg = (src: string) => images[src] ?? src;

  const contatti = { ...yoma.contatti, ...overrides.contatti };
  const hero = { ...yoma.hero, ...overrides.hero };
  const studio = {
    ...yoma.studio,
    ...overrides.studio,
    paragrafi: overrides.studio?.paragrafi ?? yoma.studio.paragrafi,
  };
  const kristina = {
    ...yoma.kristina,
    ...overrides.kristina,
    bio: overrides.kristina?.bio ?? yoma.kristina.bio,
  };
  const discipline: Disciplina[] = yoma.discipline.map((d) => {
    const o = overrides.discipline?.[d.id];
    return { ...d, ...o, immagine: resolveImg(o?.immagine ?? d.immagine) };
  });
  const massaggi: Massaggio[] = yoma.massaggi.map((m) => {
    const o = overrides.massaggi?.[m.nome];
    return { ...m, ...o, immagine: resolveImg(o?.immagine ?? m.immagine) };
  });
  const listini: Listino[] = yoma.listini.map((l) => overrides.listini?.[l.id] ?? l);
  const eventi = overrides.eventi ?? yoma.eventi;
  const galleria = yoma.galleria.map((g) => ({ ...g, src: resolveImg(g.src) }));
  const avvertenzaMassaggi = overrides.avvertenzaMassaggi ?? yoma.avvertenzaMassaggi;

  function whatsappMsg(testo: string) {
    return `${contatti.whatsapp}?text=${encodeURIComponent(testo)}`;
  }

  return {
    contatti,
    hero,
    studio,
    kristina,
    discipline,
    massaggi,
    listini,
    eventi,
    galleria,
    nav: yoma.nav,
    avvertenzaMassaggi,
    whatsappMsg,
    resolveImg,
  };
}
