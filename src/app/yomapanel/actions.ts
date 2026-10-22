"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { criarSessao, senhaConfere, SESSION_COOKIE, PAINEL_LOCALE_COOKIE, SISTEMA_LOCALE_COOKIE } from "@/lib/yomapanel-auth";
import { getOverrides, saveOverrides, saveColors, setImage } from "@/lib/content-store";
import { listini as listiniBase, LOCALES, type Locale, type Texto, type TextoLista } from "@/content/yoma";

function textoDe(formData: FormData, prefixo: string): Texto {
  return {
    it: String(formData.get(`${prefixo}_it`) ?? ""),
    en: String(formData.get(`${prefixo}_en`) ?? ""),
    pt: String(formData.get(`${prefixo}_pt`) ?? ""),
  };
}

function textoListaDe(formData: FormData, prefixo: string): TextoLista {
  const linhas = (s: string) =>
    s
      .split("\n")
      .map((p) => p.trim())
      .filter(Boolean);
  return {
    it: linhas(String(formData.get(`${prefixo}_it`) ?? "")),
    en: linhas(String(formData.get(`${prefixo}_en`) ?? "")),
    pt: linhas(String(formData.get(`${prefixo}_pt`) ?? "")),
  };
}

function revalidarSite() {
  revalidatePath("/");
  revalidatePath("/en");
  revalidatePath("/pt");
  revalidatePath("/v1");
  revalidatePath("/v2");
  revalidatePath("/yomapanel");
}

export async function definirIdiomaPainel(formData: FormData) {
  const locale = String(formData.get("locale") ?? "it") as Locale;
  if (!LOCALES.includes(locale)) return;
  (await cookies()).set(PAINEL_LOCALE_COOKIE, locale, { maxAge: 60 * 60 * 24 * 365, path: "/" });
}

// Idioma da INTERFACE do /yomapanel e do /yomadesk (rótulos, menus, botões) — o
// seletor fica embaixo da logo na sidebar dos dois painéis.
export async function definirIdiomaSistema(formData: FormData) {
  const locale = String(formData.get("locale") ?? "it") as Locale;
  if (!LOCALES.includes(locale)) return;
  (await cookies()).set(SISTEMA_LOCALE_COOKIE, locale, { maxAge: 60 * 60 * 24 * 365, path: "/" });
}

export async function login(formData: FormData) {
  const senha = String(formData.get("senha") ?? "");
  const next = String(formData.get("next") ?? "/selecionar");
  if (!senhaConfere(senha)) {
    redirect(`/login?erro=1&next=${encodeURIComponent(next)}`);
  }
  const token = await criarSessao();
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
  redirect(next);
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/login");
}

export async function salvarContatti(formData: FormData) {
  const campos = ["nome", "titolare", "indirizzo", "cap", "telefono", "telefonoHref", "email", "whatsapp", "instagram", "facebook", "mappa"];
  const contatti: Record<string, string> = {};
  for (const c of campos) contatti[c] = String(formData.get(c) ?? "");
  await saveOverrides({ contatti });
  revalidarSite();
}

export async function salvarHero(formData: FormData) {
  await saveOverrides({
    hero: {
      titolo: textoDe(formData, "titolo"),
      sottotitolo: textoDe(formData, "sottotitolo"),
      motto: textoDe(formData, "motto"),
      linha1: textoDe(formData, "linha1"),
      accento: textoDe(formData, "accento"),
    },
  });
  revalidarSite();
}

export async function salvarStudio(formData: FormData) {
  await saveOverrides({
    studio: {
      titolo: textoDe(formData, "titolo"),
      paragrafi: textoListaDe(formData, "paragrafi"),
      eventi: textoDe(formData, "eventiTexto"),
      citazione: textoDe(formData, "citazione"),
    },
  });
  revalidarSite();
}

export async function salvarKristina(formData: FormData) {
  await saveOverrides({
    kristina: {
      nome: String(formData.get("nome") ?? ""),
      ruolo: textoDe(formData, "ruolo"),
      motto: textoDe(formData, "motto"),
      bio: textoListaDe(formData, "bio"),
    },
  });
  revalidarSite();
}

export async function salvarDisciplina(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const atual = await getOverrides();
  await saveOverrides({
    discipline: {
      ...atual.discipline,
      [id]: {
        nome: textoDe(formData, "nome"),
        sottotitolo: textoDe(formData, "sottotitolo"),
        testo: textoDe(formData, "testo"),
      },
    },
  });
  revalidarSite();
}

export async function salvarMassaggio(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const precoTxt = String(formData.get("prezzo") ?? "").trim();
  const atual = await getOverrides();
  await saveOverrides({
    massaggi: {
      ...atual.massaggi,
      [id]: {
        durata: String(formData.get("durata") ?? ""),
        prezzo: precoTxt ? Number(precoTxt) : null,
        testo: textoDe(formData, "testo"),
      },
    },
  });
  revalidarSite();
}

export async function salvarListino(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const base = listiniBase.find((l) => l.id === id);
  if (!base) return;
  const voci = base.voci.map((_, i) => ({
    nome: textoDe(formData, `nome_${i}`),
    prezzo: textoDe(formData, `prezzo_${i}`),
    nota: textoDe(formData, `nota_${i}`),
  }));
  const atual = await getOverrides();
  await saveOverrides({
    listini: {
      ...atual.listini,
      [id]: { id: base.id, titolo: textoDe(formData, "titolo"), voci, note: textoDe(formData, "note") },
    },
  });
  revalidarSite();
}

export async function salvarEventi(formData: FormData) {
  const ids = formData.getAll("id").map(String);
  const nomesIt = formData.getAll("nome_it").map(String);
  const nomesEn = formData.getAll("nome_en").map(String);
  const nomesPt = formData.getAll("nome_pt").map(String);
  const testosIt = formData.getAll("testo_it").map(String);
  const testosEn = formData.getAll("testo_en").map(String);
  const testosPt = formData.getAll("testo_pt").map(String);

  const eventi = ids
    .map((id, i) => ({
      id: id || crypto.randomUUID(),
      nome: { it: nomesIt[i] ?? "", en: nomesEn[i] ?? "", pt: nomesPt[i] ?? "" },
      testo: { it: testosIt[i] ?? "", en: testosEn[i] ?? "", pt: testosPt[i] ?? "" },
    }))
    .filter((e) => e.nome.it.trim());

  await saveOverrides({ eventi });
  revalidarSite();
}

export async function salvarCores(formData: FormData) {
  const cores: Record<string, string> = {};
  for (const [chave, valor] of formData.entries()) {
    if (typeof valor === "string" && valor) cores[chave] = valor;
  }
  await saveColors(cores);
  revalidarSite();
}

export async function enviarFoto(formData: FormData) {
  const original = String(formData.get("original") ?? "");
  const arquivo = formData.get("arquivo");
  if (!original || !(arquivo instanceof File) || arquivo.size === 0) return;

  const nomeArquivo = `${Date.now()}-${arquivo.name}`;
  let url: string;
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`yoma/${nomeArquivo}`, arquivo, { access: "public" });
    url = blob.url;
  } else if (process.env.NODE_ENV !== "production") {
    // Fallback só para `next dev` sem o Vercel Blob configurado.
    const pasta = path.join(process.cwd(), "public", "uploads");
    await mkdir(pasta, { recursive: true });
    await writeFile(path.join(pasta, nomeArquivo), Buffer.from(await arquivo.arrayBuffer()));
    url = `/uploads/${nomeArquivo}`;
  } else {
    throw new Error("BLOB_READ_WRITE_TOKEN não configurado.");
  }
  await setImage(original, url);
  revalidarSite();
}
