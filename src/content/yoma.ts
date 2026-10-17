// Conteúdo único do site — textos reais de yomatime.ch (setembro 2026), em 3 idiomas.
// As três versões (v1, v2, v3) historicamente liam daqui; hoje só a home (v3, multi-idioma)
// usa os campos {it,en,pt}. v1/v2 continuam só em italiano e leem os campos .it direto.
// Mudar um preço = mudar só este arquivo (ou, em produção, pelo /yomapanel).

export type Locale = "it" | "en" | "pt";
export const LOCALES: Locale[] = ["it", "en", "pt"];
export const LOCALE_PADRAO: Locale = "it";

export type Texto = { it: string; en: string; pt: string };
export type TextoLista = { it: string[]; en: string[]; pt: string[] };

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
  titolo: {
    it: "YomaTime, uno spazio dedicato a Te",
    en: "YomaTime, a space dedicated to you",
    pt: "YomaTime, um espaço dedicado a você",
  } as Texto,
  sottotitolo: {
    it: "Yoga, Pilates e Massaggi per ritrovare energia, equilibrio e benessere, dedicandoti il tempo che meriti.",
    en: "Yoga, Pilates and Massage to rediscover energy, balance and wellbeing — giving yourself the time you deserve.",
    pt: "Yoga, Pilates e Massagens para redescobrir energia, equilíbrio e bem-estar, dedicando a si mesma o tempo que merece.",
  } as Texto,
  motto: { it: "Il tempo per te", en: "Time for you", pt: "O tempo para você" } as Texto,
};

export const studio = {
  titolo: {
    it: "YomaTime, uno spazio dedicato a te.",
    en: "YomaTime, a space dedicated to you.",
    pt: "YomaTime, um espaço dedicado a você.",
  } as Texto,
  paragrafi: {
    it: [
      "YomaTime è uno studio in continua evoluzione, dove il benessere e l’armonia diventano esperienza quotidiana per chi lo frequenta.",
      "Offriamo lezioni di gruppo di Yoga e Pilates, trattamenti e massaggi, oltre a diversi percorsi dedicati alla cura di sé.",
      "Accanto al già affermato Matwork è arrivato anche il Reformer, una pratica completa che unisce forza, controllo e fluidità del movimento. Le lezioni sono proposte in formula individuale o di coppia e presto anche in piccoli gruppi.",
    ],
    en: [
      "YomaTime is a studio in constant evolution, where wellbeing and harmony become a daily experience for everyone who comes here.",
      "We offer group Yoga and Pilates classes, treatments and massages, as well as several paths dedicated to self-care.",
      "Alongside the already well-established Matwork, the Reformer has now arrived too — a complete practice that combines strength, control and fluidity of movement. Classes are offered individually or in pairs, and soon in small groups as well.",
    ],
    pt: [
      "A YomaTime é um estúdio em constante evolução, onde o bem-estar e a harmonia se tornam uma experiência diária para quem a frequenta.",
      "Oferecemos aulas em grupo de Yoga e Pilates, tratamentos e massagens, além de diversos percursos dedicados ao autocuidado.",
      "Ao lado do já consolidado Matwork, chegou também o Reformer, uma prática completa que une força, controle e fluidez de movimento. As aulas são oferecidas em formato individual ou em dupla, e em breve também em pequenos grupos.",
    ],
  } as TextoLista,
  eventi: {
    it: "In collaborazione con altri professionisti proponiamo eventi e serate dedicate al benessere: bagni sonori con campane tibetane, Om chanting, training autogeno e molte altre esperienze rigeneranti.",
    en: "In collaboration with other professionals, we offer events and evenings dedicated to wellbeing: sound baths with Tibetan bowls, Om chanting, autogenic training and many other restorative experiences.",
    pt: "Em colaboração com outros profissionais, propomos eventos e noites dedicadas ao bem-estar: banhos sonoros com sinos tibetanos, Om chanting, treinamento autógeno e muitas outras experiências regenerativas.",
  } as Texto,
  citazione: {
    it: "Prenditi il tuo tempo. Respira, ascoltati, ritrova te stessa.",
    en: "Take your time. Breathe, listen to yourself, find yourself again.",
    pt: "Dedique o seu tempo. Respire, ouça-se, reencontre-se.",
  } as Texto,
};

export const kristina = {
  nome: "Kristina Dendena",
  ruolo: {
    it: "Fondatrice · Terapista Complementare",
    en: "Founder · Complementary Therapist",
    pt: "Fundadora · Terapeuta Complementar",
  } as Texto,
  motto: { it: "Radiate Positivity", en: "Radiate Positivity", pt: "Radiate Positivity" } as Texto,
  bio: {
    it: [
      "Dopo la laurea in Relazioni Internazionali in Ungheria, la vita mi ha portata a viaggiare molto e a conoscere culture diverse. Da sempre amo il movimento e il contatto umano: la danza, lo sport e la natura fanno parte del mio equilibrio.",
      "Trasferendomi in Svizzera ho scoperto una nuova strada, dedicandomi allo yoga, al Pilates e ai massaggi, fino a diventare Terapista Complementare. Così è nato YomaTime.",
      "Ti aspetto con gioia alle mie lezioni, dove metto tutta la mia esperienza e professionalità per accompagnarti in un percorso che ti aiuti a ritrovare energia, armonia e fiducia in te stessa.",
    ],
    en: [
      "After graduating in International Relations in Hungary, life took me travelling a great deal and introduced me to many different cultures. I have always loved movement and human connection: dance, sport and nature are all part of my own balance.",
      "Moving to Switzerland, I discovered a new path, devoting myself to yoga, Pilates and massage, eventually becoming a Complementary Therapist. That is how YomaTime was born.",
      "I look forward to welcoming you to my classes, where I bring all my experience and professionalism to accompany you on a path that helps you rediscover energy, harmony and confidence in yourself.",
    ],
    pt: [
      "Depois de me formar em Relações Internacionais na Hungria, a vida me levou a viajar muito e a conhecer culturas diferentes. Sempre amei o movimento e o contato humano: a dança, o esporte e a natureza fazem parte do meu equilíbrio.",
      "Ao me mudar para a Suíça, descobri um novo caminho, dedicando-me ao yoga, ao Pilates e às massagens, até me tornar Terapeuta Complementar. Foi assim que nasceu a YomaTime.",
      "Espero você com alegria nas minhas aulas, onde coloco toda a minha experiência e profissionalismo para acompanhá-la num percurso que ajude a redescobrir energia, harmonia e confiança em si mesma.",
    ],
  } as TextoLista,
};

export type Disciplina = {
  id: string;
  nome: Texto;
  sottotitolo: Texto;
  testo: Texto;
  immagine: string;
  alt: Texto;
};

export const discipline: Disciplina[] = [
  {
    id: "yoga",
    nome: { it: "Yoga", en: "Yoga", pt: "Yoga" },
    sottotitolo: { it: "Armonia, presenza, energia", en: "Harmony, presence, energy", pt: "Harmonia, presença, energia" },
    testo: {
      it: "Pratiche basate sullo Hatha Yoga: armonizzano mente e corpo, stimolano la consapevolezza, favoriscono la corretta respirazione, rafforzano e allungano i muscoli e aiutano a ritrovare equilibrio, calma e leggerezza.",
      en: "Practices based on Hatha Yoga: they harmonise mind and body, encourage awareness, promote correct breathing, strengthen and lengthen the muscles, and help you rediscover balance, calm and lightness.",
      pt: "Práticas baseadas no Hatha Yoga: harmonizam mente e corpo, estimulam a consciência, favorecem a respiração correta, fortalecem e alongam os músculos e ajudam a redescobrir equilíbrio, calma e leveza.",
    },
    immagine: "/img/yoga-sala.jpg",
    alt: {
      it: "Pratica di yoga in una sala luminosa",
      en: "Yoga practice in a bright studio room",
      pt: "Prática de yoga numa sala iluminada",
    },
  },
  {
    id: "pilates",
    nome: { it: "Pilates Mat", en: "Pilates Mat", pt: "Pilates Mat" },
    sottotitolo: { it: "Forza, equilibrio e armonia", en: "Strength, balance and harmony", pt: "Força, equilíbrio e harmonia" },
    testo: {
      it: "Principi del Pilates classico integrati con il Pilates contemporaneo. A corpo libero su tappetino e con piccoli attrezzi — elastici, Magic Circle, palline — per tonificare i muscoli profondi e migliorare la postura.",
      en: "Classical Pilates principles integrated with contemporary Pilates. Bodyweight work on the mat and with small equipment — resistance bands, Magic Circle, small balls — to tone the deep muscles and improve posture.",
      pt: "Princípios do Pilates clássico integrados com o Pilates contemporâneo. Trabalho de corpo livre no tapete e com pequenos equipamentos — elásticos, Magic Circle, bolinhas — para tonificar os músculos profundos e melhorar a postura.",
    },
    immagine: "/img/pilates-mat-1.jpg",
    alt: {
      it: "Esercizio di Pilates a corpo libero",
      en: "Bodyweight Pilates exercise",
      pt: "Exercício de Pilates de corpo livre",
    },
  },
  {
    id: "reformer",
    nome: { it: "Pilates Reformer", en: "Pilates Reformer", pt: "Pilates Reformer" },
    sottotitolo: { it: "Un’esperienza personalizzata", en: "A personalised experience", pt: "Uma experiência personalizada" },
    testo: {
      it: "Macchine con molle regolabili che offrono resistenza variabile e sostegno mirato: movimenti più precisi e intensi, per lavorare insieme su forza, allungamento, stabilità e controllo posturale. Individuale o in duetto.",
      en: "Machines with adjustable springs offering variable resistance and targeted support: more precise and intense movements, working together on strength, lengthening, stability and postural control. Individual or in pairs.",
      pt: "Máquinas com molas ajustáveis que oferecem resistência variável e apoio direcionado: movimentos mais precisos e intensos, trabalhando ao mesmo tempo força, alongamento, estabilidade e controle postural. Individual ou em dupla.",
    },
    immagine: "/img/studio-reformer.jpg",
    alt: {
      it: "I due Reformer dello studio YomaTime a Lumino",
      en: "The two Reformer machines at the YomaTime studio in Lumino",
      pt: "Os dois Reformers do estúdio YomaTime em Lumino",
    },
  },
  {
    id: "massaggi",
    nome: { it: "Massaggi", en: "Massages", pt: "Massagens" },
    sottotitolo: { it: "Il tuo momento di benessere", en: "Your moment of wellbeing", pt: "O seu momento de bem-estar" },
    testo: {
      it: "Trattamenti pensati come prevenzione, mantenimento della salute e riduzione dello stress. Terapista Complementare riconosciuta dalle casse malati in Svizzera.",
      en: "Treatments designed for prevention, maintaining health and reducing stress. Recognised Complementary Therapist, covered by Swiss supplementary health insurance.",
      pt: "Tratamentos pensados para prevenção, manutenção da saúde e redução do estresse. Terapeuta Complementar reconhecida pelos seguros de saúde suíços.",
    },
    immagine: "/img/massaggio-viso.jpg",
    alt: {
      it: "Trattamento rilassante al viso e al collo",
      en: "Relaxing face and neck treatment",
      pt: "Tratamento relaxante para rosto e pescoço",
    },
  },
];

export type Massaggio = {
  id: string;
  nome: Texto;
  durata: string;
  prezzo: number | null;
  testo: Texto;
  immagine: string;
  preferito?: boolean;
};

export const massaggi: Massaggio[] = [
  {
    id: "rilassante",
    nome: { it: "Massaggio Rilassante", en: "Relaxing Massage", pt: "Massagem Relaxante" },
    durata: "60’",
    prezzo: 110,
    testo: {
      it: "Per chi desidera fermarsi, respirare e lasciar andare le tensioni quotidiane. Il trattamento più amato di tutti.",
      en: "For anyone who wants to pause, breathe and let go of everyday tension. Our most loved treatment.",
      pt: "Para quem deseja parar, respirar e soltar as tensões do dia a dia. O tratamento mais amado de todos.",
    },
    immagine: "/img/massaggio-rilassante.jpg",
    preferito: true,
  },
  {
    id: "hot-stone",
    nome: { it: "Massaggio Hot Stone", en: "Hot Stone Massage", pt: "Massagem com Pedras Vulcânicas" },
    durata: "60’",
    prezzo: 120,
    testo: {
      it: "Il calore delle pietre laviche avvolge il corpo, scioglie le tensioni e ristabilisce equilibrio ed energia vitale.",
      en: "The warmth of volcanic stones envelops the body, melts away tension and restores balance and vital energy.",
      pt: "O calor das pedras vulcânicas envolve o corpo, dissolve as tensões e restabelece o equilíbrio e a energia vital.",
    },
    immagine: "/img/massaggio-hotstone.jpg",
    preferito: true,
  },
  {
    id: "classico",
    nome: { it: "Massaggio Classico", en: "Classic Massage", pt: "Massagem Clássica" },
    durata: "50’",
    prezzo: null,
    testo: {
      it: "Rilassa i muscoli, allevia le tensioni e migliora la circolazione.",
      en: "Relaxes the muscles, relieves tension and improves circulation.",
      pt: "Relaxa os músculos, alivia as tensões e melhora a circulação.",
    },
    immagine: "/img/massaggio-collo.jpg",
  },
  {
    id: "schiena",
    nome: { it: "Massaggio Schiena", en: "Back Massage", pt: "Massagem nas Costas" },
    durata: "30’",
    prezzo: 60,
    testo: {
      it: "Mirato a zona cervicale, dorsale e lombare: allevia rigidità e dolori da stress, migliora la postura.",
      en: "Targets the neck, upper and lower back: relieves stiffness and stress-related pain, improves posture.",
      pt: "Direcionada à região cervical, dorsal e lombar: alivia rigidez e dores causadas pelo estresse, melhora a postura.",
    },
    immagine: "/img/massaggio-schiena.jpg",
  },
  {
    id: "drenante",
    nome: { it: "Massaggio Drenante", en: "Lymphatic Drainage Massage", pt: "Massagem Drenante" },
    durata: "50’",
    prezzo: 110,
    testo: {
      it: "Movimenti leggeri che stimolano la circolazione linfatica, per ridurre gonfiori e pesantezza alle gambe.",
      en: "Light movements that stimulate lymphatic circulation, reducing swelling and heaviness in the legs.",
      pt: "Movimentos leves que estimulam a circulação linfática, reduzindo inchaço e peso nas pernas.",
    },
    immagine: "/img/massaggio-drenante.jpg",
  },
  {
    id: "coppette",
    nome: { it: "Anticellulite con coppette", en: "Anti-cellulite Cupping Massage", pt: "Anticelulite com Ventosas" },
    durata: "50’",
    prezzo: 120,
    testo: {
      it: "Coppette in silicone medico: stimolano la circolazione e ridonano tonicità ed elasticità alla pelle.",
      en: "Medical-grade silicone cups: stimulate circulation and restore tone and elasticity to the skin.",
      pt: "Ventosas em silicone médico: estimulam a circulação e devolvem tonicidade e elasticidade à pele.",
    },
    immagine: "/img/massaggio-coppette.jpg",
  },
  {
    id: "manager",
    nome: { it: "Manager Massage", en: "Manager Massage", pt: "Manager Massage" },
    durata: "15’",
    prezzo: 40,
    testo: {
      it: "Sulla sedia ergonomica, attraverso gli abiti e senza olio. Ideale per chi lavora seduto: schiena, spalle e collo.",
      en: "On the ergonomic chair, over clothing and without oil. Ideal for anyone who works seated: back, shoulders and neck.",
      pt: "Na cadeira ergonômica, sobre a roupa e sem óleo. Ideal para quem trabalha sentado: costas, ombros e pescoço.",
    },
    immagine: "/img/massaggio-spalle.jpg",
  },
];

export type Voce = { nome: Texto; prezzo: Texto; nota: Texto };
export type Listino = { id: string; titolo: Texto; voci: Voce[]; note?: Texto };

export const listini: Listino[] = [
  {
    id: "gruppo",
    titolo: { it: "Corsi di gruppo", en: "Group classes", pt: "Aulas em grupo" },
    voci: [
      {
        nome: { it: "Lezione di prova", en: "Trial class", pt: "Aula experimental" },
        prezzo: { it: "gratis", en: "free", pt: "gratuito" },
        nota: { it: "prima volta", en: "first time", pt: "primeira vez" },
      },
      {
        nome: { it: "Lezione singola", en: "Single class", pt: "Aula individual" },
        prezzo: { it: "25", en: "25", pt: "25" },
        nota: { it: "1 entrata", en: "1 entry", pt: "1 entrada" },
      },
      {
        nome: { it: "Pacchetto 5 lezioni", en: "5-class package", pt: "Pacote de 5 aulas" },
        prezzo: { it: "110", en: "110", pt: "110" },
        nota: { it: "validità 2 mesi", en: "valid 2 months", pt: "validade de 2 meses" },
      },
      {
        nome: { it: "Pacchetto 10 lezioni", en: "10-class package", pt: "Pacote de 10 aulas" },
        prezzo: { it: "200", en: "200", pt: "200" },
        nota: { it: "validità 3 mesi", en: "valid 3 months", pt: "validade de 3 meses" },
      },
      {
        nome: { it: "10 lezioni Junior (sotto i 18 anni)", en: "10 Junior classes (under 18)", pt: "10 aulas Junior (menores de 18 anos)" },
        prezzo: { it: "160", en: "160", pt: "160" },
        nota: { it: "validità 3 mesi", en: "valid 3 months", pt: "validade de 3 meses" },
      },
      {
        nome: { it: "Abbonamento semestrale", en: "Six-month membership", pt: "Assinatura semestral" },
        prezzo: { it: "680", en: "680", pt: "680" },
        nota: { it: "per persona, 6 mesi", en: "per person, 6 months", pt: "por pessoa, 6 meses" },
      },
      {
        nome: { it: "Lezione privata in studio", en: "Private class in studio", pt: "Aula privada no estúdio" },
        prezzo: { it: "70", en: "70", pt: "70" },
        nota: { it: "massimo 2 persone", en: "maximum 2 people", pt: "máximo de 2 pessoas" },
      },
      {
        nome: { it: "Yoga / Pilates a domicilio", en: "Yoga / Pilates at home", pt: "Yoga / Pilates a domicílio" },
        prezzo: { it: "90", en: "90", pt: "90" },
        nota: { it: "per lezione", en: "per class", pt: "por aula" },
      },
    ],
  },
  {
    id: "reformer",
    titolo: { it: "Pilates Reformer", en: "Pilates Reformer", pt: "Pilates Reformer" },
    voci: [
      {
        nome: { it: "Lezione di prova", en: "Trial class", pt: "Aula experimental" },
        prezzo: { it: "35", en: "35", pt: "35" },
        nota: { it: "per persona", en: "per person", pt: "por pessoa" },
      },
      {
        nome: { it: "Lezione privata 60’", en: "Private class 60’", pt: "Aula privada 60’" },
        prezzo: { it: "80", en: "80", pt: "80" },
        nota: { it: "1 entrata", en: "1 entry", pt: "1 entrada" },
      },
      {
        nome: { it: "5 lezioni private", en: "5 private classes", pt: "5 aulas privadas" },
        prezzo: { it: "390", en: "390", pt: "390" },
        nota: { it: "validità 2 mesi", en: "valid 2 months", pt: "validade de 2 meses" },
      },
      {
        nome: { it: "10 lezioni private", en: "10 private classes", pt: "10 aulas privadas" },
        prezzo: { it: "760", en: "760", pt: "760" },
        nota: { it: "validità 3 mesi", en: "valid 3 months", pt: "validade de 3 meses" },
      },
      {
        nome: { it: "Duetto — lezione in coppia", en: "Duet — class in pairs", pt: "Dupla — aula em dupla" },
        prezzo: { it: "45", en: "45", pt: "45" },
        nota: { it: "per persona", en: "per person", pt: "por pessoa" },
      },
      {
        nome: { it: "5 lezioni in coppia", en: "5 classes in pairs", pt: "5 aulas em dupla" },
        prezzo: { it: "210", en: "210", pt: "210" },
        nota: { it: "per persona, 2 mesi", en: "per person, 2 months", pt: "por pessoa, 2 meses" },
      },
      {
        nome: { it: "10 lezioni in coppia", en: "10 classes in pairs", pt: "10 aulas em dupla" },
        prezzo: { it: "400", en: "400", pt: "400" },
        nota: { it: "per persona, 3 mesi", en: "per person, 3 months", pt: "por pessoa, 3 meses" },
      },
    ],
  },
  {
    id: "massaggi",
    titolo: { it: "Massaggi", en: "Massages", pt: "Massagens" },
    voci: [
      {
        nome: { it: "Massaggio rilassante 60’", en: "Relaxing massage 60’", pt: "Massagem relaxante 60’" },
        prezzo: { it: "110", en: "110", pt: "110" },
        nota: { it: "a seduta", en: "per session", pt: "por sessão" },
      },
      {
        nome: { it: "Massaggio Hot Stone 60’", en: "Hot Stone massage 60’", pt: "Massagem com pedras vulcânicas 60’" },
        prezzo: { it: "120", en: "120", pt: "120" },
        nota: { it: "a seduta", en: "per session", pt: "por sessão" },
      },
      {
        nome: { it: "Anticellulite con coppette 50’", en: "Anti-cellulite cupping 50’", pt: "Anticelulite com ventosas 50’" },
        prezzo: { it: "120", en: "120", pt: "120" },
        nota: { it: "a seduta", en: "per session", pt: "por sessão" },
      },
      {
        nome: { it: "Massaggio drenante 50’", en: "Lymphatic drainage massage 50’", pt: "Massagem drenante 50’" },
        prezzo: { it: "110", en: "110", pt: "110" },
        nota: { it: "a seduta", en: "per session", pt: "por sessão" },
      },
      {
        nome: { it: "Massaggio schiena 30’", en: "Back massage 30’", pt: "Massagem nas costas 30’" },
        prezzo: { it: "60", en: "60", pt: "60" },
        nota: { it: "a seduta", en: "per session", pt: "por sessão" },
      },
      {
        nome: { it: "Manager Massage 15’", en: "Manager Massage 15’", pt: "Manager Massage 15’" },
        prezzo: { it: "40", en: "40", pt: "40" },
        nota: { it: "sedia ergonomica", en: "ergonomic chair", pt: "cadeira ergonômica" },
      },
    ],
    note: {
      it: "Pacchetti da 10 massaggi: sconto del 10%. Pacchetti e buoni regalo validi 1 anno.",
      en: "Packages of 10 massages: 10% discount. Packages and gift vouchers valid for 1 year.",
      pt: "Pacotes de 10 massagens: desconto de 10%. Pacotes e vales-presente válidos por 1 ano.",
    },
  },
];

export type Evento = { id: string; nome: Texto; testo: Texto };

export const eventi: Evento[] = [
  {
    id: "bagno-sonoro",
    nome: { it: "Bagno sonoro", en: "Sound Bath", pt: "Banho Sonoro" },
    testo: {
      it: "Campane tibetane per un rilassamento profondo.",
      en: "Tibetan bowls for deep relaxation.",
      pt: "Sinos tibetanos para um relaxamento profundo.",
    },
  },
  {
    id: "om-chanting",
    nome: { it: "Om Chanting", en: "Om Chanting", pt: "Om Chanting" },
    testo: {
      it: "La voce come strumento di presenza.",
      en: "The voice as a tool for presence.",
      pt: "A voz como instrumento de presença.",
    },
  },
  {
    id: "meditazione",
    nome: { it: "Meditazione", en: "Meditation", pt: "Meditação" },
    testo: {
      it: "Serate guidate per ritrovare calma.",
      en: "Guided evenings to rediscover calm.",
      pt: "Noites guiadas para redescobrir a calma.",
    },
  },
  {
    id: "reiki",
    nome: { it: "Reiki", en: "Reiki", pt: "Reiki" },
    testo: {
      it: "Corsi e trattamenti con professionisti ospiti.",
      en: "Courses and treatments with guest professionals.",
      pt: "Cursos e tratamentos com profissionais convidados.",
    },
  },
];

export const galleria = [
  {
    src: "/img/studio-lezione-reformer.jpg",
    alt: {
      it: "Lezione di Pilates Reformer nello studio",
      en: "Pilates Reformer class in the studio",
      pt: "Aula de Pilates Reformer no estúdio",
    } as Texto,
    w: 1350,
    h: 1800,
  },
  {
    src: "/img/studio-sala.jpg",
    alt: {
      it: "La sala dello studio con le finestre ad arco",
      en: "The studio room with arched windows",
      pt: "A sala do estúdio com janelas em arco",
    } as Texto,
    w: 1200,
    h: 1600,
  },
  {
    src: "/img/studio-reformer-2.jpg",
    alt: {
      it: "I Reformer sotto le finestre ad arco",
      en: "The Reformer machines under the arched windows",
      pt: "Os Reformers sob as janelas em arco",
    } as Texto,
    w: 1350,
    h: 1800,
  },
  {
    src: "/img/studio-verticale.jpg",
    alt: { it: "Verticale sul tappetino nello studio", en: "Handstand on the mat in the studio", pt: "Vertical no tapete do estúdio" } as Texto,
    w: 1600,
    h: 1200,
  },
  {
    src: "/img/studio-reformer-3.jpg",
    alt: {
      it: "Reformer con la palla rosa e il quadro Radiate Positivity",
      en: "Reformer with the pink ball and the “Radiate Positivity” print",
      pt: "Reformer com a bola rosa e o quadro Radiate Positivity",
    } as Texto,
    w: 1350,
    h: 1800,
  },
  {
    src: "/img/studio-sala-2.jpg",
    alt: { it: "Reformer e box in legno chiaro", en: "Reformer and light wood storage box", pt: "Reformer e caixa de madeira clara" } as Texto,
    w: 1200,
    h: 1600,
  },
  {
    src: "/img/studio-yoga-bimbi.jpg",
    alt: { it: "Yoga per bambini nello studio", en: "Kids’ yoga in the studio", pt: "Yoga para crianças no estúdio" } as Texto,
    w: 765,
    h: 566,
  },
  {
    src: "/img/studio-reformer.jpg",
    alt: { it: "I Reformer dello studio", en: "The studio’s Reformer machines", pt: "Os Reformers do estúdio" } as Texto,
    w: 1800,
    h: 1350,
  },
  {
    src: "/img/yoga-lago.jpg",
    alt: { it: "Yoga in riva al lago", en: "Yoga by the lake", pt: "Yoga à beira do lago" } as Texto,
    w: 1800,
    h: 1200,
  },
];

export const nav: { href: string; label: Texto }[] = [
  { href: "#studio", label: { it: "Lo Studio", en: "The Studio", pt: "O Estúdio" } },
  { href: "#corsi", label: { it: "Corsi", en: "Classes", pt: "Aulas" } },
  { href: "#reformer", label: { it: "Reformer", en: "Reformer", pt: "Reformer" } },
  { href: "#massaggi", label: { it: "Massaggi", en: "Massages", pt: "Massagens" } },
  { href: "#prezzi", label: { it: "Prezzi", en: "Prices", pt: "Preços" } },
  { href: "#contatti", label: { it: "Contatti", en: "Contact", pt: "Contato" } },
];

export const avvertenzaMassaggi: Texto = {
  it: "Si prega di presentarsi almeno 5 minuti prima dell’appuntamento. Il massaggio benessere è sconsigliato in caso di traumi recenti, infiammazioni acute, febbre, fratture, gravidanza e gravi patologie cardio-circolatorie: in caso di dubbio chiedi a Kristina.",
  en: "Please arrive at least 5 minutes before your appointment. Wellness massage is not recommended in case of recent trauma, acute inflammation, fever, fractures, pregnancy or serious cardiovascular conditions: if in doubt, ask Kristina.",
  pt: "Por favor, chegue pelo menos 5 minutos antes do horário marcado. A massagem de bem-estar não é recomendada em casos de trauma recente, inflamação aguda, febre, fraturas, gravidez e doenças cardiovasculares graves: em caso de dúvida, pergunte à Kristina.",
};
