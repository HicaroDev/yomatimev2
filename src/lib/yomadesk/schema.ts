import { pgTable, text, integer, numeric, timestamp, uuid, pgEnum, boolean } from "drizzle-orm/pg-core";

export const origemEnum = pgEnum("origem", ["legado", "novo"]);
export const statusFaturaEnum = pgEnum("status_fatura", ["rascunho", "enviada", "paga", "vencida", "arquivada"]);
export const taxaIvaEnum = pgEnum("taxa_iva", ["normal_8_1", "reduzida_2_6", "alojamento_3_8"]);
export const tipoItemEnum = pgEnum("tipo_item", ["servico", "produto", "taxa_desconto"]);

export const clientes = pgTable("clientes", {
  id: uuid("id").primaryKey().defaultRandom(),
  nome: text("nome").notNull(),
  email: text("email"),
  telefone: text("telefone"),
  notas: text("notas"),
  // Dados fiscais/endereço (YomaDeskV2) — todos opcionais, a maioria dos clientes
  // da Kristina são pessoas físicas, não empresas com UID/IDE suíço.
  rua: text("rua"),
  numero: text("numero"),
  cep: text("cep"),
  cidade: text("cidade"),
  uidIde: text("uid_ide"),
  notaPrivada: text("nota_privada"),
  portalB2bHabilitado: boolean("portal_b2b_habilitado").notNull().default(false),
  criadoEm: timestamp("criado_em", { withTimezone: true }).notNull().defaultNow(),
});

export const pacotesCredito = pgTable("pacotes_credito", {
  id: uuid("id").primaryKey().defaultRandom(),
  clienteId: uuid("cliente_id")
    .notNull()
    .references(() => clientes.id, { onDelete: "cascade" }),
  descricao: text("descricao").notNull(),
  creditosTotais: integer("creditos_totais").notNull(),
  creditosUsados: integer("creditos_usados").notNull().default(0),
  preco: numeric("preco", { precision: 10, scale: 2 }),
  compradoEm: timestamp("comprado_em", { withTimezone: true }).notNull().defaultNow(),
  validadeEm: timestamp("validade_em", { withTimezone: true }),
  origem: origemEnum("origem").notNull().default("novo"),
});

export const consumos = pgTable("consumos", {
  id: uuid("id").primaryKey().defaultRandom(),
  pacoteId: uuid("pacote_id")
    .notNull()
    .references(() => pacotesCredito.id, { onDelete: "cascade" }),
  data: timestamp("data", { withTimezone: true }).notNull().defaultNow(),
  servico: text("servico").notNull(),
  nota: text("nota"),
});

export const faturas = pgTable("faturas", {
  id: uuid("id").primaryKey().defaultRandom(),
  numero: text("numero").notNull(),
  clienteId: uuid("cliente_id")
    .notNull()
    .references(() => clientes.id, { onDelete: "cascade" }),
  status: statusFaturaEnum("status").notNull().default("rascunho"),
  emitidaEm: timestamp("emitida_em", { withTimezone: true }).notNull().defaultNow(),
  vencimentoEm: timestamp("vencimento_em", { withTimezone: true }),
  pagaEm: timestamp("paga_em", { withTimezone: true }),
  total: numeric("total", { precision: 10, scale: 2 }).notNull().default("0"),
  origem: origemEnum("origem").notNull().default("novo"),
  // Previsto para a fase futura do Stripe — não usado ainda.
  metodoPagamento: text("metodo_pagamento"),
  stripePaymentId: text("stripe_payment_id"),
});

export const faturaItens = pgTable("fatura_itens", {
  id: uuid("id").primaryKey().defaultRandom(),
  faturaId: uuid("fatura_id")
    .notNull()
    .references(() => faturas.id, { onDelete: "cascade" }),
  descricao: text("descricao").notNull(),
  quantidade: integer("quantidade").notNull().default(1),
  valorUnitario: numeric("valor_unitario", { precision: 10, scale: 2 }).notNull(),
});

// --- YomaDeskV2 (16/10) — empresa, contas bancárias, catálogo, despesas, config. ---

// Linha única (sempre a mesma, id fixo) com os dados fiscais da YomaTime.
export const empresa = pgTable("empresa", {
  id: uuid("id").primaryKey().defaultRandom(),
  nome: text("nome").notNull().default(""),
  rua: text("rua"),
  numero: text("numero"),
  cep: text("cep"),
  cidade: text("cidade"),
  email: text("email"),
  telefone: text("telefone"),
  taxaIva: taxaIvaEnum("taxa_iva").notNull().default("normal_8_1"),
  isentaIva: boolean("isenta_iva").notNull().default(true),
});

export const contasBancarias = pgTable("contas_bancarias", {
  id: uuid("id").primaryKey().defaultRandom(),
  banco: text("banco").notNull(),
  moeda: text("moeda").notNull().default("CHF"),
  iban: text("iban").notNull(),
  qrIban: boolean("qr_iban").notNull().default(false),
  titular: text("titular").notNull(),
  ativa: boolean("ativa").notNull().default(true),
  criadoEm: timestamp("criado_em", { withTimezone: true }).notNull().defaultNow(),
});

export const itensCatalogo = pgTable("itens_catalogo", {
  id: uuid("id").primaryKey().defaultRandom(),
  descricao: text("descricao").notNull(),
  tipo: tipoItemEnum("tipo").notNull().default("servico"),
  precoUnitario: numeric("preco_unitario", { precision: 10, scale: 2 }).notNull(),
  unidade: text("unidade"),
  criadoEm: timestamp("criado_em", { withTimezone: true }).notNull().defaultNow(),
});

export const categoriasDespesa = pgTable("categorias_despesa", {
  id: uuid("id").primaryKey().defaultRandom(),
  nome: text("nome").notNull(),
  icone: text("icone"),
});

export const despesas = pgTable("despesas", {
  id: uuid("id").primaryKey().defaultRandom(),
  descricao: text("descricao").notNull(),
  valor: numeric("valor", { precision: 10, scale: 2 }).notNull(),
  metodoPagamento: text("metodo_pagamento").notNull().default("dinheiro"),
  categoriaId: uuid("categoria_id").references(() => categoriasDespesa.id, { onDelete: "set null" }),
  fornecedor: text("fornecedor"),
  data: timestamp("data", { withTimezone: true }).notNull().defaultNow(),
  pago: boolean("pago").notNull().default(true),
  comprovanteUrl: text("comprovante_url"),
  tags: text("tags").array(),
  criadoEm: timestamp("criado_em", { withTimezone: true }).notNull().defaultNow(),
});

// Linha única com as preferências de personalização de fatura.
export const configuracaoFatura = pgTable("configuracao_fatura", {
  id: uuid("id").primaryKey().defaultRandom(),
  logoUrl: text("logo_url"),
  anexoPdfUrl: text("anexo_pdf_url"),
  emailResposta: text("email_resposta"),
  mensagemPadrao: text("mensagem_padrao"),
  mensagemOrcamento: text("mensagem_orcamento"),
  exibirAssinatura: boolean("exibir_assinatura").notNull().default(true),
  nomeContaQR: text("nome_conta_qr"),
  referenciaPagamento: text("referencia_pagamento"),
  prazoFaturaDias: integer("prazo_fatura_dias").notNull().default(30),
  prazoOrcamentoDias: integer("prazo_orcamento_dias").notNull().default(14),
  usarPrazoPersonalizado: boolean("usar_prazo_personalizado").notNull().default(false),
});
