// "Moldura" estática da home — textos que não vêm do /yomapanel (aria-labels,
// botões fixos, mensagens de WhatsApp). Conteúdo editável pela Kristina fica
// em src/content/yoma.ts + content-store.ts, não aqui.
import type { Locale } from "@/content/yoma";

export type SiteDicionario = {
  vaiAlContenuto: string;
  inizioPagina: string;
  navAriaLabel: string;
  prenota: string;
  lezioneDiProva: string;
  ilPreferito: string;
  caraAmica: string;
  ilMioMotto: string;
  loStudio: string;
  unoSpazioDedicato: string;
  aTe: string;
  cartaDeiMassaggi: string;
  ilTuoMomento: string;
  benessere: string;
  eventiESerate: string;
  prezziChf: string;
  primaLezioneGratis1: string;
  primaLezioneGratis2: string;
  galleriaAriaLabel: string;
  aPresto: string;
  unoSpazioUltimaRiga: string;
  instagramAriaLabel: string;
  facebookAriaLabel: string;
  copyright: string;
  whatsappPrenota: string;
  whatsappLezioneProva: string;
  whatsappInfoDisciplina: (nome: string) => string;
  menuApri: string;
  menuChiudi: string;
  menuMobileAriaLabel: string;
  menuPrenotaWhatsapp: string;
  parole: Record<string, string>;
};

export const siteDicionario: Record<Locale, SiteDicionario> = {
  it: {
    vaiAlContenuto: "Vai al contenuto",
    inizioPagina: "YomaTime, inizio pagina",
    navAriaLabel: "Principale",
    prenota: "Prenota",
    lezioneDiProva: "Lezione di prova",
    ilPreferito: "il preferito",
    caraAmica: "Cara amica,",
    ilMioMotto: "Il mio motto?",
    loStudio: "Lo Studio",
    unoSpazioDedicato: "Uno spazio dedicato",
    aTe: "a te",
    cartaDeiMassaggi: "Carta dei massaggi",
    ilTuoMomento: "Il tuo momento di",
    benessere: "benessere",
    eventiESerate: "Eventi e serate",
    prezziChf: "Prezzi · CHF",
    primaLezioneGratis1: "La prima lezione di gruppo",
    primaLezioneGratis2: "è un regalo",
    galleriaAriaLabel: "Galleria",
    aPresto: "A presto",
    unoSpazioUltimaRiga: "Uno spazio in cui ti dedichi del tempo.",
    instagramAriaLabel: "Instagram",
    facebookAriaLabel: "Facebook",
    copyright: "© 2026 YomaTime ·",
    whatsappPrenota: "Ciao Kristina, vorrei prenotare",
    whatsappLezioneProva: "Ciao Kristina, vorrei prenotare una lezione di prova",
    whatsappInfoDisciplina: (nome) => `Ciao Kristina, vorrei informazioni su ${nome}`,
    menuApri: "Apri il menu",
    menuChiudi: "Chiudi il menu",
    menuMobileAriaLabel: "Menu mobile",
    menuPrenotaWhatsapp: "Prenota su WhatsApp",
    parole: { yoga: "respiro", pilates: "equilibrio", reformer: "forza", massaggi: "cura" },
  },
  en: {
    vaiAlContenuto: "Skip to content",
    inizioPagina: "YomaTime, back to top",
    navAriaLabel: "Main",
    prenota: "Book now",
    lezioneDiProva: "Trial class",
    ilPreferito: "the favourite",
    caraAmica: "Dear friend,",
    ilMioMotto: "My motto?",
    loStudio: "The Studio",
    unoSpazioDedicato: "A space dedicated",
    aTe: "to you",
    cartaDeiMassaggi: "Our massage menu",
    ilTuoMomento: "Your moment of",
    benessere: "wellbeing",
    eventiESerate: "Events & evenings",
    prezziChf: "Prices · CHF",
    primaLezioneGratis1: "Your first group class",
    primaLezioneGratis2: "is on us",
    galleriaAriaLabel: "Gallery",
    aPresto: "See you soon",
    unoSpazioUltimaRiga: "A space where you take time for yourself.",
    instagramAriaLabel: "Instagram",
    facebookAriaLabel: "Facebook",
    copyright: "© 2026 YomaTime ·",
    whatsappPrenota: "Hi Kristina, I'd like to book",
    whatsappLezioneProva: "Hi Kristina, I'd like to book a trial class",
    whatsappInfoDisciplina: (nome) => `Hi Kristina, I'd like some information about ${nome}`,
    menuApri: "Open menu",
    menuChiudi: "Close menu",
    menuMobileAriaLabel: "Mobile menu",
    menuPrenotaWhatsapp: "Book on WhatsApp",
    parole: { yoga: "breath", pilates: "balance", reformer: "strength", massaggi: "care" },
  },
  pt: {
    vaiAlContenuto: "Ir para o conteúdo",
    inizioPagina: "YomaTime, início da página",
    navAriaLabel: "Principal",
    prenota: "Reservar",
    lezioneDiProva: "Aula experimental",
    ilPreferito: "o preferido",
    caraAmica: "Cara amiga,",
    ilMioMotto: "O meu lema?",
    loStudio: "O Estúdio",
    unoSpazioDedicato: "Um espaço dedicado",
    aTe: "a você",
    cartaDeiMassaggi: "Carta de massagens",
    ilTuoMomento: "O seu momento de",
    benessere: "bem-estar",
    eventiESerate: "Eventos e noites",
    prezziChf: "Preços · CHF",
    primaLezioneGratis1: "A primeira aula em grupo",
    primaLezioneGratis2: "é um presente",
    galleriaAriaLabel: "Galeria",
    aPresto: "Até breve",
    unoSpazioUltimaRiga: "Um espaço em que você dedica tempo a si mesma.",
    instagramAriaLabel: "Instagram",
    facebookAriaLabel: "Facebook",
    copyright: "© 2026 YomaTime ·",
    whatsappPrenota: "Olá Kristina, gostaria de reservar",
    whatsappLezioneProva: "Olá Kristina, gostaria de reservar uma aula experimental",
    whatsappInfoDisciplina: (nome) => `Olá Kristina, gostaria de informações sobre ${nome}`,
    menuApri: "Abrir menu",
    menuChiudi: "Fechar menu",
    menuMobileAriaLabel: "Menu mobile",
    menuPrenotaWhatsapp: "Reservar pelo WhatsApp",
    parole: { yoga: "respiro", pilates: "equilíbrio", reformer: "força", massaggi: "cuidado" },
  },
};

export function getSiteDicionario(locale: Locale): SiteDicionario {
  return siteDicionario[locale] ?? siteDicionario.it;
}
