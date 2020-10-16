import { Coordenador } from "./coordenador";
import { isEmpty } from "./loja";

export class Departamento {
	constructor(
		public nome: string,
		public sigla: string,
		public localizacao: string,
		public coordenador: Coordenador
	) {}

	public dadosDepartamento(): string {
		this.validarCamposObrigatorios();

		const sigla = !isEmpty(this.sigla) ? `, ${this.sigla}` : "";
		let departamento = `${this.nome}${sigla}\nLocalização: ${
			this.localizacao
		}\n\n${this.coordenador.dadosCoordenador()}`;

		return departamento;
	}

	private validarCamposObrigatorios() {
		if (isEmpty(this.nome)) {
			throw new Error("O nome do departamento é obrigatório.");
		}
		if (isEmpty(this.localizacao)) {
			throw new Error("A localização do departamento é obrigatória.");
		}
	}
}
