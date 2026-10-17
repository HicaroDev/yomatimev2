import type { Locale } from "@/content/yoma";

// Dicionário da INTERFACE (rótulos, botões, menus) do /yomapanel e do /yomadesk.
// Diferente de src/content/yoma.ts: isso não é conteúdo da Kristina, é a "moldura"
// dos dois painéis internos — por isso fica num dicionário simples, não em {it,en,pt}
// por campo. Ver [[Decisões]] no cérebro: regra permanente de 3 idiomas do projeto.
export type PainelDicionario = {
  sair: string;
  sistemaEm: string;
  trocarArea: string;
  equipe: string;
  selecionar: {
    titulo: string;
    subtitulo: string;
    abrir: string;
    yomadesk: { titulo: string; descricao: string; checklist: [string, string, string] };
    yomapanel: { titulo: string; descricao: string; checklist: [string, string, string] };
  };
  panel: {
    marca: string;
    titulo: string;
    subtitulo: string;
    editandoEm: string;
    menu: {
      contatos: string;
      capa: string;
      loStudio: string;
      kristina: string;
      praticas: string;
      massagens: string;
      precos: string;
      eventos: string;
      fotos: string;
      cores: string;
    };
  };
  yomadesk: {
    marca: string;
    marcaSubtitulo: string;
    menu: {
      dashboard: string;
      clientes: string;
      faturas: string;
      importar: string;
      despesas: string;
      itens: string;
      analises: string;
      definicoes: string;
      personalizar: string;
      empresa: string;
      categorias: string;
    };
    status: Record<"rascunho" | "enviada" | "paga" | "vencida" | "arquivada", string>;
    banco: {
      tabelasFaltandoTitulo: string;
      tabelasFaltandoTexto: string;
      naoConfiguradoTitulo: string;
      naoConfiguradoTexto: string;
    };
    dashboard: {
      titulo: string;
      subtitulo: string;
      statClientes: string;
      statFaturasAbertas: string;
      statPacotesEsgotando: string;
      pacotesVencendoTitulo: string;
      nenhumPacoteVencendo: string;
      creditoRestando: (n: number) => string;
      vence: (data: string) => string;
      pacotesEsgotandoTitulo: string;
      nenhumPacoteLimite: string;
      creditoRestandoSimples: (n: number) => string;
      faturasAbertoTitulo: string;
      nenhumaFaturaAberta: string;
    };
    clientes: {
      titulo: (n: number) => string;
      subtitulo: string;
      importados: (n: number) => string;
      novoClienteTitulo: string;
      nome: string;
      telefone: string;
      email: string;
      notas: string;
      botaoCadastrar: string;
      semContato: string;
      creditosLabel: string;
      nenhumCliente: string;
      abaTodos: (n: number) => string;
      abaComCredito: (n: number) => string;
      abaSemCredito: (n: number) => string;
      buscaPlaceholder: string;
      colCliente: string;
      colCreditos: string;
      mostrando: (n: number, total: number) => string;
      cancelar: string;
      rua: string;
      numero: string;
      cep: string;
      cidade: string;
      uidIde: string;
      uidIdeAjuda: string;
      notaPrivada: string;
      portalB2b: string;
    };
    clienteDetalhe: {
      semContato: string;
      erroSemCredito: string;
      dadosTitulo: string;
      nome: string;
      telefone: string;
      email: string;
      notas: string;
      botaoSalvar: string;
      registrarAulaTitulo: string;
      registrarAulaSub: string;
      servico: string;
      notaOpcional: string;
      botaoRegistrar: string;
      pacotesTitulo: string;
      descricao: string;
      creditosTotais: string;
      preco: string;
      validade: string;
      botaoAdicionarPacote: string;
      creditosSufixo: string;
      validadeTexto: (data: string) => string;
      nenhumPacote: string;
      historicoTitulo: string;
      nenhumConsumo: string;
      novaFaturaTitulo: string;
      itemDescricaoPlaceholder: string;
      qtdPlaceholder: string;
      valorPlaceholder: string;
      botaoCriarFatura: string;
      nenhumaFatura: string;
    };
    faturas: {
      titulo: (n: number) => string;
      subtitulo: string;
      abas: { todas: string; rascunho: string; enviada: string; paga: string; vencida: string; arquivada: string };
      faturaLabel: (numero: string) => string;
      marcarComo: (statusLabel: string) => string;
      nenhumaFatura: string;
      statTotalFaturado: string;
      statAguardando: string;
      statVencidas: string;
      colFatura: string;
      colCliente: string;
      colEmissao: string;
      colVencimento: string;
      colMontante: string;
      colEstado: string;
      colAcoes: string;
      baixarQrBill: string;
      semVencimento: string;
    };
    importar: {
      titulo: string;
      subtitulo: string;
      erroVazio: string;
      erroSemColuna: string;
      erroGenerico: string;
      secaoTitulo: string;
      secaoSubtitulo: string;
      botaoImportar: string;
    };
    empresa: {
      titulo: string;
      subtitulo: string;
      abaDados: string;
      abaContas: string;
      abaCategorias: string;
      identificacaoTitulo: string;
      identificacaoSub: string;
      nome: string;
      rua: string;
      numero: string;
      cep: string;
      cidade: string;
      email: string;
      telefone: string;
      ivaTitulo: string;
      ivaSubtitulo: string;
      ivaNormal: string;
      ivaNormalAjuda: string;
      ivaReduzida: string;
      ivaReduzidaAjuda: string;
      ivaAlojamento: string;
      ivaAlojamentoAjuda: string;
      isenta: string;
      qrIbanPronto: string;
      botaoSalvar: string;
      contasTitulo: string;
      contasSub: string;
      banco: string;
      moeda: string;
      iban: string;
      titular: string;
      qrIban: string;
      ativa: string;
      botaoAdicionarConta: string;
      remover: string;
      nenhumaConta: string;
      categoriasTitulo: string;
      categoriasSub: string;
      novaCategoriaPlaceholder: string;
      botaoAdicionarCategoria: string;
      nenhumaCategoria: string;
    };
    itens: {
      titulo: (n: number) => string;
      subtitulo: string;
      abaTodos: string;
      abaServicos: string;
      abaProdutos: string;
      abaTaxas: string;
      novoItemTitulo: string;
      descricao: string;
      tipo: string;
      tipoServico: string;
      tipoProduto: string;
      tipoTaxaDesconto: string;
      precoUnitario: string;
      unidade: string;
      unidadePlaceholder: string;
      botaoCriar: string;
      colNome: string;
      colTipo: string;
      colUnidade: string;
      colPreco: string;
      colAcoes: string;
      nenhumItem: string;
      editar: string;
      remover: string;
      salvar: string;
      cancelar: string;
    };
    despesas: {
      titulo: (n: number) => string;
      subtitulo: string;
      novaDespesaTitulo: string;
      descricao: string;
      valor: string;
      metodoPagamento: string;
      metodoDinheiro: string;
      metodoTransferencia: string;
      metodoCartao: string;
      metodoTwint: string;
      metodoOutro: string;
      data: string;
      categoria: string;
      semCategoria: string;
      fornecedor: string;
      tags: string;
      tagsAjuda: string;
      pago: string;
      comprovante: string;
      botaoRegistrar: string;
      nenhumaDespesa: string;
      remover: string;
      totalLabel: string;
      botaoNovaDespesa: string;
      nova: {
        voltar: string;
        tituloPagina: string;
        rascunho: string;
        statusPago: string;
        statusAPagar: string;
        recorrenciaUmaVez: string;
        botaoGuardar: string;
        documentosTitulo: string;
        digitalizeTitulo: string;
        digitalizeTexto: string;
        botaoGaleria: string;
        botaoDocumentos: string;
        formatosSuportados: string;
        conformidadeTitulo: string;
        conformidadeTexto: string;
        detalhesTitulo: string;
        moeda: string;
        ivaIncluido: string;
        novaCategoria: string;
        descartar: string;
        rodapeRascunho: string;
      };
    };
    analises: {
      titulo: string;
      subtitulo: string;
      faturamentoPorMesTitulo: string;
      nenhumDado: string;
      topClientesTitulo: string;
      nenhumCliente: string;
      porStatusTitulo: string;
    };
    personalizar: {
      titulo: string;
      subtitulo: string;
      logoTitulo: string;
      logoSub: string;
      botaoCarregarLogo: string;
      anexoTitulo: string;
      anexoSub: string;
      botaoEnviarAnexo: string;
      emailRespostaTitulo: string;
      emailRespostaSub: string;
      mensagemPadraoTitulo: string;
      mensagemPadraoSub: string;
      mensagemPlaceholder: string;
      mensagemOrcamentoPlaceholder: string;
      assinaturaTitulo: string;
      assinaturaSub: string;
      nomeContaQrTitulo: string;
      nomeContaQrSub: string;
      referenciaTitulo: string;
      referenciaSub: string;
      prazoTitulo: string;
      prazoSub: string;
      prazoFatura: string;
      prazoOrcamento: string;
      botaoSalvar: string;
    };
  };
};

export const PAINEL_DICIONARIOS: Record<Locale, PainelDicionario> = {
  it: {
    sair: "Esci",
    sistemaEm: "Sistema in:",
    trocarArea: "Cambia area",
    equipe: "Team",
    selecionar: {
      titulo: "Seleziona la tua destinazione",
      subtitulo: "Scegli quale area vuoi aprire.",
      abrir: "Apri",
      yomadesk: {
        titulo: "YomaDesk",
        descricao: "Clienti, pacchetti di credito e fatture.",
        checklist: ["Clienti", "Pacchetti di credito", "Fatture"],
      },
      yomapanel: {
        titulo: "Pannello YomaTime",
        descricao: "Testi, foto e colori del sito pubblico.",
        checklist: ["Testi", "Foto", "Colori"],
      },
    },
    panel: {
      marca: "YomaTime · Pannello",
      titulo: "Pannello YomaTime",
      subtitulo: "Modifica qui i testi, le foto e i colori del sito. Le modifiche appaiono sul sito non appena salvi.",
      editandoEm: "Modificando in:",
      menu: {
        contatos: "Contatti",
        capa: "Copertina",
        loStudio: "Lo Studio",
        kristina: "Kristina",
        praticas: "Pratiche",
        massagens: "Massaggi",
        precos: "Prezzi",
        eventos: "Eventi",
        fotos: "Foto",
        cores: "Colori",
      },
    },
    yomadesk: {
      marca: "YomaDesk",
      marcaSubtitulo: "Swiss Enterprise",
      menu: {
        dashboard: "Dashboard",
        clientes: "Clienti",
        faturas: "Fatture",
        importar: "Importa",
        despesas: "Spese",
        itens: "Articoli",
        analises: "Analisi",
        definicoes: "Impostazioni",
        personalizar: "Personalizza fattura",
        empresa: "La mia azienda",
        categorias: "Categorie",
      },
      status: { rascunho: "Bozza", enviada: "Inviata", paga: "Pagata", vencida: "Scaduta", arquivada: "Archiviata" },
      banco: {
        tabelasFaltandoTitulo: "Database connesso, ma le tabelle non esistono ancora",
        tabelasFaltandoTexto:
          "La connessione al Postgres (Neon) è ok, ma manca eseguire la migration per creare le tabelle (clienti, pacotes_credito, faturas...). Esegui npm run db:push e aggiorna la pagina.",
        naoConfiguradoTitulo: "Database non ancora configurato",
        naoConfiguradoTexto:
          "Manca creare il Postgres (Neon) su Vercel e definire la variabile DATABASE_URL. Poi esegui la migration (npm run db:push) per creare le tabelle. Fatto questo, questa pagina funzionerà normalmente.",
      },
      dashboard: {
        titulo: "YomaDesk",
        subtitulo: "Panoramica di clienti, crediti e fatture.",
        statClientes: "Clienti",
        statFaturasAbertas: "Fatture in sospeso",
        statPacotesEsgotando: "Pacchetti in esaurimento",
        pacotesVencendoTitulo: "Pacchetti in scadenza entro 30 giorni",
        nenhumPacoteVencendo: "Nessun pacchetto in scadenza.",
        creditoRestando: (n) => `(${n} credito${n === 1 ? "" : "i"} rimanente${n === 1 ? "" : "i"})`,
        vence: (data) => `scade ${data}`,
        pacotesEsgotandoTitulo: "Pacchetti in esaurimento (1 credito o meno)",
        nenhumPacoteLimite: "Nessun pacchetto al limite.",
        creditoRestandoSimples: (n) => `(${n} rimanente${n === 1 ? "" : "i"})`,
        faturasAbertoTitulo: "Fatture in sospeso",
        nenhumaFaturaAberta: "Nessuna fattura in sospeso.",
      },
      clientes: {
        titulo: (n) => `Clienti (${n})`,
        subtitulo: "Clienti registrati e i loro crediti rimanenti.",
        importados: (n) => `${n} cliente${n === 1 ? "" : "i"} importato${n === 1 ? "" : "i"} con successo.`,
        novoClienteTitulo: "Nuovo cliente",
        nome: "Nome",
        telefone: "Telefono",
        email: "E-mail",
        notas: "Note",
        botaoCadastrar: "Registra cliente",
        semContato: "Nessun contatto registrato",
        creditosLabel: "crediti",
        nenhumCliente: "Nessun cliente registrato ancora.",
        abaTodos: (n) => `Tutti (${n})`,
        abaComCredito: (n) => `Con credito (${n})`,
        abaSemCredito: (n) => `Senza credito (${n})`,
        buscaPlaceholder: "Cerca cliente...",
        colCliente: "Cliente",
        colCreditos: "Crediti",
        mostrando: (n, total) => `Mostrando ${n} di ${total}`,
        cancelar: "Annulla",
        rua: "Via",
        numero: "Numero civico",
        cep: "CAP",
        cidade: "Città",
        uidIde: "UID / IDE svizzero",
        uidIdeAjuda: "Numero IVA/IDI svizzero (opzionale, solo per clienti aziendali).",
        notaPrivada: "Nota privata",
        portalB2b: "Abilita portale B2B e fatture QR-Bill",
      },
      clienteDetalhe: {
        semContato: "Nessun contatto registrato",
        erroSemCredito: "Questo cliente non ha un pacchetto con credito disponibile. Registra un nuovo pacchetto prima di registrare la lezione.",
        dadosTitulo: "Dati del cliente",
        nome: "Nome",
        telefone: "Telefono",
        email: "E-mail",
        notas: "Note",
        botaoSalvar: "Salva",
        registrarAulaTitulo: "Registra lezione (scalo automatico del credito)",
        registrarAulaSub: "Sceglie da solo il pacchetto più vecchio con credito disponibile (FEFO) e scala 1 credito.",
        servico: "Servizio",
        notaOpcional: "Nota (opzionale)",
        botaoRegistrar: "Registra",
        pacotesTitulo: "Pacchetti di credito",
        descricao: "Descrizione",
        creditosTotais: "Crediti totali",
        preco: "Prezzo (CHF)",
        validade: "Validità",
        botaoAdicionarPacote: "Aggiungi pacchetto",
        creditosSufixo: "crediti",
        validadeTexto: (data) => `validità ${data}`,
        nenhumPacote: "Nessun pacchetto registrato.",
        historicoTitulo: "Storico dei consumi",
        nenhumConsumo: "Nessun consumo registrato.",
        novaFaturaTitulo: "Nuova fattura",
        itemDescricaoPlaceholder: "Descrizione dell'articolo",
        qtdPlaceholder: "Qtà",
        valorPlaceholder: "Valore (CHF)",
        botaoCriarFatura: "Crea fattura (bozza)",
        nenhumaFatura: "Nessuna fattura.",
      },
      faturas: {
        titulo: (n) => `Fatture (${n})`,
        subtitulo: "Fatture semplici, senza addebito automatico ancora (Stripe arriva dopo).",
        abas: { todas: "Tutte", rascunho: "Bozza", enviada: "Inviata", paga: "Pagata", vencida: "Scaduta", arquivada: "Archiviata" },
        faturaLabel: (numero) => `Fattura ${numero}`,
        marcarComo: (statusLabel) => `Segna come ${statusLabel}`,
        nenhumaFatura: "Nessuna fattura trovata.",
        statTotalFaturado: "Totale fatturato",
        statAguardando: "In attesa di pagamento",
        statVencidas: "Scadute",
        colFatura: "Fattura #",
        colCliente: "Cliente",
        colEmissao: "Data di emissione",
        colVencimento: "Scadenza",
        colMontante: "Importo (CHF)",
        colEstado: "Stato",
        colAcoes: "Azioni",
        baixarQrBill: "Scarica QR-Bill",
        semVencimento: "—",
      },
      importar: {
        titulo: "Importa da Magic Heidi",
        subtitulo:
          "Importatore provvisorio — oggi porta solo Clienti (nome, e-mail, telefono). Non appena avremo un export reale di Fatture/Pacchetti dal Magic Heidi, lo adeguo per migrare lo storico completo.",
        erroVazio: "Il file è vuoto o ha solo l'intestazione.",
        erroSemColuna: "Non ho trovato una colonna nome nel CSV (atteso: nome, name o cliente).",
        erroGenerico: "Non è stato possibile importare il file.",
        secaoTitulo: "Importa clienti (CSV)",
        secaoSubtitulo: "Intestazione attesa nella prima riga: una colonna nome (nome/name/cliente) e, opzionalmente, email e telefono.",
        botaoImportar: "Importa",
      },
      empresa: {
        titulo: "La mia azienda",
        subtitulo: "Dati fiscali e conti bancari usati nelle fatture QR-Bill.",
        abaDados: "Dati aziendali",
        abaContas: "Conti bancari QR-IBAN",
        abaCategorias: "Categorie",
        identificacaoTitulo: "Identificazione e indirizzo svizzero",
        identificacaoSub: "Questi dati appaiono nell'intestazione delle fatture QR-Bill emesse.",
        nome: "Nome o ragione sociale",
        rua: "Via",
        numero: "Numero civico",
        cep: "CAP",
        cidade: "Città",
        email: "E-mail",
        telefone: "Telefono",
        ivaTitulo: "IVA",
        ivaSubtitulo: "Aliquote regolatorie dell'Amministrazione federale delle contribuzioni (AFC)",
        ivaNormal: "8.1% Normale",
        ivaNormalAjuda: "Standard per prodotti, servizi e consulenza generale in Svizzera.",
        ivaReduzida: "2.6% Ridotta",
        ivaReduzidaAjuda: "Generi alimentari, libri, medicinali e acqua potabile.",
        ivaAlojamento: "3.8% Alloggio",
        ivaAlojamentoAjuda: "Settore alberghiero e prestazioni speciali di alloggio.",
        isenta: "Azienda esente da IVA svizzera (fatturato annuo inferiore a CHF 100'000)",
        qrIbanPronto: "QR-IBAN pronto",
        botaoSalvar: "Salva",
        contasTitulo: "Conti bancari",
        contasSub: "Le fatture usano il conto corrispondente alla loro valuta.",
        banco: "Banca",
        moeda: "Valuta",
        iban: "IBAN",
        titular: "Titolare",
        qrIban: "È un QR-IBAN",
        ativa: "Attivo",
        botaoAdicionarConta: "Aggiungi conto bancario",
        remover: "Rimuovi",
        nenhumaConta: "Nessun conto bancario registrato ancora.",
        categoriasTitulo: "Categorie di spesa",
        categoriasSub: "Usate per organizzare le spese registrate.",
        novaCategoriaPlaceholder: "Nome della categoria",
        botaoAdicionarCategoria: "+ Categoria",
        nenhumaCategoria: "Nessuna categoria creata ancora.",
      },
      itens: {
        titulo: (n) => `Articoli (${n})`,
        subtitulo: "Catalogo di servizi e prodotti riutilizzabili nelle fatture.",
        abaTodos: "Tutti",
        abaServicos: "Servizi",
        abaProdutos: "Prodotti",
        abaTaxas: "Tasse e sconti",
        novoItemTitulo: "Nuovo articolo",
        descricao: "Descrizione",
        tipo: "Tipo",
        tipoServico: "Servizio",
        tipoProduto: "Prodotto",
        tipoTaxaDesconto: "Tassa o sconto",
        precoUnitario: "Prezzo (CHF)",
        unidade: "Unità",
        unidadePlaceholder: "es: ora, kg, pezzo",
        botaoCriar: "Crea",
        colNome: "Nome dell'articolo",
        colTipo: "Tipo",
        colUnidade: "Unità",
        colPreco: "Prezzo unitario",
        colAcoes: "Azioni",
        nenhumItem: "Nessun articolo registrato ancora.",
        editar: "Modifica",
        remover: "Rimuovi",
        salvar: "Salva",
        cancelar: "Annulla",
      },
      despesas: {
        titulo: (n) => `Spese (${n})`,
        subtitulo: "Registro delle spese dell'attività.",
        novaDespesaTitulo: "Nuova spesa",
        descricao: "Descrizione",
        valor: "Prezzo (CHF)",
        metodoPagamento: "Metodo di pagamento",
        metodoDinheiro: "Contanti",
        metodoTransferencia: "Bonifico bancario",
        metodoCartao: "Carta",
        metodoTwint: "TWINT",
        metodoOutro: "Altro",
        data: "Data",
        categoria: "Categoria",
        semCategoria: "Senza categoria",
        fornecedor: "Fornitore / Emittente",
        tags: "Tag (separati da virgola)",
        tagsAjuda: "es: Rimborsabile, Progetto Alpha",
        pago: "Pagato",
        comprovante: "Ricevuta (opzionale)",
        botaoRegistrar: "Registra spesa",
        nenhumaDespesa: "Nessuna spesa registrata ancora.",
        remover: "Rimuovi",
        totalLabel: "Totale",
        botaoNovaDespesa: "Nuova spesa",
        nova: {
          voltar: "Torna alle spese",
          tituloPagina: "Nuova spesa",
          rascunho: "Bozza",
          statusPago: "PAGATO",
          statusAPagar: "DA PAGARE",
          recorrenciaUmaVez: "Una tantum",
          botaoGuardar: "Salva",
          documentosTitulo: "Documenti e ricevuta",
          digitalizeTitulo: "Allega la ricevuta",
          digitalizeTexto: "Carica qui un'immagine o un PDF della ricevuta per archiviarla insieme alla spesa.",
          botaoGaleria: "Galleria",
          botaoDocumentos: "Documenti",
          formatosSuportados: "Formati supportati: PNG, JPG, HEIC, PDF fino a 25MB",
          conformidadeTitulo: "Conformità fiscale svizzera",
          conformidadeTexto: "Le ricevute archiviate qui seguono i criteri di conservazione dell'amministrazione fiscale.",
          detalhesTitulo: "Dettagli della transazione",
          moeda: "Valuta: Franco svizzero (CHF)",
          ivaIncluido: "IVA inclusa",
          novaCategoria: "+ Nuova categoria",
          descartar: "Scarta",
          rodapeRascunho: "Bozza non ancora salvata",
        },
      },
      analises: {
        titulo: "Analisi",
        subtitulo: "Panoramica reale basata sulle fatture registrate.",
        faturamentoPorMesTitulo: "Fatturato per mese",
        nenhumDado: "Nessun dato ancora.",
        topClientesTitulo: "Principali clienti per fatturato",
        nenhumCliente: "Nessun cliente fatturato ancora.",
        porStatusTitulo: "Fatture per stato",
      },
      personalizar: {
        titulo: "Personalizza la tua fattura",
        subtitulo: "Queste impostazioni vengono usate nelle fatture e nel boleto QR.",
        logoTitulo: "Logo della fattura",
        logoSub: "Il logo deve essere quadrato, PNG o JPEG.",
        botaoCarregarLogo: "Carica logo",
        anexoTitulo: "Allegato della fattura",
        anexoSub: "Invia un file PDF da allegare alla fine della fattura (es. termini e condizioni).",
        botaoEnviarAnexo: "Invia",
        emailRespostaTitulo: "E-mail di risposta",
        emailRespostaSub: "L'indirizzo a cui i clienti rispondono quando rispondono a una fattura.",
        mensagemPadraoTitulo: "Messaggio predefinito della fattura",
        mensagemPadraoSub: "Aggiunto automaticamente alla fine di ogni fattura.",
        mensagemPlaceholder: "Aggiungi un testo personalizzato alla fattura",
        mensagemOrcamentoPlaceholder: "Aggiungi un testo personalizzato al preventivo",
        assinaturaTitulo: "Campo firma per i preventivi",
        assinaturaSub: "Mostra firma e data alla fine dei preventivi.",
        nomeContaQrTitulo: "Nome del conto QR",
        nomeContaQrSub: "Sostituisce il nome del conto bancario nella sezione QR, se diverso dal nome dell'azienda.",
        referenciaTitulo: "Riferimento di pagamento",
        referenciaSub: "Riferimento predefinito da includere nelle fatture (es. per un conto Revolut Business).",
        prazoTitulo: "Termine di pagamento",
        prazoSub: "Giorni dopo l'emissione in cui fatture e preventivi scadono.",
        prazoFatura: "Fattura",
        prazoOrcamento: "Preventivo",
        botaoSalvar: "Salva",
      },
    },
  },
  en: {
    sair: "Log out",
    sistemaEm: "System in:",
    trocarArea: "Switch area",
    equipe: "Team",
    selecionar: {
      titulo: "Select your destination",
      subtitulo: "Choose which area you want to open.",
      abrir: "Open",
      yomadesk: {
        titulo: "YomaDesk",
        descricao: "Clients, credit packages and invoices.",
        checklist: ["Clients", "Credit packages", "Invoices"],
      },
      yomapanel: {
        titulo: "YomaTime Panel",
        descricao: "Text, photos and colors of the public site.",
        checklist: ["Text", "Photos", "Colors"],
      },
    },
    panel: {
      marca: "YomaTime · Panel",
      titulo: "YomaTime Panel",
      subtitulo: "Edit the site's text, photos and colors here. Changes appear on the site as soon as you save.",
      editandoEm: "Editing in:",
      menu: {
        contatos: "Contacts",
        capa: "Cover",
        loStudio: "The Studio",
        kristina: "Kristina",
        praticas: "Practices",
        massagens: "Massages",
        precos: "Prices",
        eventos: "Events",
        fotos: "Photos",
        cores: "Colors",
      },
    },
    yomadesk: {
      marca: "YomaDesk",
      marcaSubtitulo: "Swiss Enterprise",
      menu: {
        dashboard: "Dashboard",
        clientes: "Clients",
        faturas: "Invoices",
        importar: "Import",
        despesas: "Expenses",
        itens: "Items",
        analises: "Analytics",
        definicoes: "Settings",
        personalizar: "Customize invoice",
        empresa: "My company",
        categorias: "Categories",
      },
      status: { rascunho: "Draft", enviada: "Sent", paga: "Paid", vencida: "Overdue", arquivada: "Archived" },
      banco: {
        tabelasFaltandoTitulo: "Database connected, but the tables don't exist yet",
        tabelasFaltandoTexto:
          "The Postgres (Neon) connection is fine, but the migration that creates the tables (clientes, pacotes_credito, faturas...) hasn't run yet. Run npm run db:push and refresh the page.",
        naoConfiguradoTitulo: "Database not configured yet",
        naoConfiguradoTexto:
          "You still need to create the Postgres (Neon) on Vercel and set the DATABASE_URL variable. Then run the migration (npm run db:push) to create the tables. Once that's done, this page will work normally.",
      },
      dashboard: {
        titulo: "YomaDesk",
        subtitulo: "Overview of clients, credits and invoices.",
        statClientes: "Clients",
        statFaturasAbertas: "Open invoices",
        statPacotesEsgotando: "Packages running out",
        pacotesVencendoTitulo: "Packages expiring within 30 days",
        nenhumPacoteVencendo: "No packages expiring.",
        creditoRestando: (n) => `(${n} credit${n === 1 ? "" : "s"} left)`,
        vence: (data) => `expires ${data}`,
        pacotesEsgotandoTitulo: "Packages running out (1 credit or less)",
        nenhumPacoteLimite: "No packages near the limit.",
        creditoRestandoSimples: (n) => `(${n} left)`,
        faturasAbertoTitulo: "Open invoices",
        nenhumaFaturaAberta: "No open invoices.",
      },
      clientes: {
        titulo: (n) => `Clients (${n})`,
        subtitulo: "Registered clients and their remaining credits.",
        importados: (n) => `${n} client${n === 1 ? "" : "s"} imported successfully.`,
        novoClienteTitulo: "New client",
        nome: "Name",
        telefone: "Phone",
        email: "Email",
        notas: "Notes",
        botaoCadastrar: "Register client",
        semContato: "No contact on file",
        creditosLabel: "credits",
        nenhumCliente: "No clients registered yet.",
        abaTodos: (n) => `All (${n})`,
        abaComCredito: (n) => `With credit (${n})`,
        abaSemCredito: (n) => `No credit (${n})`,
        buscaPlaceholder: "Search client...",
        colCliente: "Client",
        colCreditos: "Credits",
        mostrando: (n, total) => `Showing ${n} of ${total}`,
        cancelar: "Cancel",
        rua: "Street",
        numero: "Building number",
        cep: "Postal code",
        cidade: "City",
        uidIde: "Swiss UID / IDE",
        uidIdeAjuda: "Swiss VAT/UID number (optional, business clients only).",
        notaPrivada: "Private note",
        portalB2b: "Enable B2B portal and QR-Bill invoices",
      },
      clienteDetalhe: {
        semContato: "No contact on file",
        erroSemCredito: "This client has no package with credit available. Register a new package before logging the class.",
        dadosTitulo: "Client details",
        nome: "Name",
        telefone: "Phone",
        email: "Email",
        notas: "Notes",
        botaoSalvar: "Save",
        registrarAulaTitulo: "Log a class (automatic credit deduction)",
        registrarAulaSub: "Automatically picks the oldest package with credit available (FEFO) and deducts 1 credit.",
        servico: "Service",
        notaOpcional: "Note (optional)",
        botaoRegistrar: "Log it",
        pacotesTitulo: "Credit packages",
        descricao: "Description",
        creditosTotais: "Total credits",
        preco: "Price (CHF)",
        validade: "Expiry",
        botaoAdicionarPacote: "Add package",
        creditosSufixo: "credits",
        validadeTexto: (data) => `expires ${data}`,
        nenhumPacote: "No packages registered.",
        historicoTitulo: "Consumption history",
        nenhumConsumo: "No consumption logged.",
        novaFaturaTitulo: "New invoice",
        itemDescricaoPlaceholder: "Item description",
        qtdPlaceholder: "Qty",
        valorPlaceholder: "Amount (CHF)",
        botaoCriarFatura: "Create invoice (draft)",
        nenhumaFatura: "No invoices.",
      },
      faturas: {
        titulo: (n) => `Invoices (${n})`,
        subtitulo: "Simple invoices, no automatic charging yet (Stripe comes later).",
        abas: { todas: "All", rascunho: "Draft", enviada: "Sent", paga: "Paid", vencida: "Overdue", arquivada: "Archived" },
        faturaLabel: (numero) => `Invoice ${numero}`,
        marcarComo: (statusLabel) => `Mark as ${statusLabel}`,
        nenhumaFatura: "No invoices found.",
        statTotalFaturado: "Total invoiced",
        statAguardando: "Awaiting payment",
        statVencidas: "Overdue",
        colFatura: "Invoice #",
        colCliente: "Client",
        colEmissao: "Issue date",
        colVencimento: "Due date",
        colMontante: "Amount (CHF)",
        colEstado: "Status",
        colAcoes: "Actions",
        baixarQrBill: "Download QR-Bill",
        semVencimento: "—",
      },
      importar: {
        titulo: "Import from Magic Heidi",
        subtitulo:
          "Temporary importer — for now it only brings in Clients (name, email, phone). As soon as we get a real Invoices/Packages export from Magic Heidi, I'll adjust it to migrate the full history.",
        erroVazio: "The file is empty or only has the header.",
        erroSemColuna: "Couldn't find a name column in the CSV (expected: nome, name or cliente).",
        erroGenerico: "Couldn't import the file.",
        secaoTitulo: "Import clients (CSV)",
        secaoSubtitulo: "Expected header in the first row: a name column (nome/name/cliente) and, optionally, email and phone.",
        botaoImportar: "Import",
      },
      empresa: {
        titulo: "My company",
        subtitulo: "Tax details and bank accounts used on QR-Bill invoices.",
        abaDados: "Company details",
        abaContas: "QR-IBAN bank accounts",
        abaCategorias: "Categories",
        identificacaoTitulo: "Swiss identification and address",
        identificacaoSub: "This data appears on the header of issued QR-Bill invoices.",
        nome: "Name or company name",
        rua: "Street",
        numero: "Building number",
        cep: "Postal code",
        cidade: "City",
        email: "Email",
        telefone: "Phone",
        ivaTitulo: "VAT",
        ivaSubtitulo: "Regulatory rates from the Federal Tax Administration (FTA)",
        ivaNormal: "8.1% Standard",
        ivaNormalAjuda: "Default for products, services and general consulting in Switzerland.",
        ivaReduzida: "2.6% Reduced",
        ivaReduzidaAjuda: "Food, books, medicines and piped water.",
        ivaAlojamento: "3.8% Accommodation",
        ivaAlojamentoAjuda: "Hospitality sector and special accommodation services.",
        isenta: "Company exempt from Swiss VAT (annual turnover below CHF 100,000)",
        qrIbanPronto: "QR-IBAN ready",
        botaoSalvar: "Save",
        contasTitulo: "Bank accounts",
        contasSub: "Invoices use the account matching their currency.",
        banco: "Bank",
        moeda: "Currency",
        iban: "IBAN",
        titular: "Account holder",
        qrIban: "This is a QR-IBAN",
        ativa: "Active",
        botaoAdicionarConta: "Add bank account",
        remover: "Remove",
        nenhumaConta: "No bank account registered yet.",
        categoriasTitulo: "Expense categories",
        categoriasSub: "Used to organize recorded expenses.",
        novaCategoriaPlaceholder: "Category name",
        botaoAdicionarCategoria: "+ Category",
        nenhumaCategoria: "No category created yet.",
      },
      itens: {
        titulo: (n) => `Items (${n})`,
        subtitulo: "Catalog of services and products reusable on invoices.",
        abaTodos: "All",
        abaServicos: "Services",
        abaProdutos: "Products",
        abaTaxas: "Taxes & discounts",
        novoItemTitulo: "New item",
        descricao: "Description",
        tipo: "Type",
        tipoServico: "Service",
        tipoProduto: "Product",
        tipoTaxaDesconto: "Tax or discount",
        precoUnitario: "Price (CHF)",
        unidade: "Unit",
        unidadePlaceholder: "e.g.: hour, kg, piece",
        botaoCriar: "Create",
        colNome: "Item name",
        colTipo: "Type",
        colUnidade: "Unit",
        colPreco: "Unit price",
        colAcoes: "Actions",
        nenhumItem: "No item registered yet.",
        editar: "Edit",
        remover: "Remove",
        salvar: "Save",
        cancelar: "Cancel",
      },
      despesas: {
        titulo: (n) => `Expenses (${n})`,
        subtitulo: "Business expense log.",
        novaDespesaTitulo: "New expense",
        descricao: "Description",
        valor: "Price (CHF)",
        metodoPagamento: "Payment method",
        metodoDinheiro: "Cash",
        metodoTransferencia: "Bank transfer",
        metodoCartao: "Card",
        metodoTwint: "TWINT",
        metodoOutro: "Other",
        data: "Date",
        categoria: "Category",
        semCategoria: "No category",
        fornecedor: "Supplier / Issuer",
        tags: "Tags (comma-separated)",
        tagsAjuda: "e.g.: Reimbursable, Alpha Project",
        pago: "Paid",
        comprovante: "Receipt (optional)",
        botaoRegistrar: "Save expense",
        nenhumaDespesa: "No expense registered yet.",
        remover: "Remove",
        totalLabel: "Total",
        botaoNovaDespesa: "New expense",
        nova: {
          voltar: "Back to expenses",
          tituloPagina: "New expense",
          rascunho: "Draft",
          statusPago: "PAID",
          statusAPagar: "UNPAID",
          recorrenciaUmaVez: "One-time",
          botaoGuardar: "Save",
          documentosTitulo: "Documents & receipt",
          digitalizeTitulo: "Attach the receipt",
          digitalizeTexto: "Upload an image or PDF of the receipt to keep it filed with this expense.",
          botaoGaleria: "Gallery",
          botaoDocumentos: "Files",
          formatosSuportados: "Supported formats: PNG, JPG, HEIC, PDF up to 25MB",
          conformidadeTitulo: "Swiss tax compliance",
          conformidadeTexto: "Receipts filed here follow the Swiss tax administration's record-keeping guidelines.",
          detalhesTitulo: "Transaction details",
          moeda: "Currency: Swiss Franc (CHF)",
          ivaIncluido: "VAT included",
          novaCategoria: "+ New category",
          descartar: "Discard",
          rodapeRascunho: "Draft not saved yet",
        },
      },
      analises: {
        titulo: "Analytics",
        subtitulo: "A real overview based on recorded invoices.",
        faturamentoPorMesTitulo: "Revenue by month",
        nenhumDado: "No data yet.",
        topClientesTitulo: "Top clients by revenue",
        nenhumCliente: "No invoiced clients yet.",
        porStatusTitulo: "Invoices by status",
      },
      personalizar: {
        titulo: "Customize your invoice",
        subtitulo: "These settings are used on invoices and the QR-Bill.",
        logoTitulo: "Invoice logo",
        logoSub: "The logo should be square, PNG or JPEG.",
        botaoCarregarLogo: "Upload logo",
        anexoTitulo: "Invoice attachment",
        anexoSub: "Send a PDF file to attach to the end of the invoice (e.g. terms and conditions).",
        botaoEnviarAnexo: "Send",
        emailRespostaTitulo: "Reply-to email",
        emailRespostaSub: "The address clients reply to when they respond to an invoice.",
        mensagemPadraoTitulo: "Default invoice message",
        mensagemPadraoSub: "Automatically added to the end of every invoice.",
        mensagemPlaceholder: "Add custom text to the invoice",
        mensagemOrcamentoPlaceholder: "Add custom text to the quote",
        assinaturaTitulo: "Signature field for quotes",
        assinaturaSub: "Show signature and date at the end of quotes.",
        nomeContaQrTitulo: "QR account name",
        nomeContaQrSub: "Replaces the bank account name in the QR section, if different from the company name.",
        referenciaTitulo: "Payment reference",
        referenciaSub: "Default reference to include on invoices (e.g. for a Revolut Business account).",
        prazoTitulo: "Payment terms",
        prazoSub: "Days after issuing that invoices and quotes are due.",
        prazoFatura: "Invoice",
        prazoOrcamento: "Quote",
        botaoSalvar: "Save",
      },
    },
  },
  pt: {
    sair: "Sair",
    sistemaEm: "Sistema em:",
    trocarArea: "Trocar de área",
    equipe: "Equipe",
    selecionar: {
      titulo: "Selecione o seu destino",
      subtitulo: "Escolha qual área você quer abrir.",
      abrir: "Abrir",
      yomadesk: {
        titulo: "YomaDesk",
        descricao: "Clientes, pacotes de crédito e faturas.",
        checklist: ["Clientes", "Pacotes de crédito", "Faturas"],
      },
      yomapanel: {
        titulo: "Painel YomaTime",
        descricao: "Textos, fotos e cores do site público.",
        checklist: ["Textos", "Fotos", "Cores"],
      },
    },
    panel: {
      marca: "YomaTime · Painel",
      titulo: "Painel YomaTime",
      subtitulo: "Edite aqui o texto, as fotos e as cores do site. As mudanças aparecem no site assim que você salvar.",
      editandoEm: "Editando em:",
      menu: {
        contatos: "Contatos",
        capa: "Capa",
        loStudio: "Lo Studio",
        kristina: "Kristina",
        praticas: "Práticas",
        massagens: "Massagens",
        precos: "Preços",
        eventos: "Eventos",
        fotos: "Fotos",
        cores: "Cores",
      },
    },
    yomadesk: {
      marca: "YomaDesk",
      marcaSubtitulo: "Swiss Enterprise",
      menu: {
        dashboard: "Dashboard",
        clientes: "Clientes",
        faturas: "Faturas",
        importar: "Importar",
        despesas: "Despesas",
        itens: "Itens",
        analises: "Análises",
        definicoes: "Definições",
        personalizar: "Personalizar fatura",
        empresa: "A minha empresa",
        categorias: "Categorias",
      },
      status: { rascunho: "Rascunho", enviada: "Enviada", paga: "Paga", vencida: "Vencida", arquivada: "Arquivada" },
      banco: {
        tabelasFaltandoTitulo: "Banco conectado, mas as tabelas ainda não existem",
        tabelasFaltandoTexto:
          "A conexão com o Postgres (Neon) está ok, mas falta rodar a migration pra criar as tabelas (clientes, pacotes_credito, faturas...). Rode npm run db:push e atualize a página.",
        naoConfiguradoTitulo: "Banco de dados ainda não configurado",
        naoConfiguradoTexto:
          "Falta criar o Postgres (Neon) na Vercel e definir a variável DATABASE_URL. Depois disso, rode a migration (npm run db:push) pra criar as tabelas. Assim que isso estiver pronto, esta página passa a funcionar normalmente.",
      },
      dashboard: {
        titulo: "YomaDesk",
        subtitulo: "Visão geral de clientes, créditos e faturas.",
        statClientes: "Clientes",
        statFaturasAbertas: "Faturas em aberto",
        statPacotesEsgotando: "Pacotes esgotando",
        pacotesVencendoTitulo: "Pacotes vencendo em 30 dias",
        nenhumPacoteVencendo: "Nenhum pacote vencendo.",
        creditoRestando: (n) => `(${n} crédito${n === 1 ? "" : "s"} restando)`,
        vence: (data) => `vence ${data}`,
        pacotesEsgotandoTitulo: "Pacotes esgotando (1 crédito ou menos)",
        nenhumPacoteLimite: "Nenhum pacote no limite.",
        creditoRestandoSimples: (n) => `(${n} restando)`,
        faturasAbertoTitulo: "Faturas em aberto",
        nenhumaFaturaAberta: "Nenhuma fatura em aberto.",
      },
      clientes: {
        titulo: (n) => `Clientes (${n})`,
        subtitulo: "Clientes cadastrados e seus créditos restantes.",
        importados: (n) => `${n} cliente${n === 1 ? "" : "s"} importado${n === 1 ? "" : "s"} com sucesso.`,
        novoClienteTitulo: "Novo cliente",
        nome: "Nome",
        telefone: "Telefone",
        email: "E-mail",
        notas: "Notas",
        botaoCadastrar: "Cadastrar cliente",
        semContato: "Sem contato cadastrado",
        creditosLabel: "créditos",
        nenhumCliente: "Nenhum cliente cadastrado ainda.",
        abaTodos: (n) => `Todos (${n})`,
        abaComCredito: (n) => `Com créditos (${n})`,
        abaSemCredito: (n) => `Sem créditos (${n})`,
        buscaPlaceholder: "Buscar cliente...",
        colCliente: "Cliente",
        colCreditos: "Créditos",
        mostrando: (n, total) => `Mostrando ${n} de ${total}`,
        cancelar: "Cancelar",
        rua: "Rua",
        numero: "Número",
        cep: "CEP",
        cidade: "Cidade",
        uidIde: "UID / IDE suíço",
        uidIdeAjuda: "Número de IVA/UID suíço (opcional, só pra clientes empresa).",
        notaPrivada: "Nota privada",
        portalB2b: "Habilitar portal B2B e faturas QR-Bill",
      },
      clienteDetalhe: {
        semContato: "Sem contato cadastrado",
        erroSemCredito: "Este cliente não tem pacote com crédito disponível. Cadastre um pacote novo antes de registrar a aula.",
        dadosTitulo: "Dados do cliente",
        nome: "Nome",
        telefone: "Telefone",
        email: "E-mail",
        notas: "Notas",
        botaoSalvar: "Salvar",
        registrarAulaTitulo: "Registrar aula (baixa automática de crédito)",
        registrarAulaSub: "Escolhe sozinho o pacote mais antigo com crédito disponível (FEFO) e desconta 1 crédito.",
        servico: "Serviço",
        notaOpcional: "Nota (opcional)",
        botaoRegistrar: "Registrar",
        pacotesTitulo: "Pacotes de crédito",
        descricao: "Descrição",
        creditosTotais: "Créditos totais",
        preco: "Preço (CHF)",
        validade: "Validade",
        botaoAdicionarPacote: "Adicionar pacote",
        creditosSufixo: "créditos",
        validadeTexto: (data) => `validade ${data}`,
        nenhumPacote: "Nenhum pacote cadastrado.",
        historicoTitulo: "Histórico de consumo",
        nenhumConsumo: "Nenhum consumo registrado.",
        novaFaturaTitulo: "Nova fatura",
        itemDescricaoPlaceholder: "Descrição do item",
        qtdPlaceholder: "Qtd",
        valorPlaceholder: "Valor (CHF)",
        botaoCriarFatura: "Criar fatura (rascunho)",
        nenhumaFatura: "Nenhuma fatura.",
      },
      faturas: {
        titulo: (n) => `Faturas (${n})`,
        subtitulo: "Faturas simples, sem cobrança automática ainda (Stripe fica para depois).",
        abas: { todas: "Todas", rascunho: "Rascunho", enviada: "Enviada", paga: "Paga", vencida: "Vencida", arquivada: "Arquivada" },
        faturaLabel: (numero) => `Fatura ${numero}`,
        marcarComo: (statusLabel) => `Marcar como ${statusLabel}`,
        nenhumaFatura: "Nenhuma fatura encontrada.",
        statTotalFaturado: "Total faturado",
        statAguardando: "Aguardando pagamento",
        statVencidas: "Vencidas",
        colFatura: "Fatura #",
        colCliente: "Cliente",
        colEmissao: "Data de emissão",
        colVencimento: "Vencimento",
        colMontante: "Montante (CHF)",
        colEstado: "Estado",
        colAcoes: "Ações",
        baixarQrBill: "Baixar QR-Bill",
        semVencimento: "—",
      },
      importar: {
        titulo: "Importar do Magic Heidi",
        subtitulo:
          "Importador provisório — hoje só traz Clientes (nome, e-mail, telefone). Assim que tivermos um export real de Fatture/Pacchetti do Magic Heidi, ajusto pra migrar o histórico completo.",
        erroVazio: "O arquivo está vazio ou só tem o cabeçalho.",
        erroSemColuna: "Não encontrei uma coluna de nome no CSV (esperado: nome, name ou cliente).",
        erroGenerico: "Não foi possível importar o arquivo.",
        secaoTitulo: "Importar Clientes (CSV)",
        secaoSubtitulo: "Cabeçalho esperado na primeira linha: uma coluna de nome (nome/name/cliente) e, opcionalmente, email e telefone.",
        botaoImportar: "Importar",
      },
      empresa: {
        titulo: "A minha empresa",
        subtitulo: "Dados fiscais e contas bancárias usados nas faturas QR-Bill.",
        abaDados: "Dados da empresa",
        abaContas: "Contas bancárias QR-IBAN",
        abaCategorias: "Categorias",
        identificacaoTitulo: "Identificação e endereço suíço",
        identificacaoSub: "Esses dados aparecem no cabeçalho das faturas QR-Bill emitidas.",
        nome: "Nome ou razão social",
        rua: "Rua",
        numero: "Número",
        cep: "CEP",
        cidade: "Cidade",
        email: "E-mail",
        telefone: "Telefone",
        ivaTitulo: "IVA",
        ivaSubtitulo: "Taxas regulatórias da Administração Federal das Contribuições (AFC)",
        ivaNormal: "8.1% Normal",
        ivaNormalAjuda: "Padrão para produtos, serviços e consultoria geral na Suíça.",
        ivaReduzida: "2.6% Reduzida",
        ivaReduzidaAjuda: "Bens alimentares, livros, medicamentos e água canalizada.",
        ivaAlojamento: "3.8% Alojamento",
        ivaAlojamentoAjuda: "Setor de hotelaria e prestações especiais de alojamento.",
        isenta: "Empresa isenta de IVA suíço (faturamento anual abaixo de CHF 100.000)",
        qrIbanPronto: "QR-IBAN pronto",
        botaoSalvar: "Salvar",
        contasTitulo: "Contas bancárias",
        contasSub: "As faturas usam a conta correspondente à moeda delas.",
        banco: "Banco",
        moeda: "Moeda",
        iban: "IBAN",
        titular: "Titular",
        qrIban: "É um QR-IBAN",
        ativa: "Ativa",
        botaoAdicionarConta: "Adicionar conta bancária",
        remover: "Remover",
        nenhumaConta: "Nenhuma conta bancária cadastrada ainda.",
        categoriasTitulo: "Categorias de despesa",
        categoriasSub: "Usadas pra organizar as despesas registradas.",
        novaCategoriaPlaceholder: "Nome da categoria",
        botaoAdicionarCategoria: "+ Categoria",
        nenhumaCategoria: "Nenhuma categoria criada ainda.",
      },
      itens: {
        titulo: (n) => `Itens (${n})`,
        subtitulo: "Catálogo de serviços e produtos reutilizáveis nas faturas.",
        abaTodos: "Todos",
        abaServicos: "Serviços",
        abaProdutos: "Produtos",
        abaTaxas: "Taxas e descontos",
        novoItemTitulo: "Novo item",
        descricao: "Descrição",
        tipo: "Tipo",
        tipoServico: "Serviço",
        tipoProduto: "Produto",
        tipoTaxaDesconto: "Taxa ou desconto",
        precoUnitario: "Preço (CHF)",
        unidade: "Unidade",
        unidadePlaceholder: "ex: hora, kg, peça",
        botaoCriar: "Criar",
        colNome: "Nome do item",
        colTipo: "Tipo",
        colUnidade: "Unidade",
        colPreco: "Preço unitário",
        colAcoes: "Ações",
        nenhumItem: "Nenhum item cadastrado ainda.",
        editar: "Editar",
        remover: "Remover",
        salvar: "Salvar",
        cancelar: "Cancelar",
      },
      despesas: {
        titulo: (n) => `Despesas (${n})`,
        subtitulo: "Registro de despesas do negócio.",
        novaDespesaTitulo: "Nova despesa",
        descricao: "Descrição",
        valor: "Preço (CHF)",
        metodoPagamento: "Método de pagamento",
        metodoDinheiro: "Dinheiro",
        metodoTransferencia: "Transferência bancária",
        metodoCartao: "Cartão",
        metodoTwint: "TWINT",
        metodoOutro: "Outro",
        data: "Data",
        categoria: "Categoria",
        semCategoria: "Sem categoria",
        fornecedor: "Fornecedor / Emitente",
        tags: "Tags (separadas por vírgula)",
        tagsAjuda: "ex: Reembolsável, Projeto Alpha",
        pago: "Pago",
        comprovante: "Comprovante (opcional)",
        botaoRegistrar: "Registrar despesa",
        nenhumaDespesa: "Nenhuma despesa registrada ainda.",
        remover: "Remover",
        totalLabel: "Total",
        botaoNovaDespesa: "Nova despesa",
        nova: {
          voltar: "Voltar para despesas",
          tituloPagina: "Nova despesa",
          rascunho: "Rascunho",
          statusPago: "PAGO",
          statusAPagar: "A PAGAR",
          recorrenciaUmaVez: "Uma vez",
          botaoGuardar: "Salvar",
          documentosTitulo: "Documentos e comprovante",
          digitalizeTitulo: "Anexe o comprovante",
          digitalizeTexto: "Envie uma imagem ou PDF do comprovante para guardar junto com a despesa.",
          botaoGaleria: "Galeria",
          botaoDocumentos: "Arquivos",
          formatosSuportados: "Formatos aceitos: PNG, JPG, HEIC, PDF até 25MB",
          conformidadeTitulo: "Conformidade fiscal suíça",
          conformidadeTexto: "Os comprovantes arquivados aqui seguem os critérios de guarda da administração fiscal suíça.",
          detalhesTitulo: "Detalhes da transação",
          moeda: "Moeda: Franco suíço (CHF)",
          ivaIncluido: "IVA incluído",
          novaCategoria: "+ Nova categoria",
          descartar: "Descartar",
          rodapeRascunho: "Rascunho ainda não salvo",
        },
      },
      analises: {
        titulo: "Análises",
        subtitulo: "Uma visão geral real, baseada nas faturas registradas.",
        faturamentoPorMesTitulo: "Faturamento por mês",
        nenhumDado: "Nenhum dado ainda.",
        topClientesTitulo: "Principais clientes por faturamento",
        nenhumCliente: "Nenhum cliente faturado ainda.",
        porStatusTitulo: "Faturas por status",
      },
      personalizar: {
        titulo: "Personalize a sua fatura",
        subtitulo: "Essas configurações são usadas nas faturas e no boleto QR.",
        logoTitulo: "Logótipo da fatura",
        logoSub: "O logótipo deve ser quadrado, PNG ou JPEG.",
        botaoCarregarLogo: "Carregar logótipo",
        anexoTitulo: "Anexo da fatura",
        anexoSub: "Envie um arquivo PDF pra anexar no final da fatura (ex: termos e condições).",
        botaoEnviarAnexo: "Enviar",
        emailRespostaTitulo: "E-mail de resposta",
        emailRespostaSub: "O endereço pro qual os clientes respondem quando respondem a uma fatura.",
        mensagemPadraoTitulo: "Mensagem padrão da fatura",
        mensagemPadraoSub: "Adicionada automaticamente ao final de todas as faturas.",
        mensagemPlaceholder: "Adicione texto personalizado à fatura",
        mensagemOrcamentoPlaceholder: "Adicione texto personalizado ao orçamento",
        assinaturaTitulo: "Campo de assinatura para orçamentos",
        assinaturaSub: "Exibir assinatura e data no final dos orçamentos.",
        nomeContaQrTitulo: "Nome da conta QR",
        nomeContaQrSub: "Substitui o nome da conta bancária na seção QR, se for diferente do nome da empresa.",
        referenciaTitulo: "Referência de pagamento",
        referenciaSub: "Referência padrão pra incluir nas faturas (ex: pra uma conta Revolut Business).",
        prazoTitulo: "Prazo de pagamento",
        prazoSub: "Dias após a emissão em que faturas e orçamentos vencem.",
        prazoFatura: "Fatura",
        prazoOrcamento: "Orçamento",
        botaoSalvar: "Salvar",
      },
    },
  },
};

export function getPainelDicionario(locale: Locale): PainelDicionario {
  return PAINEL_DICIONARIOS[locale] ?? PAINEL_DICIONARIOS.it;
}
