import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import { SwissQRBill } from "swissqrbill/pdf";
import { montarDadosQRBill } from "@/lib/yomadesk/qrbill";
import { obterFatura } from "@/lib/yomadesk/queries";
import { SISTEMA_LOCALE_COOKIE } from "@/lib/yomapanel-auth";

// O boleto QR suíço só suporta DE/EN/FR/IT/RM (não tem português) — PT cai pra EN.
const IDIOMA_BOLETO: Record<string, "IT" | "EN"> = { it: "IT", en: "EN", pt: "EN" };

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [dados, resultado] = await Promise.all([montarDadosQRBill(id), obterFatura(id)]);
  if (!dados || !resultado) {
    return NextResponse.json(
      { erro: "Fatura, dados da empresa ou conta bancária ainda não configurados." },
      { status: 404 }
    );
  }
  const { fatura, itens } = resultado;

  const pdf = new PDFDocument({ size: "A4", margins: { top: 50, left: 50, right: 50, bottom: 50 } });
  const chunks: Buffer[] = [];
  pdf.on("data", (c: Buffer) => chunks.push(c));
  const pronto = new Promise<Buffer>((resolve) => pdf.on("end", () => resolve(Buffer.concat(chunks))));

  pdf.fontSize(20).text("YomaTime", 50, 50);
  pdf.fontSize(10).fillColor("#555").text(`Fatura ${fatura.numero}`, 50, 80);
  pdf.text(`Emitida em ${new Date(fatura.emitidaEm).toLocaleDateString("pt-BR")}`, 50, 94);
  if (fatura.vencimentoEm) {
    pdf.text(`Vencimento: ${new Date(fatura.vencimentoEm).toLocaleDateString("pt-BR")}`, 50, 108);
  }

  pdf.fillColor("#000").fontSize(12).text(fatura.clienteNome, 350, 80, { width: 200, align: "right" });
  if (fatura.clienteRua) {
    pdf.fontSize(10).fillColor("#555").text(`${fatura.clienteRua} ${fatura.clienteNumero ?? ""}`, 350, 98, { width: 200, align: "right" });
    pdf.text(`${fatura.clienteCep ?? ""} ${fatura.clienteCidade ?? ""}`, 350, 112, { width: 200, align: "right" });
  }

  let y = 170;
  pdf.fillColor("#000").fontSize(10);
  pdf.text("Descrição", 50, y).text("Qtd", 350, y).text("Valor unit.", 410, y).text("Total", 490, y);
  y += 16;
  pdf.moveTo(50, y).lineTo(545, y).strokeColor("#ddd").stroke();
  y += 10;
  for (const item of itens) {
    const subtotal = item.quantidade * Number(item.valorUnitario);
    pdf.fillColor("#333").text(item.descricao, 50, y, { width: 290 });
    pdf.text(String(item.quantidade), 350, y);
    pdf.text(`CHF ${Number(item.valorUnitario).toFixed(2)}`, 410, y);
    pdf.text(`CHF ${subtotal.toFixed(2)}`, 490, y);
    y += 20;
  }
  y += 10;
  pdf.moveTo(350, y).lineTo(545, y).strokeColor("#ddd").stroke();
  y += 10;
  pdf.fontSize(12).fillColor("#000").text("Total", 410, y).text(`CHF ${Number(fatura.total).toFixed(2)}`, 490, y);

  const idiomaCookie = (await cookies()).get(SISTEMA_LOCALE_COOKIE)?.value ?? "it";
  const qrBill = new SwissQRBill(dados, { language: IDIOMA_BOLETO[idiomaCookie] ?? "EN" });
  qrBill.attachTo(pdf);
  pdf.end();

  const buffer = await pronto;
  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${fatura.numero}.pdf"`,
    },
  });
}
