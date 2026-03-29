import { Armchair, Receipt } from "lucide-react-native";
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import { Categoria, TipoCategoria } from "../../../constants/types";

type Props = {
  value: Categoria[];
  onChange: (categorias: Categoria[]) => void;
};

const TIPOS: TipoCategoria[] = ["masculino", "feminino", "mista"];

const CATEGORIAS_PADRAO = ["A", "B", "C", "D"];

function gerarCategorias(): Categoria[] {
  return TIPOS.flatMap((type) =>
    CATEGORIAS_PADRAO.map((category) => ({
      id: `${type}-${category}`,
      type,
      category,
      slots: 0,
      price: 0,
      selected: false,
    })),
  );
}

export function toApiFormat(categorias: Categoria[]) {
  const selecionadas = categorias.filter((c) => c.selected);
  const porTipo = TIPOS.reduce((acc, tipo) => {
    const desse = selecionadas.filter((c) => c.type === tipo);
    if (desse.length === 0) return acc;
    acc.push({
      type: tipo,
      category: desse.map((c) => c.category),
      slots: desse.map((c) => c.slots),
      price: desse.map((c) => c.price),
    });
    return acc;
  }, [] as any[]);
  return porTipo;
}

const ORANGE = "#FF5C00";
const BLACK = "#111111";
const GRAY_100 = "#F5F5F5";
const GRAY_200 = "#E5E5E5";
const GRAY_500 = "#888888";
const WHITE = "#FFFFFF";

export function CategoriasSelector({ value, onChange }: Props) {
  const [tabAtiva, setTabAtiva] = useState<TipoCategoria>("masculino");

  const categorias = value.length > 0 ? value : gerarCategorias();

  const categoriasDaTab = categorias.filter((c) => c.type === tabAtiva);

  function update(id: string, changes: Partial<Categoria>) {
    onChange(categorias.map((c) => (c.id === id ? { ...c, ...changes } : c)));
  }

  function toggleSelected(id: string) {
    const cat = categorias.find((c) => c.id === id)!;
    update(id, { selected: !cat.selected });
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>Categorias</Text>

      <View style={styles.tabs}>
        {TIPOS.map((tipo) => {
          const ativo = tabAtiva === tipo;
          const count = categorias.filter(
            (c) => c.type === tipo && c.selected,
          ).length;

          return (
            <TouchableOpacity
              key={tipo}
              style={[styles.tab, ativo && styles.tabAtivo]}
              onPress={() => setTabAtiva(tipo)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabLabel, ativo && styles.tabLabelAtivo]}>
                {tipo.toUpperCase()}
              </Text>
              {count > 0 && (
                <View style={styles.tabBadge}>
                  <Text style={styles.tabBadgeText}>{count}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.tableHeader}>
        <View style={styles.colCheck} />
        <View style={styles.colLabel} />
        <View style={styles.colInput}>
          <Armchair size={14} color={GRAY_500} />
          <Text style={styles.tableHeaderText}>VAGAS</Text>
        </View>
        <View style={styles.colInput}>
          <Receipt size={14} color={GRAY_500} />
          <Text style={styles.tableHeaderText}>VALOR</Text>
        </View>
      </View>

      {categoriasDaTab.map((cat) => (
        <CategoriaRow
          key={cat.id}
          categoria={cat}
          onToggle={() => toggleSelected(cat.id)}
          onSlotsChange={(v) => update(cat.id, { slots: v })}
          onPriceChange={(v) => update(cat.id, { price: v })}
        />
      ))}
    </View>
  );
}

function CategoriaRow({
  categoria,
  onToggle,
  onSlotsChange,
  onPriceChange,
}: {
  categoria: Categoria;
  onToggle: () => void;
  onSlotsChange: (v: number) => void;
  onPriceChange: (v: number) => void;
}) {
  const { selected, category, slots, price } = categoria;

  return (
    <View style={[styles.row, selected && styles.rowSelected]}>
      <TouchableOpacity
        style={styles.colCheck}
        onPress={onToggle}
        activeOpacity={0.7}
      >
        <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
          {selected && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>

      <View style={styles.colLabel}>
        <Text style={[styles.rowLabel, selected && styles.rowLabelSelected]}>
          Duplas{" "}
          {categoria.type.charAt(0).toUpperCase() + categoria.type.slice(1)} -{" "}
          {category}
        </Text>
      </View>

      <View style={styles.colInput}>
        <NumericInput
          value={slots}
          onChange={onSlotsChange}
          enabled={selected}
          placeholder="0"
        />
      </View>

      <View style={styles.colInput}>
        <NumericInput
          value={price}
          onChange={onPriceChange}
          enabled={selected}
          placeholder="R$ 0"
          prefix="R$ "
        />
      </View>
    </View>
  );
}

function NumericInput({
  value,
  onChange,
  enabled,
  placeholder,
  prefix,
}: {
  value: number;
  onChange: (v: number) => void;
  enabled: boolean;
  placeholder: string;
  prefix?: string;
}) {
  const displayValue = value === 0 ? "" : String(value);

  if (Platform.OS === "web") {
    return (
      <View style={[styles.numInput, !enabled && styles.numInputDisabled]}>
        {prefix && enabled && value > 0 && (
          <Text style={styles.prefix}>{prefix}</Text>
        )}
        <input
          type="number"
          value={displayValue}
          placeholder={placeholder}
          disabled={!enabled}
          min={0}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          style={{
            border: "none",
            outline: "none",
            background: "transparent",
            fontSize: 14,
            color: enabled ? BLACK : GRAY_500,
            fontFamily: "inherit",
            width: "100%",
            padding: 0,
            textAlign: "center",
          }}
        />
      </View>
    );
  }

  return (
    <View style={[styles.numInput, !enabled && styles.numInputDisabled]}>
      <TextInput
        value={displayValue}
        placeholder={placeholder}
        editable={enabled}
        keyboardType="numeric"
        onChangeText={(t) => onChange(Number(t) || 0)}
        style={[styles.numInputText, !enabled && { color: GRAY_500 }]}
        textAlign="center"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
  },
  sectionTitle: {
    color: BLACK,
    fontWeight: "bold",
    marginBottom: 8,
  },
  tabs: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: GRAY_200,
    marginBottom: 0,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 4,
    marginRight: 24,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabAtivo: {
    borderBottomColor: ORANGE,
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: GRAY_500,
    letterSpacing: 0.5,
  },
  tabLabelAtivo: {
    color: BLACK,
  },
  tabBadge: {
    backgroundColor: ORANGE,
    borderRadius: 30,
    paddingHorizontal: 6,
    paddingVertical: 1,
    minWidth: 18,
    alignItems: "center",
  },
  tabBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: WHITE,
  },

  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: GRAY_100,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    marginTop: 12,
  },
  tableHeaderText: {
    fontSize: 11,
    fontWeight: "700",
    color: GRAY_500,
    letterSpacing: 0.5,
    textAlign: "center",
  },

  // Row
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: GRAY_200,
  },
  rowSelected: {
    backgroundColor: "#FFFAF8",
  },
  rowLabel: {
    fontSize: 14,
    color: GRAY_500,
  },
  rowLabelSelected: {
    color: BLACK,
    fontWeight: "500",
  },

  colCheck: {
    width: 32,
    alignItems: "center",
  },
  colLabel: {
    flex: 1,
  },
  colInput: {
    width: 90,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 4,
  },

  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: GRAY_200,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: WHITE,
  },
  checkboxSelected: {
    backgroundColor: ORANGE,
    borderColor: ORANGE,
  },
  checkmark: {
    fontSize: 11,
    color: WHITE,
    fontWeight: "700",
  },

  // Numeric input
  numInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: GRAY_200,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: WHITE,
    width: 76,
  },
  numInputDisabled: {
    backgroundColor: GRAY_100,
    borderColor: "transparent",
  },
  numInputText: {
    fontSize: 14,
    color: BLACK,
    flex: 1,
  },
  prefix: {
    fontSize: 13,
    color: GRAY_500,
    marginRight: 2,
  },
});
