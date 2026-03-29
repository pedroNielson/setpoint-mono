type Categoria = {
  id: string;
  type: TipoCategoria;
  category: string;
  slots: number;
  price: number;
  selected: boolean;
};

type TipoCategoria = "masculino" | "feminino" | "mista";

export type { Categoria, TipoCategoria };
