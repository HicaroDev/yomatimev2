import { cookies } from "next/headers";
import { LOCALES, type Locale } from "@/content/yoma";
import { SISTEMA_LOCALE_COOKIE } from "./yomapanel-auth";
import { getPainelDicionario } from "@/dictionaries/painel";

const TAG_DATA: Record<Locale, string> = { it: "it-CH", en: "en-GB", pt: "pt-BR" };

export async function obterLocaleSistema(): Promise<Locale> {
  const valor = (await cookies()).get(SISTEMA_LOCALE_COOKIE)?.value;
  return LOCALES.includes(valor as Locale) ? (valor as Locale) : "it";
}

export async function obterDicionarioPainel() {
  const locale = await obterLocaleSistema();
  return { locale, t: getPainelDicionario(locale), tagData: TAG_DATA[locale] };
}
