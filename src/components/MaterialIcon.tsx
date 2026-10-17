// Ícone "Material Symbols Outlined" (identidade "YomaDesk / Swiss Enterprise" dos
// mockups do YomaDeskV2) — a fonte é carregada só em /yomadesk (yomadesk/layout.tsx).
// `name` é o nome do glifo do Google Fonts (ex: "receipt_long", "inventory_2").
export default function MaterialIcon({
  name,
  className = "",
  filled = false,
}: {
  name: string;
  className?: string;
  filled?: boolean;
}) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{ fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 20` }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
