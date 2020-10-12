import { isEmpty } from "./loja";

export class Coordenador {
	constructor(
		public nome: string,
		public idade: number,
		public cpf: string
	) {}

	public dadosCoordenador(): string {
		this.validarCamposObrigatorios();

		let coordenador = `Coordenação:\n${this.nome}\n`;

		const temIdade = Boolean(this.idade) && this.idade > 0;

		const idade = temIdade ? `Idade: ${this.idade}\n` : "";
		coordenador += idade;

		coordenador += `CPF: ${this.cpf}`;

		return coordenador;
	}

	private validarCamposObrigatorios() {
		if (isEmpty(this.nome)) {
			throw new Error("O nome do coordenador é obrigatório.");
		}

		if (isEmpty(this.cpf)) {
			throw new Error("O CPF do coordenador é obrigatório.");
		}
	}
}
