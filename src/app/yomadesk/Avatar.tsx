const CORES = [
  "bg-carmesim/12 text-carmesim",
  "bg-acento-azul/12 text-acento-azul",
  "bg-acento-indigo/12 text-acento-indigo",
  "bg-grafite-suave/12 text-grafite-suave",
];

function iniciais(nome: string) {
  const partes = nome.trim().split(/\s+/);
  const letras = partes.length > 1 ? partes[0][0] + partes[1][0] : partes[0].slice(0, 2);
  return letras.toUpperCase();
}

function corDe(nome: string) {
  let hash = 0;
  for (let i = 0; i < nome.length; i++) hash = (hash + nome.charCodeAt(i)) % CORES.length;
  return CORES[hash];
}

export default function Avatar({ nome, tamanho = "size-8", className = "" }: { nome: string; tamanho?: string; className?: string }) {
  return (
    <span
      className={`inline-flex ${tamanho} shrink-0 items-center justify-center rounded-lg text-xs font-semibold ${corDe(nome)} ${className}`.trim()}
    >
      {iniciais(nome)}
    </span>
  );
}
