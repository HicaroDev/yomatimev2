"use client";

import { useState } from "react";
import MaterialIcon from "@/components/MaterialIcon";

type Item = {
  id: string;
  descricao: string;
  tipo: string;
  unidade: string | null;
  precoUnitario: string;
};

const input = "vidro-input w-full px-2.5 py-1.5 text-sm outline-none";

export default function ItemRow({
  item,
  rotuloTipo,
  textos,
  atualizarItemCatalogo,
  removerItemCatalogo,
}: {
  item: Item;
  rotuloTipo: Record<string, string>;
  textos: {
    tipoServico: string;
    tipoProduto: string;
    tipoTaxaDesconto: string;
    unidadePlaceholder: string;
    editar: string;
    remover: string;
    salvar: string;
    cancelar: string;
  };
  atualizarItemCatalogo: (formData: FormData) => void;
  removerItemCatalogo: (formData: FormData) => void;
}) {
  const [editando, setEditando] = useState(false);

  if (editando) {
    return (
      <tr>
        <td colSpan={5} className="px-4 py-3">
          <form
            action={(fd) => {
              atualizarItemCatalogo(fd);
              setEditando(false);
            }}
            className="grid gap-2 sm:grid-cols-5"
          >
            <input type="hidden" name="id" value={item.id} />
            <input className={`${input} sm:col-span-2`} name="descricao" defaultValue={item.descricao} required />
            <select className={input} name="tipo" defaultValue={item.tipo}>
              <option value="servico">{textos.tipoServico}</option>
              <option value="produto">{textos.tipoProduto}</option>
              <option value="taxa_desconto">{textos.tipoTaxaDesconto}</option>
            </select>
            <input className={input} name="unidade" defaultValue={item.unidade ?? ""} placeholder={textos.unidadePlaceholder} />
            <input className={input} name="precoUnitario" type="number" step="0.01" defaultValue={item.precoUnitario} required />
            <div className="flex items-center gap-2 sm:col-span-5">
              <button type="submit" className="rounded-lg bg-carmesim px-3 py-1.5 text-xs font-medium text-white hover:bg-carmesim-escuro">
                {textos.salvar}
              </button>
              <button type="button" onClick={() => setEditando(false)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                <MaterialIcon name="close" className="text-[14px]" />
                {textos.cancelar}
              </button>
            </div>
          </form>
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-acento-azul/12 text-acento-azul">
            <MaterialIcon name="inventory_2" className="text-[16px]" />
          </span>
          <span className="font-medium text-grafite">{item.descricao}</span>
        </div>
      </td>
      <td className="px-4 py-3 text-muted-foreground">{rotuloTipo[item.tipo] ?? item.tipo}</td>
      <td className="px-4 py-3 text-muted-foreground">{item.unidade ?? "—"}</td>
      <td className="px-4 py-3 text-right font-medium text-grafite">CHF {Number(item.precoUnitario).toFixed(2)}</td>
      <td className="px-4 py-3 text-right">
        <div className="flex items-center justify-end gap-2">
          <button type="button" title={textos.editar} onClick={() => setEditando(true)} className="text-muted-foreground transition-colors hover:text-foreground">
            <MaterialIcon name="edit" className="text-[16px]" />
          </button>
          <form action={removerItemCatalogo}>
            <input type="hidden" name="id" value={item.id} />
            <button type="submit" title={textos.remover} className="text-muted-foreground transition-colors hover:text-red-600">
              <MaterialIcon name="delete" className="text-[16px]" />
            </button>
          </form>
        </div>
      </td>
    </tr>
  );
}
