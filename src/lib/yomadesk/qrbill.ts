import { calculateQRReferenceChecksum, isQRIBAN } from "swissqrbill/utils";
import type { Data } from "swissqrbill/types";
import { obterConfiguracaoFatura, obterContaBancariaAtiva, obterEmpresa, obterFatura } from "./queries";

// Referência QR (26 dígitos + checksum) determinística a partir do número da
// fatura — só é exigida de verdade quando a conta é QR-IBAN (ver isQRIBAN abaixo).
function referenciaDe(numeroFatura: string): string {
  const digitos = numeroFatura.replace(/\D/g, "").padStart(26, "0").slice(-26);
  return digitos + calculateQRReferenceChecksum(digitos);
}

export async function montarDadosQRBill(faturaId: string): Promise<Data | null> {
  const resultado = await obterFatura(faturaId);
  if (!resultado) return null;
  const { fatura } = resultado;

  const [empresaDados, conta, config] = await Promise.all([
    obterEmpresa(),
    obterContaBancariaAtiva("CHF"),
    obterConfiguracaoFatura(),
  ]);
  if (!conta) return null;

  const data: Data = {
    amount: Number(fatura.total),
    currency: "CHF",
    creditor: {
      account: conta.iban.replace(/\s/g, ""),
      address: empresaDados.rua ?? "",
      buildingNumber: empresaDados.numero ?? undefined,
      city: empresaDados.cidade ?? "",
      country: "CH",
      name: config.nomeContaQR || empresaDados.nome || "YomaTime",
      zip: empresaDados.cep ?? "",
    },
    debtor: {
      address: fatura.clienteRua ?? "",
      buildingNumber: fatura.clienteNumero ?? undefined,
      city: fatura.clienteCidade ?? "",
      country: "CH",
      name: fatura.clienteNome,
      zip: fatura.clienteCep ?? "",
    },
  };

  if (isQRIBAN(data.creditor.account)) {
    data.reference = referenciaDe(fatura.numero);
  } else {
    data.message = config.referenciaPagamento || fatura.numero;
  }

  return data;
}
