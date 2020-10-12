import { Loja } from "./loja";

export class Venda {
	constructor(
		public loja: Loja,
		public readonly dataHora: Date,
		public readonly ccf: number,
		public readonly coo: number
	) {
		this.ccf = Math.floor(ccf);
		this.coo = Math.floor(coo);
	}

	public dadosVendas(): string {
		this.validarCamposObrigatorios();

		let textoData = `${this.dataHora.getDay()}/${this.dataHora.getMonth()}/${this.dataHora.getFullYear()}`;
		let textoHora = `${this.dataHora.getHours()}:${this.dataHora.getMinutes()}:${this.dataHora.getSeconds()}`;

		return `${textoData} ${textoHora}V CCF:${this.ccf} COO:${this.coo}`;
	}

	public imprimeCupom(): string {
		let textoLoja = this.loja.dadosLoja();
		let textoVenda = this.dadosVendas();

		return `${textoLoja}------------------------------\n${textoVenda}\n`;
	}

	private validarCamposObrigatorios() {
		// loja, data_hora, CCF e COO
		this.loja.dadosLoja();

		if (this.ccf <= 0) {
			throw new Error("O Contador de Cupom Fiscal (CCF) é obrigatório.");
		}

		if (this.coo <= 0) {
			throw new Error("O Contador de Cupom Fiscal (COO) é obrigatório.");
		}
	}
}
