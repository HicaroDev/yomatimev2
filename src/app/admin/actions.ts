"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { criarSessao, senhaConfere, SESSION_COOKIE } from "@/lib/admin-auth";
import { getOverrides, saveOverrides, saveColors, setImage } from "@/lib/content-store";
import { listini as listiniBase } from "@/content/yoma";

function revalidarSite() {
  revalidatePath("/");
  revalidatePath("/v1");
  revalidatePath("/v2");
  revalidatePath("/admin");
}

export async function login(formData: FormData) {
  const senha = String(formData.get("senha") ?? "");
  const next = String(formData.get("next") ?? "/admin");
  if (!senhaConfere(senha)) {
    redirect(`/admin/login?erro=1&next=${encodeURIComponent(next)}`);
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
  redirect("/admin/login");
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
      titolo: String(formData.get("titolo") ?? ""),
      sottotitolo: String(formData.get("sottotitolo") ?? ""),
      motto: String(formData.get("motto") ?? ""),
    },
  });
  revalidarSite();
}

export async function salvarStudio(formData: FormData) {
  const paragrafi = String(formData.get("paragrafi") ?? "")
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);
  await saveOverrides({
    studio: {
      titolo: String(formData.get("titolo") ?? ""),
      eventi: String(formData.get("eventiTexto") ?? ""),
      citazione: String(formData.get("citazione") ?? ""),
      paragrafi,
    },
  });
  revalidarSite();
}

export async function salvarKristina(formData: FormData) {
  const bio = String(formData.get("bio") ?? "")
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);
  await saveOverrides({
    kristina: {
      nome: String(formData.get("nome") ?? ""),
      ruolo: String(formData.get("ruolo") ?? ""),
      motto: String(formData.get("motto") ?? ""),
      bio,
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
        nome: String(formData.get("nome") ?? ""),
        sottotitolo: String(formData.get("sottotitolo") ?? ""),
        testo: String(formData.get("testo") ?? ""),
      },
    },
  });
  revalidarSite();
}

export async function salvarMassaggio(formData: FormData) {
  const chave = String(formData.get("chave") ?? "");
  if (!chave) return;
  const precoTxt = String(formData.get("prezzo") ?? "").trim();
  const atual = await getOverrides();
  await saveOverrides({
    massaggi: {
      ...atual.massaggi,
      [chave]: {
        durata: String(formData.get("durata") ?? ""),
        prezzo: precoTxt ? Number(precoTxt) : null,
        testo: String(formData.get("testo") ?? ""),
      },
    },
  });
  revalidarSite();
}

export async function salvarListino(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const base = listiniBase.find((l) => l.id === id);
  if (!base) return;
  const voci = base.voci.map((v, i) => ({
    nome: String(formData.get(`nome_${i}`) ?? v.nome),
    prezzo: String(formData.get(`prezzo_${i}`) ?? v.prezzo),
    nota: String(formData.get(`nota_${i}`) ?? v.nota),
  }));
  const note = formData.get("note");
  const atual = await getOverrides();
  await saveOverrides({
    listini: {
      ...atual.listini,
      [id]: { id: base.id, titolo: base.titolo, voci, ...(note ? { note: String(note) } : {}) },
    },
  });
  revalidarSite();
}

export async function salvarEventi(formData: FormData) {
  const nomes = formData.getAll("nome");
  const textos = formData.getAll("testo");
  const eventi = nomes
    .map((nome, i) => ({ nome: String(nome), testo: String(textos[i] ?? "") }))
    .filter((e) => e.nome.trim());
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
