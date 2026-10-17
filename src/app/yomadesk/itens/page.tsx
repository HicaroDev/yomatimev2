import Link from "next/link";
import { bancoConfigurado, tabelaNaoExiste } from "@/lib/yomadesk/db";
import { listarItensCatalogo } from "@/lib/yomadesk/queries";
import { obterDicionarioPainel } from "@/lib/sistema-locale";
import { atualizarItemCatalogo, criarItemCatalogo, removerItemCatalogo } from "../actions";
import BancoNaoConfigurado from "../BancoNaoConfigurado";
import PageHeader from "@/components/PageHeader";
import ItemRow from "./ItemRow";

export const dynamic = "force-dynamic";

const input = "vidro-input mt-1.5 w-full px-3.5 text-sm outline-none";
const botao =
  "inline-flex h-10 items-center gap-2 rounded-xl bg-carmesim px-5 text-sm font-medium text-white shadow-sm shadow-carmesim/20 transition-all hover:bg-carmesim-escuro active:scale-[0.98]";

export default async function ItensPage({ searchParams }: { searchParams: Promise<{ tipo?: string }> }) {
  const { t, locale } = await obterDicionarioPainel();
  const i = t.yomadesk.itens;

  if (!bancoConfigurado) {
    return (
      <>
        <PageHeader titulo={t.yomadesk.menu.itens} />
        <div className="max-w-4xl px-4 py-8 sm:px-8">
          <BancoNaoConfigurado locale={locale} />
        </div>
      </>
    );
  }

  const { tipo = "" } = await searchParams;
  let itens;
  try {
    itens = await listarItensCatalogo(tipo || undefined);
  } catch (erro) {
    if (!tabelaNaoExiste(erro)) throw erro;
    return (
      <>
        <PageHeader titulo={t.yomadesk.menu.itens} />
        <div className="max-w-4xl px-4 py-8 sm:px-8">
          <BancoNaoConfigurado tabelasFaltando locale={locale} />
        </div>
      </>
    );
  }

  const ROTULO_TIPO: Record<string, string> = {
    servico: i.tipoServico,
    produto: i.tipoProduto,
    taxa_desconto: i.tipoTaxaDesconto,
  };

  const ABAS = [
    { valor: "", label: i.abaTodos },
    { valor: "servico", label: i.abaServicos },
    { valor: "produto", label: i.abaProdutos },
    { valor: "taxa_desconto", label: i.abaTaxas },
  ];

  return (
    <>
      <PageHeader titulo={i.titulo(itens.length)} />
      <div className="max-w-4xl space-y-6 px-4 py-8 sm:px-8">
        <p className="text-sm text-muted-foreground">{i.subtitulo}</p>

        <nav className="flex flex-wrap gap-2 text-sm">
          {ABAS.map((aba) => (
            <Link
              key={aba.valor}
              href={aba.valor ? `/yomadesk/itens?tipo=${aba.valor}` : "/yomadesk/itens"}
              className={`rounded-full border px-3 py-1 transition-colors ${
                tipo === aba.valor ? "border-carmesim bg-carmesim/10 text-carmesim" : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {aba.label}
            </Link>
          ))}
        </nav>

        <section className="rounded-xl border border-border bg-white/75 p-5 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)] backdrop-blur-[24px]">
          <h2 className="text-lg font-semibold text-grafite">{i.novoItemTitulo}</h2>
          <form action={criarItemCatalogo} className="mt-3 grid gap-3 sm:grid-cols-4">
            <label className="block text-sm sm:col-span-2">
              <span className="text-grafite/70">{i.descricao}</span>
              <input className={input} name="descricao" required />
            </label>
            <label className="block text-sm">
              <span className="text-grafite/70">{i.tipo}</span>
              <select className={input} name="tipo" defaultValue="servico">
                <option value="servico">{i.tipoServico}</option>
                <option value="produto">{i.tipoProduto}</option>
                <option value="taxa_desconto">{i.tipoTaxaDesconto}</option>
              </select>
            </label>
            <label className="block text-sm">
              <span className="text-grafite/70">{i.precoUnitario}</span>
              <input className={input} name="precoUnitario" type="number" step="0.01" required />
            </label>
            <label className="block text-sm sm:col-span-3">
              <span className="text-grafite/70">{i.unidade}</span>
              <input className={input} name="unidade" placeholder={i.unidadePlaceholder} />
            </label>
            <div className="flex items-end">
              <button className={botao}>{i.botaoCriar}</button>
            </div>
          </form>
        </section>

        <section className="overflow-hidden rounded-xl border border-border bg-white/75 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)] backdrop-blur-[24px]">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th className="px-4 py-2 font-medium">{i.colNome}</th>
                  <th className="px-4 py-2 font-medium">{i.colTipo}</th>
                  <th className="px-4 py-2 font-medium">{i.colUnidade}</th>
                  <th className="px-4 py-2 font-medium text-right">{i.colPreco}</th>
                  <th className="px-4 py-2 font-medium text-right">{i.colAcoes}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {itens.map((item) => (
                  <ItemRow
                    key={item.id}
                    item={item}
                    rotuloTipo={ROTULO_TIPO}
                    textos={{
                      tipoServico: i.tipoServico,
                      tipoProduto: i.tipoProduto,
                      tipoTaxaDesconto: i.tipoTaxaDesconto,
                      unidadePlaceholder: i.unidadePlaceholder,
                      editar: i.editar,
                      remover: i.remover,
                      salvar: i.salvar,
                      cancelar: i.cancelar,
                    }}
                    atualizarItemCatalogo={atualizarItemCatalogo}
                    removerItemCatalogo={removerItemCatalogo}
                  />
                ))}
              </tbody>
            </table>
          </div>
          {itens.length === 0 && <p className="px-4 py-10 text-center text-sm text-muted-foreground">{i.nenhumItem}</p>}
        </section>
      </div>
    </>
  );
}
