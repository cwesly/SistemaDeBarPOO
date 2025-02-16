type CategoriaProp = "Alcoolica" | "Não Alcoolica" | "Outros";

type DescricaoProp =
  | "Vodka"
  | "Whisky"
  | "Cerveja"
  | "Refrigerante"
  | "Suco"
  | "Agua"
  | "Outros";

abstract class Produto {
  protected _nome: string;
  protected _preco: number;

  constructor(nome: string, preco: number) {
    this._nome = nome;
    this._preco = preco;
  }

  abstract descricao(): string;
}

interface ICadastro {
  adicionar(bebida: Produto): void;
  listar(): void;
  atualizar(nome: string, bebida: Produto): void;
  remover(nome: string): void;
}

class Bebiba extends Produto {
  private _categoria: CategoriaProp;
  private _descricao: DescricaoProp;

  constructor(
    nome: string,
    preco: number,
    categoria: CategoriaProp,
    descricao: DescricaoProp
  ) {
    super(nome, preco);
    this._categoria = categoria;
    this._descricao = descricao;
  }

  get nomeBebida(): string {
    return this._nome;
  }

  set nomeBebida(nomeAdicionado: string) {
    if (nomeAdicionado.length <= 0) {
      console.error(
        `Eita preá! Num dá pra botar "${nomeAdicionado}" como nome duma dose não.\nDigite um nome da gota, meu rei!`
      );
      return;
    }
    this._nome = nomeAdicionado;
    console.log(`Ô nome bom da gota! Adicionado com sucesso, visse?`);
  }

  get precoBebida(): number {
    return this._preco;
  }

  set precoBebida(precoNovo: number) {
    if (precoNovo <= 0) {
      console.error(
        `Oxente! Por esse preço nem água de poço eu vendo.\nDigite o preço certo, macho!`
      );
      return;
    }
    this._preco = precoNovo;
  }

  get categoriaBebida(): CategoriaProp {
    return this._categoria;
  }

  set categoriaBebida(categoriaNova: CategoriaProp) {
    if (categoriaNova.length <= 0) {
      console.error(
        `Que diaxo de categoria é essa, meu filho?\nDigite uma categoria que preste!`
      );
      return;
    }
    this._categoria = categoriaNova;
  }

  get descricaoBebida(): DescricaoProp {
    return this._descricao;
  }

  set descricaoBebida(descricaoNova: DescricaoProp) {
    if (descricaoNova.length <= 0) {
      console.error(
        `Arre égua! Essa descrição não dá não!\nDigite uma coisa que se aproveite.`
      );
      return;
    }
    this._descricao = descricaoNova;
  }

  descricao(): string {
    return `${this._nome} - ${this._descricao} (${this._categoria})`;
  }
}

class BarCactus implements ICadastro {
  private _bebidas: Bebiba[] = [];
  private _nomeBar: string = "";
  private _enderecoBar: string = "";
  private _telefoneBar: string = "";

  get nomeBar(): string {
    return this._nomeBar;
  }

  set nomeBar(nomeBarNovo: string) {
    if (nomeBarNovo.length <= 0) {
      console.error(
        `Oxente! O nome do bar num pode ser vazio não.\nDigite um nome, cabra!`
      );
      return;
    }
    this._nomeBar = nomeBarNovo;
  }

  get enderecoBar(): string {
    return this._enderecoBar;
  }

  set enderecoBar(enderecoBarNovo: string) {
    if (enderecoBarNovo.length <= 0) {
      console.error(
        `O endereço do bar num pode ser vazio, oxe.\nDigite um endereço arretado, por favor!`
      );
      return;
    }
    this._enderecoBar = enderecoBarNovo;
  }

  get telefoneBar(): string {
    return this._telefoneBar;
  }

  set telefoneBar(telefoneBarNovo: string) {
    if (telefoneBarNovo.length <= 0) {
      console.error(
        `Abestado! O telefone do bar tem que ter alguma coisa.\nDigite um número de telefone que preste.`
      );
      return;
    }
    this._telefoneBar = telefoneBarNovo;
  }

  adicionar(bebida: Bebiba): void {
    try {
      this._bebidas.push(bebida);
    } catch (error) {
      console.error(`Deu no couro! Erro ao adicionar bebida: ${error}`);
    }
  }

  listar(): void {
    try {
      console.log("Olha aqui as bebida que tem no bar, ó:");
      for (const bebida of this._bebidas) {
        console.log(bebida.descricao());
      }
    } catch (error) {
      console.error(`Vixe Maria! Erro ao listar bebidas: ${error}`);
    }
  }

  atualizar(nome: string, bebidaAtualizada: Bebiba): void {
    try {
      for (let i = 0; i < this._bebidas.length; i++) {
        if (this._bebidas[i].nomeBebida === nome) {
          this._bebidas[i] = bebidaAtualizada;
          console.log("Bebida atualizada numa lapada só!");
          return;
        }
      }
      console.error("Ô xente! Bebida não encontrada.");
    } catch (error) {
      console.error(`Deu ruim, meu fí! Erro ao atualizar bebida: ${error}`);
    }
  }

  remover(nome: string): void {
    try {
      for (let i = 0; i < this._bebidas.length; i++) {
        if (this._bebidas[i].nomeBebida === nome) {
          this._bebidas.splice(i, 1);
          console.log(
            "Pronto! Bebida removida mais ligeiro que um pé de vento!"
          );
          return;
        }
      }
      console.error("Eita preá! Bebida não encontrada.");
    } catch (error) {
      console.error(`Vixi! Erro ao remover bebida: ${error}`);
    }
  }

  buscarPorNome(nome: string): Bebiba | undefined {
    return this._bebidas.find((bebida) => bebida.nomeBebida === nome);
  }
}

const barCactus = new BarCactus();

const adicionar = () => {
  try {
    const nome = prompt("Digite o nome da bebida: ");
    if (!nome) {
      console.error("Oxente! Nome inválido!");
      return;
    }

    const preco = Number(prompt("Diga o preço da bebida, cabra: R$"));

    if (preco <= 0) {
      console.error("Esse preço num presta não, viu?");
      return;
    }

    const categoria = prompt(
      "Diga a categoria da bebida (Alcoolica/Não Alcoolica/Outros), meu fí: "
    ) as CategoriaProp;
    if (!categoria || categoria.length <= 0) {
      console.error(
        "Essa categoria num existe não, cabra! Digite uma categoria válida."
      );
      return;
    }

    const descricao = prompt(
      "Diga a descrição da bebida (Vodka/Whisky/Cerveja/Refrigerante/Suco/Agua/Outros), meu véi: "
    ) as DescricaoProp;
    if (!descricao || descricao.length <= 0) {
      console.error(
        "Essa descrição tá mais errada que o cão! Digite uma descrição válida."
      );
      return;
    }

    const bebida = new Bebiba(nome, preco, categoria, descricao);

    barCactus.adicionar(bebida);
    console.log(
      "Pronto, tá aí! Bebida adicionada mais rápido que um calango no sol quente!"
    );
  } catch (error) {
    console.error(`Eita, fogo! Erro ao adicionar bebida: ${error}`);
  }
};

const listarTodos = () => {
  barCactus.listar();
};

const pesquisar = () => {
  try {
    const nome = prompt("Diga o nome da bebida que tu quer, cabra: ");
    if (!nome) {
      console.error("Oxe, nome inválido!");
      return;
    }

    const bebida = barCactus.buscarPorNome(nome);
    if (bebida) {
      console.log("Achei a bicha:");
      console.log(bebida.descricao());
    } else {
      console.error(
        "Essa bebida tá mais perdida que cego em tiroteio! Não achei não."
      );
    }
  } catch (error) {
    console.error(`Vixe, Maria! Erro ao pesquisar bebida: ${error}`);
  }
};

const remover = () => {
  try {
    listarTodos();
    const nome = prompt(
      "Qual o nome da bebida que tu quer passar o rodo, meu fí? "
    );
    if (!nome) {
      console.error("Oxente! Nome inválido!");
      return;
    }

    const bebida = barCactus.buscarPorNome(nome);
    if (bebida) {
      const confirmacao = prompt(
        `Tu quer mesmo tirar a bebida ${bebida.nomeBebida}? (s/n): `
      );
      if (confirmacao?.toLowerCase() === "s") {
        barCactus.remover(nome);
      } else {
        console.log("Não quis mais foi? Tá certo! Nada mudou.1");
      }
    } else {
      console.error("Essa bebida tá mais sumida que agulha no palheiro!");
    }
  } catch (error) {
    console.error(`Deu no couro! Erro ao remover bebida: ${error}`);
  }
};

const atualizar = () => {
  try {
    const nomeAtual = prompt(
      "Qual o nome da bebida que tu quer mudar, cabra? "
    ) as string;
    if (!nomeAtual) {
      console.error("Oxe! Nome inválido!");
      return;
    }

    const bebidaAtual = barCactus.buscarPorNome(nomeAtual);
    if (!bebidaAtual) {
      console.error(
        "Essa bebida tá mais perdida que cebola em feira, meu querido! Não achei não."
      );
      return;
    }

    const novoNome = prompt(`Qual o novo nome da bebida? `);
    if (!novoNome) {
      console.error("Oxente! Nome inválido!");
      return;
    }

    const preco = prompt(`Qual o novo preço, homi? `);
    const novoPreco = preco ? Number(preco) : bebidaAtual.precoBebida;
    if (!novoPreco || novoPreco <= 0) {
      console.error("Esse preço num vale nem uma gota d'água!");
      return;
    }

    const novaCategoria =
      (prompt(`Qual a nova categoria, meu fí? `) as CategoriaProp) ||
      bebidaAtual.categoriaBebida;

    const novaDescricao =
      (prompt(`Qual a nova descrição, cabra? `) as DescricaoProp) ||
      bebidaAtual.descricaoBebida;

    const bebidaAtualizada = new Bebiba(
      novoNome,
      novoPreco,
      novaCategoria,
      novaDescricao
    );
    barCactus.atualizar(nomeAtual, bebidaAtualizada);
  } catch (error) {
    console.error(`Deu no couro! Erro ao atualizar bebida: ${error}`);
  }
};

const main = () => {
  let opcao: number;
  do {
    console.log("\nMenu de opções, cabra:");
    console.log("1 - Botar mais bebida");
    console.log("2 - Caçar bebida pelo nome");
    console.log("3 - Mostrar tudo que tem no bar");
    console.log("4 - Tirar uma bebida");
    console.log("5 - Arrumar as coisas de uma bebida");
    console.log("0 - Simbora");

    opcao = Number(prompt("Diga o que tu quer fazer, cabra: "));

    switch (opcao) {
      case 0:
        console.log("Valeu, cabra. Tô indo nessa!");
        break;
      case 1:
        adicionar();
        break;
      case 2:
        pesquisar();
        break;
      case 3:
        listarTodos();
        break;
      case 4:
        remover();
        break;
      case 5:
        atualizar();
        break;
      default:
        console.log("Oxente! Essa opção não existe não, visse?");
        break;
    }
  } while (opcao !== 0);
};

main();
