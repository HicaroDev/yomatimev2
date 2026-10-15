import {
  BookOpen,
  CalendarDays,
  Dumbbell,
  HeartPulse,
  Images,
  LayoutTemplate,
  LogOut,
  PanelLeft,
  Palette,
  Phone,
  Tag,
  User,
} from "lucide-react";
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
import { getContent, getColors } from "@/lib/content-store";
import { galleria as galleriaBase } from "@/content/yoma";
import {
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

const ITENS_MENU = [
  { href: "#contatos", label: "Contatos", icon: Phone },
  { href: "#capa", label: "Capa", icon: LayoutTemplate },
  { href: "#lo-studio", label: "Lo Studio", icon: BookOpen },
  { href: "#kristina", label: "Kristina", icon: User },
  { href: "#praticas", label: "Práticas", icon: Dumbbell },
  { href: "#massagens", label: "Massagens", icon: HeartPulse },
  { href: "#precos", label: "Preços", icon: Tag },
  { href: "#eventos", label: "Eventos", icon: CalendarDays },
  { href: "#fotos", label: "Fotos", icon: Images },
  { href: "#cores", label: "Cores", icon: Palette },
];

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
    <section id={id} className="scroll-mt-20 rounded border border-oro/40 bg-white/70 p-5 sm:p-7">
      <h2 className="text-lg font-semibold text-notte">{titulo}</h2>
      <div className="mt-4 space-y-3">{children}</div>
    </section>
  );
}

function Campo({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="text-notte/70">{label}</span>
      {children}
    </label>
  );
}

const input = "mt-1 w-full border border-oro/50 bg-white px-3 py-2 text-sm outline-none focus:border-salvia";
const botao = "mt-2 bg-notte px-4 py-2 text-sm text-avorio transition-colors hover:bg-salvia";

function FormFoto({ original, label }: { original: string; label: string }) {
  return (
    <form action={enviarFoto} className="flex items-center gap-3 border border-oro/30 p-3 text-xs">
      <input type="hidden" name="original" value={original} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={original} alt="" className="size-14 shrink-0 rounded object-cover" />
      <div className="flex-1">
        <p className="font-medium">{label}</p>
        <input type="file" name="arquivo" accept="image/*" required className="mt-1 block w-full text-xs" />
      </div>
      <button type="submit" className="shrink-0 bg-notte px-3 py-1.5 text-avorio hover:bg-salvia">
        Enviar
      </button>
    </form>
  );
}

export default async function AdminPage() {
  const [conteudo, cores] = await Promise.all([getContent(), getColors()]);
  const { contatti, hero, studio, kristina, discipline, massaggi, listini, eventi } = conteudo;
  const coresAtuais = { ...CORES_PADRAO, ...cores };

  return (
    <AnimatedSidebarProvider>
      <AnimatedSidebar ariaLabel="Painel YomaTime" panelClassName="border-oro/30">
        <AnimatedSidebarHeader>
          <div className="flex items-center gap-2 px-2 py-1">
            <span className="truncate text-sm font-semibold text-foreground group-data-[state=collapsed]/sidebar:hidden">
              YomaTime · Painel
            </span>
          </div>
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
          <form action={logout}>
            <button
              type="submit"
              className="flex min-h-9 w-full items-center gap-2.5 rounded-xl px-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <LogOut className="size-4" /> Sair
            </button>
          </form>
        </AnimatedSidebarFooter>
        <AnimatedSidebarRail />
      </AnimatedSidebar>
      <AnimatedSidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border px-4 md:hidden">
          <AnimatedSidebarTrigger>
            <PanelLeft className="size-4" />
          </AnimatedSidebarTrigger>
          <span className="text-sm font-medium text-foreground">YomaTime · Painel</span>
        </header>
        <div className="mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-8">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Painel YomaTime</h1>
            <p className="text-sm text-muted-foreground">
              Edite aqui o texto, as fotos e as cores do site. As mudanças aparecem no site assim que você salvar.
            </p>
          </div>

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
            <Campo label="Título">
              <input className={input} name="titolo" defaultValue={hero.titolo} />
            </Campo>
            <Campo label="Subtítulo">
              <textarea className={input} name="sottotitolo" defaultValue={hero.sottotitolo} rows={2} />
            </Campo>
            <Campo label="Frase (motto)">
              <input className={input} name="motto" defaultValue={hero.motto} />
            </Campo>
            <button className={botao}>Salvar capa</button>
          </form>
        </Secao>

        <Secao id="lo-studio" titulo="Lo Studio">
          <form action={salvarStudio} className="space-y-3">
            <Campo label="Título">
              <input className={input} name="titolo" defaultValue={studio.titolo} />
            </Campo>
            <Campo label="Parágrafos (um por linha)">
              <textarea className={input} name="paragrafi" defaultValue={studio.paragrafi.join("\n")} rows={6} />
            </Campo>
            <Campo label="Texto sobre eventos">
              <textarea className={input} name="eventiTexto" defaultValue={studio.eventi} rows={3} />
            </Campo>
            <Campo label="Citação final">
              <input className={input} name="citazione" defaultValue={studio.citazione} />
            </Campo>
            <button className={botao}>Salvar Lo Studio</button>
          </form>
        </Secao>

        <Secao id="kristina" titulo="Kristina">
          <form action={salvarKristina} className="space-y-3">
            <Campo label="Nome">
              <input className={input} name="nome" defaultValue={kristina.nome} />
            </Campo>
            <Campo label="Função">
              <input className={input} name="ruolo" defaultValue={kristina.ruolo} />
            </Campo>
            <Campo label="Motto">
              <input className={input} name="motto" defaultValue={kristina.motto} />
            </Campo>
            <Campo label="Biografia (um parágrafo por linha)">
              <textarea className={input} name="bio" defaultValue={kristina.bio.join("\n")} rows={6} />
            </Campo>
            <button className={botao}>Salvar Kristina</button>
          </form>
          <FormFoto original="/img/kristina.jpg" label="Foto da Kristina" />
        </Secao>

        <Secao id="praticas" titulo="Práticas (Yoga, Pilates, Reformer, Massaggi)">
          <div className="space-y-4">
            {discipline.map((d) => (
              <form key={d.id} action={salvarDisciplina} className="space-y-2 border-t border-oro/30 pt-4 first:border-0 first:pt-0">
                <input type="hidden" name="id" value={d.id} />
                <p className="text-sm font-medium">{d.nome}</p>
                <Campo label="Subtítulo">
                  <input className={input} name="sottotitolo" defaultValue={d.sottotitolo} />
                </Campo>
                <Campo label="Texto">
                  <textarea className={input} name="testo" defaultValue={d.testo} rows={3} />
                </Campo>
                <input type="hidden" name="nome" value={d.nome} />
                <button className={botao}>Salvar {d.nome}</button>
              </form>
            ))}
          </div>
          <div className="mt-4 space-y-2">
            {discipline.map((d) => (
              <FormFoto key={d.id} original={d.immagine} label={`Foto — ${d.nome}`} />
            ))}
          </div>
        </Secao>

        <Secao id="massagens" titulo="Massagens (preços e textos)">
          <div className="space-y-4">
            {massaggi.map((m) => (
              <form key={m.nome} action={salvarMassaggio} className="grid gap-2 border-t border-oro/30 pt-4 first:border-0 first:pt-0 sm:grid-cols-3">
                <input type="hidden" name="chave" value={m.nome} />
                <p className="sm:col-span-3 text-sm font-medium">{m.nome}</p>
                <Campo label="Duração">
                  <input className={input} name="durata" defaultValue={m.durata} />
                </Campo>
                <Campo label="Preço (CHF, só número)">
                  <input className={input} name="prezzo" type="number" defaultValue={m.prezzo ?? ""} />
                </Campo>
                <div className="sm:col-span-3">
                  <Campo label="Texto">
                    <textarea className={input} name="testo" defaultValue={m.testo} rows={2} />
                  </Campo>
                </div>
                <div className="sm:col-span-3">
                  <button className={botao}>Salvar {m.nome}</button>
                </div>
              </form>
            ))}
          </div>
          <div className="mt-4 space-y-2">
            {massaggi.map((m) => (
              <FormFoto key={m.nome} original={m.immagine} label={`Foto — ${m.nome}`} />
            ))}
          </div>
        </Secao>

        <Secao id="precos" titulo="Tabela de preços">
          <div className="space-y-6">
            {listini.map((l) => (
              <form key={l.id} action={salvarListino} className="border-t border-oro/30 pt-4 first:border-0 first:pt-0">
                <input type="hidden" name="id" value={l.id} />
                <p className="text-sm font-medium">{l.titolo}</p>
                <div className="mt-2 space-y-2">
                  {l.voci.map((v, i) => (
                    <div key={i} className="grid grid-cols-[2fr_1fr_1fr] gap-2">
                      <input className={input} name={`nome_${i}`} defaultValue={v.nome} />
                      <input className={input} name={`prezzo_${i}`} defaultValue={v.prezzo} />
                      <input className={input} name={`nota_${i}`} defaultValue={v.nota} />
                    </div>
                  ))}
                </div>
                {l.note !== undefined && (
                  <Campo label="Observação da tabela">
                    <input className={input} name="note" defaultValue={l.note ?? ""} />
                  </Campo>
                )}
                <button className={botao}>Salvar {l.titolo}</button>
              </form>
            ))}
          </div>
        </Secao>

        <Secao id="eventos" titulo="Eventos e serate">
          <form action={salvarEventi} className="space-y-2">
            {eventi.map((e, i) => (
              <div key={i} className="grid grid-cols-[1fr_2fr] gap-2">
                <input className={input} name="nome" defaultValue={e.nome} />
                <input className={input} name="testo" defaultValue={e.testo} />
              </div>
            ))}
            <p className="text-xs text-notte/60">Deixe o nome em branco para remover uma linha ao salvar.</p>
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
      </AnimatedSidebarInset>
    </AnimatedSidebarProvider>
  );
}
