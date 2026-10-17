import { cookies } from "next/headers";
import Link from "next/link";
import {
  BookOpen,
  CalendarDays,
  Dumbbell,
  HeartPulse,
  Images,
  LayoutGrid,
  LayoutTemplate,
  LogOut,
  PanelLeft,
  Palette,
  Phone,
  Tag,
  User,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import {
  AnimatedSidebar,
  AnimatedSidebarContent,
  AnimatedSidebarFooter,
  AnimatedSidebarGroup,
  AnimatedSidebarGroupContent,
  AnimatedSidebarHeader,
  AnimatedSidebarInset,
  AnimatedSidebarMenu,
  AnimatedSidebarMenuButton,
  AnimatedSidebarMenuItem,
  AnimatedSidebarProvider,
  AnimatedSidebarRail,
  AnimatedSidebarTrigger,
} from "@/components/motion/animated-sidebar";
import { getConteudoEditavel, getColors } from "@/lib/content-store";
import { galleria as galleriaBase, LOCALES, type Locale, type Texto, type TextoLista } from "@/content/yoma";
import { PAINEL_LOCALE_COOKIE } from "@/lib/yomapanel-auth";
import { obterDicionarioPainel } from "@/lib/sistema-locale";
import SeletorSistema from "@/components/SeletorSistema";
import {
  definirIdiomaPainel,
  logout,
  salvarContatti,
  salvarHero,
  salvarStudio,
  salvarKristina,
  salvarDisciplina,
  salvarMassaggio,
  salvarListino,
  salvarEventi,
  salvarCores,
  enviarFoto,
} from "./actions";

const NOMES_IDIOMA: Record<Locale, string> = { it: "Italiano", en: "English", pt: "Português" };

export const dynamic = "force-dynamic";

const CORES_PADRAO: Record<string, string> = {
  menta: "#b8d4c6",
  "menta-scura": "#3f6653",
  lino: "#f6f2eb",
  sabbia: "#ebe3d6",
  legno: "#c49a6c",
  inchiostro: "#25302b",
  eucalipto: "#15302a",
  "eucalipto-2": "#1e3d35",
  crema: "#efe9df",
  avorio: "#faf7f2",
  champagne: "#ecdfca",
  cipria: "#dcbcb1",
  salvia: "#56705f",
  oro: "#b39668",
  notte: "#2d2a26",
};

function Secao({ id, titulo, children }: { id: string; titulo: string; children: React.ReactNode }) {
  return (
    <section id={id} className="vidro-card scroll-mt-20 rounded-2xl p-6 sm:p-8">
      <h2 className="text-lg font-semibold text-grafite">{titulo}</h2>
      <div className="mt-4 space-y-3">{children}</div>
    </section>
  );
}

function Campo({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="text-grafite/70">{label}</span>
      {children}
    </label>
  );
}

const input = "vidro-input mt-1.5 w-full px-3.5 text-sm outline-none";
const botao =
  "inline-flex h-10 items-center gap-2 rounded-xl bg-carmesim px-5 text-sm font-medium text-white shadow-sm shadow-carmesim/20 transition-all hover:bg-carmesim-escuro active:scale-[0.98]";

// Cada campo traduzível renderiza os 3 idiomas sempre (pra não perder o valor
// dos outros 2 ao salvar), mas só mostra o do idioma ativo — troca de aba =
// trocar o cookie e recarregar a página, sem precisar de JS no cliente.
function CampoIdioma({
  idioma,
  prefixo,
  valores,
  label,
  multiline,
  rows = 2,
}: {
  idioma: Locale;
  prefixo: string;
  valores: Texto;
  label: string;
  multiline?: boolean;
  rows?: number;
}) {
  return (
    <label className="block text-sm">
      <span className="text-grafite/70">
        {label} <span className="text-[0.65rem] uppercase tracking-wide text-carmesim">{NOMES_IDIOMA[idioma]}</span>
      </span>
      {LOCALES.map((l) =>
        multiline ? (
          <textarea key={l} hidden={l !== idioma} className={input} name={`${prefixo}_${l}`} defaultValue={valores[l]} rows={rows} />
        ) : (
          <input key={l} hidden={l !== idioma} className={input} name={`${prefixo}_${l}`} defaultValue={valores[l]} />
        )
      )}
    </label>
  );
}

function CampoListaIdioma({
  idioma,
  prefixo,
  valores,
  label,
  rows = 6,
}: {
  idioma: Locale;
  prefixo: string;
  valores: TextoLista;
  label: string;
  rows?: number;
}) {
  return (
    <label className="block text-sm">
      <span className="text-grafite/70">
        {label} <span className="text-[0.65rem] uppercase tracking-wide text-carmesim">{NOMES_IDIOMA[idioma]}</span>
      </span>
      {LOCALES.map((l) => (
        <textarea key={l} hidden={l !== idioma} className={input} name={`${prefixo}_${l}`} defaultValue={valores[l].join("\n")} rows={rows} />
      ))}
    </label>
  );
}

function SeletorIdioma({ atual, rotulo }: { atual: Locale; rotulo: string }) {
  return (
    <form action={definirIdiomaPainel} className="flex items-center gap-2">
      <span className="text-xs uppercase tracking-wide text-grafite/60">{rotulo}</span>
      {LOCALES.map((l) => (
        <button
          key={l}
          type="submit"
          name="locale"
          value={l}
          className={`rounded-md border px-3 py-1 text-xs uppercase tracking-wide transition-colors ${
            l === atual ? "border-carmesim bg-carmesim/10 text-carmesim" : "border-black/[0.08] text-grafite/70 hover:border-carmesim"
          }`}
        >
          {l}
        </button>
      ))}
    </form>
  );
}

function FormFoto({ original, label }: { original: string; label: string }) {
  return (
    <form action={enviarFoto} className="flex items-center gap-3 rounded-lg border border-black/[0.08] p-3 text-xs">
      <input type="hidden" name="original" value={original} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={original} alt="" className="size-14 shrink-0 rounded object-cover" />
      <div className="flex-1">
        <p className="font-medium">{label}</p>
        <input type="file" name="arquivo" accept="image/*" required className="mt-1 block w-full text-xs" />
      </div>
      <button type="submit" className="shrink-0 rounded-lg bg-carmesim px-3 py-1.5 text-white transition-colors hover:bg-carmesim-escuro">
        Enviar
      </button>
    </form>
  );
}

export default async function AdminPage() {
  const [conteudo, cores, cookieJar, sistema] = await Promise.all([
    getConteudoEditavel(),
    getColors(),
    cookies(),
    obterDicionarioPainel(),
  ]);
  const { contatti, hero, studio, kristina, discipline, massaggi, listini, eventi } = conteudo;
  const coresAtuais = { ...CORES_PADRAO, ...cores };
  const idiomaCookie = cookieJar.get(PAINEL_LOCALE_COOKIE)?.value;
  const idioma: Locale = LOCALES.includes(idiomaCookie as Locale) ? (idiomaCookie as Locale) : "it";
  const { locale: idiomaSistema, t } = sistema;

  const ITENS_MENU = [
    { href: "#contatos", label: t.panel.menu.contatos, icon: Phone },
    { href: "#capa", label: t.panel.menu.capa, icon: LayoutTemplate },
    { href: "#lo-studio", label: t.panel.menu.loStudio, icon: BookOpen },
    { href: "#kristina", label: t.panel.menu.kristina, icon: User },
    { href: "#praticas", label: t.panel.menu.praticas, icon: Dumbbell },
    { href: "#massagens", label: t.panel.menu.massagens, icon: HeartPulse },
    { href: "#precos", label: t.panel.menu.precos, icon: Tag },
    { href: "#eventos", label: t.panel.menu.eventos, icon: CalendarDays },
    { href: "#fotos", label: t.panel.menu.fotos, icon: Images },
    { href: "#cores", label: t.panel.menu.cores, icon: Palette },
  ];

  return (
    <AnimatedSidebarProvider className="vidro bg-vidro">
      <AnimatedSidebar
        ariaLabel={t.panel.marca}
        panelClassName="border-r border-black/[0.08] bg-white/65 backdrop-blur-[16px]"
      >
        <AnimatedSidebarHeader>
          <div className="flex items-center justify-between gap-2 px-2 py-1">
            <span className="truncate text-sm font-semibold text-foreground group-data-[state=collapsed]/sidebar:hidden">
              {t.panel.marca}
            </span>
            <Link
              href="/selecionar"
              title={t.trocarArea}
              className="text-muted-foreground transition-colors hover:text-foreground group-data-[state=collapsed]/sidebar:hidden"
            >
              <LayoutGrid className="size-4" />
            </Link>
          </div>
          <SeletorSistema atual={idiomaSistema} label={t.sistemaEm} />
        </AnimatedSidebarHeader>
        <AnimatedSidebarContent>
          <AnimatedSidebarGroup>
            <AnimatedSidebarGroupContent>
              <AnimatedSidebarMenu>
                {ITENS_MENU.map((item) => (
                  <AnimatedSidebarMenuItem key={item.href}>
                    <AnimatedSidebarMenuButton href={item.href} icon={<item.icon className="size-4" />}>
                      {item.label}
                    </AnimatedSidebarMenuButton>
                  </AnimatedSidebarMenuItem>
                ))}
              </AnimatedSidebarMenu>
            </AnimatedSidebarGroupContent>
          </AnimatedSidebarGroup>
        </AnimatedSidebarContent>
        <AnimatedSidebarFooter>
          <div className="flex items-center gap-2.5 rounded-xl px-3 py-2">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-carmesim/15 text-carmesim">
              <User className="size-4" />
            </span>
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground group-data-[state=collapsed]/sidebar:hidden">
              {t.equipe}
            </span>
            <form action={logout}>
              <button
                type="submit"
                title={t.sair}
                className="shrink-0 text-muted-foreground transition-colors hover:text-foreground group-data-[state=collapsed]/sidebar:hidden"
              >
                <LogOut className="size-4" />
              </button>
            </form>
          </div>
        </AnimatedSidebarFooter>
        <AnimatedSidebarRail />
      </AnimatedSidebar>
      <AnimatedSidebarInset className="bg-transparent">
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border px-4 md:hidden">
          <AnimatedSidebarTrigger>
            <PanelLeft className="size-4" />
          </AnimatedSidebarTrigger>
          <span className="text-sm font-medium text-foreground">{t.panel.marca}</span>
          <Link href="/selecionar" title={t.trocarArea} className="ml-auto text-muted-foreground transition-colors hover:text-foreground">
            <LayoutGrid className="size-4" />
          </Link>
        </header>
        <>
          <PageHeader titulo={t.panel.titulo} acao={<SeletorIdioma atual={idioma} rotulo={t.panel.editandoEm} />} />
          <div className="max-w-4xl space-y-8 px-4 py-8 sm:px-8">
          <p className="text-sm text-muted-foreground">{t.panel.subtitulo}</p>

          <Secao id="contatos" titulo="Contatos">
          <form action={salvarContatti} className="grid gap-3 sm:grid-cols-2">
            <Campo label="Endereço">
              <input className={input} name="indirizzo" defaultValue={contatti.indirizzo} />
            </Campo>
            <Campo label="CEP / Cidade">
              <input className={input} name="cap" defaultValue={contatti.cap} />
            </Campo>
            <Campo label="Telefone (exibido)">
              <input className={input} name="telefono" defaultValue={contatti.telefono} />
            </Campo>
            <Campo label="Telefone (link tel:+...)">
              <input className={input} name="telefonoHref" defaultValue={contatti.telefonoHref} />
            </Campo>
            <Campo label="E-mail">
              <input className={input} name="email" defaultValue={contatti.email} />
            </Campo>
            <Campo label="WhatsApp (link wa.me)">
              <input className={input} name="whatsapp" defaultValue={contatti.whatsapp} />
            </Campo>
            <Campo label="Instagram (link)">
              <input className={input} name="instagram" defaultValue={contatti.instagram} />
            </Campo>
            <Campo label="Facebook (link)">
              <input className={input} name="facebook" defaultValue={contatti.facebook} />
            </Campo>
            <Campo label="Mapa (link)">
              <input className={input} name="mappa" defaultValue={contatti.mappa} />
            </Campo>
            <input type="hidden" name="nome" value={contatti.nome} />
            <input type="hidden" name="titolare" value={contatti.titolare} />
            <div className="sm:col-span-2">
              <button className={botao}>Salvar contatos</button>
            </div>
          </form>
        </Secao>

        <Secao id="capa" titulo="Capa (Hero)">
          <form action={salvarHero} className="space-y-3">
            <CampoIdioma idioma={idioma} prefixo="titolo" valores={hero.titolo} label="Título" />
            <CampoIdioma idioma={idioma} prefixo="sottotitolo" valores={hero.sottotitolo} label="Subtítulo" multiline rows={2} />
            <CampoIdioma idioma={idioma} prefixo="motto" valores={hero.motto} label="Frase (motto)" />
            <button className={botao}>Salvar capa</button>
          </form>
        </Secao>

        <Secao id="lo-studio" titulo="Lo Studio">
          <form action={salvarStudio} className="space-y-3">
            <CampoIdioma idioma={idioma} prefixo="titolo" valores={studio.titolo} label="Título" />
            <CampoListaIdioma idioma={idioma} prefixo="paragrafi" valores={studio.paragrafi} label="Parágrafos (um por linha)" rows={6} />
            <CampoIdioma idioma={idioma} prefixo="eventiTexto" valores={studio.eventi} label="Texto sobre eventos" multiline rows={3} />
            <CampoIdioma idioma={idioma} prefixo="citazione" valores={studio.citazione} label="Citação final" />
            <button className={botao}>Salvar Lo Studio</button>
          </form>
        </Secao>

        <Secao id="kristina" titulo="Kristina">
          <form action={salvarKristina} className="space-y-3">
            <Campo label="Nome">
              <input className={input} name="nome" defaultValue={kristina.nome} />
            </Campo>
            <CampoIdioma idioma={idioma} prefixo="ruolo" valores={kristina.ruolo} label="Função" />
            <CampoIdioma idioma={idioma} prefixo="motto" valores={kristina.motto} label="Motto" />
            <CampoListaIdioma idioma={idioma} prefixo="bio" valores={kristina.bio} label="Biografia (um parágrafo por linha)" rows={6} />
            <button className={botao}>Salvar Kristina</button>
          </form>
          <FormFoto original="/img/kristina.jpg" label="Foto da Kristina" />
        </Secao>

        <Secao id="praticas" titulo="Práticas (Yoga, Pilates, Reformer, Massaggi)">
          <div className="space-y-4">
            {discipline.map((d) => (
              <form key={d.id} action={salvarDisciplina} className="space-y-2 border-t border-black/[0.08] pt-4 first:border-0 first:pt-0">
                <input type="hidden" name="id" value={d.id} />
                <p className="text-sm font-medium">{d.nome.it}</p>
                <CampoIdioma idioma={idioma} prefixo="nome" valores={d.nome} label="Nome" />
                <CampoIdioma idioma={idioma} prefixo="sottotitolo" valores={d.sottotitolo} label="Subtítulo" />
                <CampoIdioma idioma={idioma} prefixo="testo" valores={d.testo} label="Texto" multiline rows={3} />
                <button className={botao}>Salvar {d.nome.it}</button>
              </form>
            ))}
          </div>
          <div className="mt-4 space-y-2">
            {discipline.map((d) => (
              <FormFoto key={d.id} original={d.immagine} label={`Foto — ${d.nome.it}`} />
            ))}
          </div>
        </Secao>

        <Secao id="massagens" titulo="Massagens (preços e textos)">
          <div className="space-y-4">
            {massaggi.map((m) => (
              <form key={m.id} action={salvarMassaggio} className="grid gap-2 border-t border-black/[0.08] pt-4 first:border-0 first:pt-0 sm:grid-cols-3">
                <input type="hidden" name="id" value={m.id} />
                <p className="sm:col-span-3 text-sm font-medium">{m.nome.it}</p>
                <Campo label="Duração">
                  <input className={input} name="durata" defaultValue={m.durata} />
                </Campo>
                <Campo label="Preço (CHF, só número)">
                  <input className={input} name="prezzo" type="number" defaultValue={m.prezzo ?? ""} />
                </Campo>
                <div className="sm:col-span-3">
                  <CampoIdioma idioma={idioma} prefixo="testo" valores={m.testo} label="Texto" multiline rows={2} />
                </div>
                <div className="sm:col-span-3">
                  <button className={botao}>Salvar {m.nome.it}</button>
                </div>
              </form>
            ))}
          </div>
          <div className="mt-4 space-y-2">
            {massaggi.map((m) => (
              <FormFoto key={m.id} original={m.immagine} label={`Foto — ${m.nome.it}`} />
            ))}
          </div>
        </Secao>

        <Secao id="precos" titulo="Tabela de preços">
          <div className="space-y-6">
            {listini.map((l) => (
              <form key={l.id} action={salvarListino} className="border-t border-black/[0.08] pt-4 first:border-0 first:pt-0">
                <input type="hidden" name="id" value={l.id} />
                <CampoIdioma idioma={idioma} prefixo="titolo" valores={l.titolo} label="Título da tabela" />
                <div className="mt-2 space-y-2">
                  {l.voci.map((v, i) => (
                    <div key={i} className="grid grid-cols-[2fr_1fr_1fr] gap-2">
                      {LOCALES.map((loc) => (
                        <input
                          key={loc}
                          hidden={loc !== idioma}
                          className={input}
                          name={`nome_${i}_${loc}`}
                          defaultValue={v.nome[loc]}
                          placeholder="Nome"
                        />
                      ))}
                      {LOCALES.map((loc) => (
                        <input
                          key={loc}
                          hidden={loc !== idioma}
                          className={input}
                          name={`prezzo_${i}_${loc}`}
                          defaultValue={v.prezzo[loc]}
                          placeholder="Preço"
                        />
                      ))}
                      {LOCALES.map((loc) => (
                        <input
                          key={loc}
                          hidden={loc !== idioma}
                          className={input}
                          name={`nota_${i}_${loc}`}
                          defaultValue={v.nota[loc]}
                          placeholder="Nota"
                        />
                      ))}
                    </div>
                  ))}
                </div>
                {l.note && <CampoIdioma idioma={idioma} prefixo="note" valores={l.note} label="Observação da tabela" />}
                <button className={botao}>Salvar {l.titolo.it}</button>
              </form>
            ))}
          </div>
        </Secao>

        <Secao id="eventos" titulo="Eventos e serate">
          <form action={salvarEventi} className="space-y-2">
            {eventi.map((e) => (
              <div key={e.id} className="grid grid-cols-[1fr_2fr] gap-2">
                <input type="hidden" name="id" value={e.id} />
                {LOCALES.map((loc) => (
                  <input key={loc} hidden={loc !== idioma} className={input} name={`nome_${loc}`} defaultValue={e.nome[loc]} placeholder="Nome" />
                ))}
                {LOCALES.map((loc) => (
                  <input key={loc} hidden={loc !== idioma} className={input} name={`testo_${loc}`} defaultValue={e.testo[loc]} placeholder="Texto" />
                ))}
              </div>
            ))}
            <p className="text-xs text-grafite/60">Deixe o nome (no idioma italiano) em branco para remover uma linha ao salvar.</p>
            <button className={botao}>Salvar eventos</button>
          </form>
        </Secao>

        <Secao id="fotos" titulo="Outras fotos (capa e galeria)">
          <div className="space-y-2">
            <FormFoto original="/img/studio-sala.jpg" label="Capa — foto 1" />
            <FormFoto original="/img/massaggio-hotstone.jpg" label="Capa — foto 2" />
            <FormFoto original="/img/pilates-mat-1.jpg" label="Capa — foto 3" />
            <FormFoto original="/img/massaggio-spalle.jpg" label="Carta dei massaggi — foto" />
            {galleriaBase.map((g, i) => (
              <FormFoto key={g.src} original={g.src} label={`Galeria — foto ${i + 1}`} />
            ))}
          </div>
        </Secao>

        <Secao id="cores" titulo="Cores da V3 (Firma)">
          <form action={salvarCores} className="grid gap-3 sm:grid-cols-3">
            {Object.entries(coresAtuais).map(([chave, valor]) => (
              <Campo key={chave} label={chave}>
                <input className="mt-1 h-10 w-full" type="color" name={chave} defaultValue={valor} />
              </Campo>
            ))}
            <div className="sm:col-span-3">
              <button className={botao}>Salvar cores</button>
            </div>
          </form>
          </Secao>
          </div>
        </>
      </AnimatedSidebarInset>
    </AnimatedSidebarProvider>
  );
}
