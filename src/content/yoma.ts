// Conteúdo único do site — textos reais de yomatime.ch (setembro 2026).
// As três versões (v1, v2, v3) leem daqui: mudar um preço = mudar só este arquivo.

export const contatti = {
  nome: "YomaTime",
  titolare: "Kristina Dendena",
  indirizzo: "Via Bellinzona 61",
  cap: "6533 Lumino",
  telefono: "078 622 28 15",
  telefonoHref: "tel:+41786222815",
  email: "yomatime@gmail.com",
  whatsapp: "https://wa.me/41786222815",
  instagram: "https://www.instagram.com/yomatimeticino/",
  facebook: "https://www.facebook.com/kikidendena/",
  mappa: "https://maps.google.com/?q=Via+Bellinzona+61,+6533+Lumino",
};

export function whatsappMsg(testo: string) {
  return `${contatti.whatsapp}?text=${encodeURIComponent(testo)}`;
}

export const hero = {
  titolo: "YomaTime, uno spazio dedicato a Te",
  sottotitolo:
    "Yoga, Pilates e Massaggi per ritrovare energia, equilibrio e benessere, dedicandoti il tempo che meriti.",
  motto: "Il tempo per te",
};

export const studio = {
  titolo: "YomaTime, uno spazio dedicato a te.",
  paragrafi: [
    "YomaTime è uno studio in continua evoluzione, dove il benessere e l’armonia diventano esperienza quotidiana per chi lo frequenta.",
    "Offriamo lezioni di gruppo di Yoga e Pilates, trattamenti e massaggi, oltre a diversi percorsi dedicati alla cura di sé.",
    "Accanto al già affermato Matwork è arrivato anche il Reformer, una pratica completa che unisce forza, controllo e fluidità del movimento. Le lezioni sono proposte in formula individuale o di coppia e presto anche in piccoli gruppi.",
  ],
  eventi:
    "In collaborazione con altri professionisti proponiamo eventi e serate dedicate al benessere: bagni sonori con campane tibetane, Om chanting, training autogeno e molte altre esperienze rigeneranti.",
  citazione: "Prenditi il tuo tempo. Respira, ascoltati, ritrova te stessa.",
};

export const kristina = {
  nome: "Kristina Dendena",
  ruolo: "Fondatrice · Terapista Complementare",
  motto: "Radiate Positivity",
  bio: [
    "Dopo la laurea in Relazioni Internazionali in Ungheria, la vita mi ha portata a viaggiare molto e a conoscere culture diverse. Da sempre amo il movimento e il contatto umano: la danza, lo sport e la natura fanno parte del mio equilibrio.",
    "Trasferendomi in Svizzera ho scoperto una nuova strada, dedicandomi allo yoga, al Pilates e ai massaggi, fino a diventare Terapista Complementare. Così è nato YomaTime.",
    "Ti aspetto con gioia alle mie lezioni, dove metto tutta la mia esperienza e professionalità per accompagnarti in un percorso che ti aiuti a ritrovare energia, armonia e fiducia in te stessa.",
  ],
};

export type Disciplina = {
  id: string;
  nome: string;
  sottotitolo: string;
  testo: string;
  immagine: string;
  alt: string;
};

export const discipline: Disciplina[] = [
  {
    id: "yoga",
    nome: "Yoga",
    sottotitolo: "Armonia, presenza, energia",
    testo:
      "Pratiche basate sullo Hatha Yoga: armonizzano mente e corpo, stimolano la consapevolezza, favoriscono la corretta respirazione, rafforzano e allungano i muscoli e aiutano a ritrovare equilibrio, calma e leggerezza.",
    immagine: "/img/yoga-sala.jpg",
    alt: "Pratica di yoga in una sala luminosa",
  },
  {
    id: "pilates",
    nome: "Pilates Mat",
    sottotitolo: "Forza, equilibrio e armonia",
    testo:
      "Principi del Pilates classico integrati con il Pilates contemporaneo. A corpo libero su tappetino e con piccoli attrezzi — elastici, Magic Circle, palline — per tonificare i muscoli profondi e migliorare la postura.",
    immagine: "/img/pilates-mat-1.jpg",
    alt: "Esercizio di Pilates a corpo libero",
  },
  {
    id: "reformer",
    nome: "Pilates Reformer",
    sottotitolo: "Un’esperienza personalizzata",
    testo:
      "Macchine con molle regolabili che offrono resistenza variabile e sostegno mirato: movimenti più precisi e intensi, per lavorare insieme su forza, allungamento, stabilità e controllo posturale. Individuale o in duetto.",
    immagine: "/img/studio-reformer.jpg",
    alt: "I due Reformer dello studio YomaTime a Lumino",
  },
  {
    id: "massaggi",
    nome: "Massaggi",
    sottotitolo: "Il tuo momento di benessere",
    testo:
      "Trattamenti pensati come prevenzione, mantenimento della salute e riduzione dello stress. Terapista Complementare riconosciuta dalle casse malati in Svizzera.",
    immagine: "/img/massaggio-viso.jpg",
    alt: "Trattamento rilassante al viso e al collo",
  },
];

export type Massaggio = {
  nome: string;
  durata: string;
  prezzo: number | null;
  testo: string;
  immagine: string;
  preferito?: boolean;
};

export const massaggi: Massaggio[] = [
  {
    nome: "Massaggio Rilassante",
    durata: "60’",
    prezzo: 110,
    testo:
      "Per chi desidera fermarsi, respirare e lasciar andare le tensioni quotidiane. Il trattamento più amato di tutti.",
    immagine: "/img/massaggio-rilassante.jpg",
    preferito: true,
  },
  {
    nome: "Massaggio Hot Stone",
    durata: "60’",
    prezzo: 120,
    testo:
      "Il calore delle pietre laviche avvolge il corpo, scioglie le tensioni e ristabilisce equilibrio ed energia vitale.",
    immagine: "/img/massaggio-hotstone.jpg",
    preferito: true,
  },
  {
    nome: "Massaggio Classico",
    durata: "50’",
    prezzo: null,
    testo: "Rilassa i muscoli, allevia le tensioni e migliora la circolazione.",
    immagine: "/img/massaggio-collo.jpg",
  },
  {
    nome: "Massaggio Schiena",
    durata: "30’",
    prezzo: 60,
    testo:
      "Mirato a zona cervicale, dorsale e lombare: allevia rigidità e dolori da stress, migliora la postura.",
    immagine: "/img/massaggio-schiena.jpg",
  },
  {
    nome: "Massaggio Drenante",
    durata: "50’",
    prezzo: 110,
    testo:
      "Movimenti leggeri che stimolano la circolazione linfatica, per ridurre gonfiori e pesantezza alle gambe.",
    immagine: "/img/massaggio-drenante.jpg",
  },
  {
    nome: "Anticellulite con coppette",
    durata: "50’",
    prezzo: 120,
    testo:
      "Coppette in silicone medico: stimolano la circolazione e ridonano tonicità ed elasticità alla pelle.",
    immagine: "/img/massaggio-coppette.jpg",
  },
  {
    nome: "Manager Massage",
    durata: "15’",
    prezzo: 40,
    testo:
      "Sulla sedia ergonomica, attraverso gli abiti e senza olio. Ideale per chi lavora seduto: schiena, spalle e collo.",
    immagine: "/img/massaggio-spalle.jpg",
  },
];

export type Voce = { nome: string; prezzo: string; nota: string };
export type Listino = { id: string; titolo: string; voci: Voce[]; note?: string };

export const listini: Listino[] = [
  {
    id: "gruppo",
    titolo: "Corsi di gruppo",
    voci: [
      { nome: "Lezione di prova", prezzo: "gratis", nota: "prima volta" },
      { nome: "Lezione singola", prezzo: "25", nota: "1 entrata" },
      { nome: "Pacchetto 5 lezioni", prezzo: "110", nota: "validità 2 mesi" },
      { nome: "Pacchetto 10 lezioni", prezzo: "200", nota: "validità 3 mesi" },
      { nome: "10 lezioni Junior (sotto i 18 anni)", prezzo: "160", nota: "validità 3 mesi" },
      { nome: "Abbonamento semestrale", prezzo: "680", nota: "per persona, 6 mesi" },
      { nome: "Lezione privata in studio", prezzo: "70", nota: "massimo 2 persone" },
      { nome: "Yoga / Pilates a domicilio", prezzo: "90", nota: "per lezione" },
    ],
  },
  {
    id: "reformer",
    titolo: "Pilates Reformer",
    voci: [
      { nome: "Lezione di prova", prezzo: "35", nota: "per persona" },
      { nome: "Lezione privata 60’", prezzo: "80", nota: "1 entrata" },
      { nome: "5 lezioni private", prezzo: "390", nota: "validità 2 mesi" },
      { nome: "10 lezioni private", prezzo: "760", nota: "validità 3 mesi" },
      { nome: "Duetto — lezione in coppia", prezzo: "45", nota: "per persona" },
      { nome: "5 lezioni in coppia", prezzo: "210", nota: "per persona, 2 mesi" },
      { nome: "10 lezioni in coppia", prezzo: "400", nota: "per persona, 3 mesi" },
    ],
  },
  {
    id: "massaggi",
    titolo: "Massaggi",
    voci: [
      { nome: "Massaggio rilassante 60’", prezzo: "110", nota: "a seduta" },
      { nome: "Massaggio Hot Stone 60’", prezzo: "120", nota: "a seduta" },
      { nome: "Anticellulite con coppette 50’", prezzo: "120", nota: "a seduta" },
      { nome: "Massaggio drenante 50’", prezzo: "110", nota: "a seduta" },
      { nome: "Massaggio schiena 30’", prezzo: "60", nota: "a seduta" },
      { nome: "Manager Massage 15’", prezzo: "40", nota: "sedia ergonomica" },
    ],
    note: "Pacchetti da 10 massaggi: sconto del 10%. Pacchetti e buoni regalo validi 1 anno.",
  },
];

export const eventi = [
  { nome: "Bagno sonoro", testo: "Campane tibetane per un rilassamento profondo." },
  { nome: "Om Chanting", testo: "La voce come strumento di presenza." },
  { nome: "Meditazione", testo: "Serate guidate per ritrovare calma." },
  { nome: "Reiki", testo: "Corsi e trattamenti con professionisti ospiti." },
];

export const galleria = [
  { src: "/img/studio-lezione-reformer.jpg", alt: "Lezione di Pilates Reformer nello studio", w: 1350, h: 1800 },
  { src: "/img/studio-sala.jpg", alt: "La sala dello studio con le finestre ad arco", w: 1200, h: 1600 },
  { src: "/img/studio-reformer-2.jpg", alt: "I Reformer sotto le finestre ad arco", w: 1350, h: 1800 },
  { src: "/img/studio-verticale.jpg", alt: "Verticale sul tappetino nello studio", w: 1600, h: 1200 },
  { src: "/img/studio-reformer-3.jpg", alt: "Reformer con la palla rosa e il quadro Radiate Positivity", w: 1350, h: 1800 },
  { src: "/img/studio-sala-2.jpg", alt: "Reformer e box in legno chiaro", w: 1200, h: 1600 },
  { src: "/img/studio-yoga-bimbi.jpg", alt: "Yoga per bambini nello studio", w: 765, h: 566 },
  { src: "/img/studio-reformer.jpg", alt: "I Reformer dello studio", w: 1800, h: 1350 },
  { src: "/img/yoga-lago.jpg", alt: "Yoga in riva al lago", w: 1800, h: 1200 },
];

export const nav = [
  { href: "#studio", label: "Lo Studio" },
  { href: "#corsi", label: "Corsi" },
  { href: "#reformer", label: "Reformer" },
  { href: "#massaggi", label: "Massaggi" },
  { href: "#prezzi", label: "Prezzi" },
  { href: "#contatti", label: "Contatti" },
];

export const avvertenzaMassaggi =
  "Si prega di presentarsi almeno 5 minuti prima dell’appuntamento. Il massaggio benessere è sconsigliato in caso di traumi recenti, infiammazioni acute, febbre, fratture, gravidanza e gravi patologie cardio-circolatorie: in caso di dubbio chiedi a Kristina.";
