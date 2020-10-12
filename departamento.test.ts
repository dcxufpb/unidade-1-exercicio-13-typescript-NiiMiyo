import { Coordenador } from "./coordenador";
import { Departamento } from "./departamento";

function verificaCampoObrigatorio(
	mensagemEsperada: string,
	departamento: Departamento
) {
	let mensagem;
	try {
		departamento.dadosDepartamento();
	} catch (e) {
		mensagem = e.message;
	}
	expect(mensagem).toBe(mensagemEsperada);
}

const NOME_DEPARTAMENTO = "Departamento 1";
const SIGLA = "Sigla 1";
const LOCALIZACAO = "11.1111111, 11.1111111";
const NOME_COORDENADOR = "Coordenador 1";
const IDADE = 11;
const CPF = "111.111.111-11";

const MENSAGEM_NOME_DEPARTAMENTO_OBRIGATORIO =
	"O nome do departamento é obrigatório.";

const MENSAGEM_LOCALIZACAO_OBRIGATORIA =
	"A localização do departamento é obrigatória.";

const MENSAGEM_NOME_COORDENADOR_OBRIGATORIO =
	"O nome do coordenador é obrigatório.";

const MENSAGEM_CPF_OBRIGATORIO = "O CPF do coordenador é obrigatório.";

const TEXTO_ESPERADO_DEPARTAMENTO_COMPLETO = `Departamento 1, Sigla 1
Localização: 11.1111111, 11.1111111

Coordenação:
Coordenador 1
Idade: 11
CPF: 111.111.111-11`;

const TEXTO_ESPERADO_SEM_SIGLA = `Departamento 1
Localização: 11.1111111, 11.1111111

Coordenação:
Coordenador 1
Idade: 11
CPF: 111.111.111-11`;

const TEXTO_ESPERADO_SEM_IDADE = `Departamento 1, Sigla 1
Localização: 11.1111111, 11.1111111

Coordenação:
Coordenador 1
CPF: 111.111.111-11`;

const TEXTO_ESPERADO_SEM_SIGLA_SEM_IDADE = `Departamento 1
Localização: 11.1111111, 11.1111111

Coordenação:
Coordenador 1
CPF: 111.111.111-11`;

const COORDENADOR_COMPLETO = new Coordenador(NOME_COORDENADOR, IDADE, CPF);

const DEPARTAMENTO_COMPLETO = new Departamento(
	NOME_DEPARTAMENTO,
	SIGLA,
	LOCALIZACAO,
	COORDENADOR_COMPLETO
);

test("Departamento Completo", () => {
	expect(DEPARTAMENTO_COMPLETO.dadosDepartamento()).toBe(
		TEXTO_ESPERADO_DEPARTAMENTO_COMPLETO
	);
});

test("Sigla Vazia", () => {
	let deptSiglaVazia = new Departamento(
		NOME_DEPARTAMENTO,
		"",
		LOCALIZACAO,
		COORDENADOR_COMPLETO
	);

	expect(deptSiglaVazia.dadosDepartamento()).toBe(TEXTO_ESPERADO_SEM_SIGLA);
});

test("Idade 0", () => {
	let coordIdade0 = new Coordenador(NOME_COORDENADOR, 0, CPF);
	let deptIdade0 = new Departamento(
		NOME_DEPARTAMENTO,
		SIGLA,
		LOCALIZACAO,
		coordIdade0
	);

	expect(deptIdade0.dadosDepartamento()).toBe(TEXTO_ESPERADO_SEM_IDADE);
});

test("Sigla Vazia e Idade 0", () => {
	let coordIdade0 = new Coordenador(NOME_COORDENADOR, 0, CPF);
	let deptSiglaVazia = new Departamento(
		NOME_DEPARTAMENTO,
		"",
		LOCALIZACAO,
		coordIdade0
	);

	expect(deptSiglaVazia.dadosDepartamento()).toBe(
		TEXTO_ESPERADO_SEM_SIGLA_SEM_IDADE
	);
});

test("Validar Nome Departamento", () => {
	let deptSemNome = new Departamento(
		"",
		SIGLA,
		LOCALIZACAO,
		COORDENADOR_COMPLETO
	);

	verificaCampoObrigatorio(
		MENSAGEM_NOME_DEPARTAMENTO_OBRIGATORIO,
		deptSemNome
	);
});

test("Validar Localização Departamento", () => {
	let deptLocalVazio = new Departamento(
		NOME_DEPARTAMENTO,
		SIGLA,
		"",
		COORDENADOR_COMPLETO
	);

	verificaCampoObrigatorio(MENSAGEM_LOCALIZACAO_OBRIGATORIA, deptLocalVazio);
});

test("Validar Nome Coordenador", () => {
	let coordNomeVazio = new Coordenador("", IDADE, CPF);
	let deptCoordNomeVazio = new Departamento(
		NOME_DEPARTAMENTO,
		SIGLA,
		LOCALIZACAO,
		coordNomeVazio
	);

	verificaCampoObrigatorio(
		MENSAGEM_NOME_COORDENADOR_OBRIGATORIO,
		deptCoordNomeVazio
	);
});

test("Validar CPF", () => {
	let coordCpfVazio = new Coordenador(NOME_COORDENADOR, IDADE, "");
	let deptCpfVazio = new Departamento(
		NOME_DEPARTAMENTO,
		SIGLA,
		LOCALIZACAO,
		coordCpfVazio
	);

	verificaCampoObrigatorio(MENSAGEM_CPF_OBRIGATORIO, deptCpfVazio);
});
