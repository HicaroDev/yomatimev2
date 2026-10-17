// Header fixo por página (replica o padrão do mockup de referência: título + contagem
// real + ação principal, ocupando a largura toda da área de conteúdo — só o corpo
// abaixo dele fica mais estreito e grudado à esquerda, igual ao mockup original.
export default function PageHeader({
  titulo,
  contagem,
  acao,
}: {
  titulo: string;
  contagem?: number;
  acao?: React.ReactNode;
}) {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-[16px] sm:px-8">
      <div className="flex items-center gap-2 min-w-0">
        <h1 className="truncate text-base font-semibold text-foreground">{titulo}</h1>
        {contagem !== undefined && (
          <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs font-medium tabular-nums text-muted-foreground">
            {contagem}
          </span>
        )}
      </div>
      {acao && <div className="shrink-0">{acao}</div>}
    </header>
  );
}
