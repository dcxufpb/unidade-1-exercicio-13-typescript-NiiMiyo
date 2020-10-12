import { Endereco } from "./endereco";
import { Loja } from "./loja";
import { Venda } from "./venda";

function verificaCampoObrigatorio(
	mensagemEsperada: string,
	departamento: Venda
) {
	let mensagemErro;
	try {
		departamento.dadosVendas();
	} catch (e) {
		mensagemErro = e.message;
	}
	expect(mensagemErro).toBe(mensagemEsperada);
}

const NOME_LOJA = "Loja 1";
const LOGRADOURO = "Log 1";
const NUMERO = 10;
const COMPLEMENTO = "C1";
const BAIRRO = "Bai 1";
const MUNICIPIO = "Mun 1";
const ESTADO = "E1";
const CEP = "11111-111";
const TELEFONE = "(11) 1111-1111";
const OBSERVACAO = "Obs 1";
const CNPJ = "11.111.111/1111-11";
const INSCRICAO_ESTADUAL = "123456789";

const LOJA_COMPLETA = new Loja(
	NOME_LOJA,
	new Endereco(
		LOGRADOURO,
		NUMERO,
		COMPLEMENTO,
		BAIRRO,
		MUNICIPIO,
		ESTADO,
		CEP
	),
	TELEFONE,
	OBSERVACAO,
	CNPJ,
	INSCRICAO_ESTADUAL
);

const DATA_PADRAO = new Date(2020, 10, 12, 15, 28, 45);
const CCF = 123456;
const COO = 654321;

const VENDA_COMPLETA = new Venda(LOJA_COMPLETA, DATA_PADRAO, CCF, COO);

// -----------

const TEXTO_VENDA_COMPLETA = "4/10/2020 15:28:45V CCF:123456 COO:654321";

const TEXTO_CUPOM_COMPLETO = `Loja 1
Log 1, 10 C1
Bai 1 - Mun 1 - E1
CEP:11111-111 Tel (11) 1111-1111
Obs 1
CNPJ: 11.111.111/1111-11
IE: 123456789
------------------------------
4/10/2020 15:28:45V CCF:123456 COO:654321
`;

test("Venda Completa", () => {
	expect(VENDA_COMPLETA.dadosVendas()).toBe(TEXTO_VENDA_COMPLETA);
});

test("Cupom Completo", () => {
	expect(VENDA_COMPLETA.imprimeCupom()).toBe(TEXTO_CUPOM_COMPLETO);
});

test("Validar COO", () => {
	let vendaCOO_0 = new Venda(LOJA_COMPLETA, DATA_PADRAO, CCF, 0);
	verificaCampoObrigatorio(
		"O Contador de Cupom Fiscal (COO) é obrigatório.",
		vendaCOO_0
	);
});

test("Validar CCF", () => {
	let vendaCCF_0 = new Venda(LOJA_COMPLETA, DATA_PADRAO, 0, COO);
	verificaCampoObrigatorio(
		"O Contador de Cupom Fiscal (CCF) é obrigatório.",
		vendaCCF_0
	);
});
