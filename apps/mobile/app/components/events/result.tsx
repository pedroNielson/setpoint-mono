import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import {
  BLACK,
  GRAY_100,
  GRAY_500,
  ORANGE,
  ORANGE_LIGHT,
  WHITE,
} from "../../../constants/colors";
import {
  Armchair,
  CalendarCheck,
  Captions,
  FileText,
  Receipt,
  Trophy,
} from "lucide-react-native";
import { Categoria, EventForm } from "../../../constants/types";

type Props = {
  form: EventForm;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatModalidade(value: string): string {
  const map: Record<string, string> = {
    "beach-tenis": "Beach Tênis",
    futevolei: "Futevolei",
    "volei-de-areia": "Vôlei de Areia",
  };
  return map[value] ?? value;
}

function groupByType(categories: Categoria[]) {
  const selecionadas = (categories ?? []).filter((c) => c.selected);
  const grupos = ["masculino", "feminino", "mista"] as const;
  return grupos
    .map((tipo) => ({
      tipo,
      items: selecionadas.filter((c) => c.type === tipo),
    }))
    .filter((g) => g.items.length > 0);
}

// ─── Sub-componentes ──────────────────────────────────────────────────────────

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIcon}>{icon}</View>
      <View style={styles.infoTexts}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

function CategoriasTable({ categories }: { categories: Categoria[] }) {
  const grupos = groupByType(categories);

  if (grupos.length === 0) {
    return (
      <View style={styles.emptyBox}>
        <Text style={styles.emptyText}>Nenhuma categoria selecionada</Text>
      </View>
    );
  }

  return (
    <View style={styles.tableWrapper}>
      {grupos.map(({ tipo, items }) => (
        <View key={tipo}>
          <View style={styles.tableGroupHeader}>
            <Text style={styles.tableGroupTitle}>
              {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
            </Text>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.colCategoria}>
              <Text style={styles.tableColHeader}>Categoria</Text>
            </View>
            <View style={styles.colVagas}>
              <Armchair size={14} color={GRAY_500} />
              <Text style={styles.tableColHeader}>VAGAS</Text>
            </View>
            <View style={styles.colValor}>
              <Receipt size={14} color={GRAY_500} />
              <Text style={styles.tableColHeader}>VALOR</Text>
            </View>
          </View>

          {items.map((cat, index) => (
            <View
              key={cat.id}
              style={[
                styles.tableRow,
                styles.tableDataRow,
                index % 2 === 0 && styles.tableRowEven,
                index === items.length - 1 && styles.tableRowLast,
              ]}
            >
              <View style={styles.colCategoria}>
                <Text style={styles.tableCell}>
                  Duplas {tipo.charAt(0).toUpperCase() + tipo.slice(1)} -{" "}
                  {cat.category}
                </Text>
              </View>
              <View style={styles.colVagas}>
                <View style={styles.tableBadge}>
                  <Text style={styles.tableBadgeText}>{cat.slots}</Text>
                </View>
              </View>
              <View style={styles.colValor}>
                {cat.price > 0 ? (
                  <View style={[styles.tableBadge, styles.tableBadgeOrange]}>
                    <Text
                      style={[
                        styles.tableBadgeText,
                        styles.tableBadgeTextOrange,
                      ]}
                    >
                      R$ {cat.price}
                    </Text>
                  </View>
                ) : (
                  <Text style={styles.tableCellMuted}>—</Text>
                )}
              </View>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

const FormResult = ({ form }: Props) => {
  const categoriasCount = (form.categories ?? []).filter(
    (c) => c.selected,
  ).length;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scroll}
    >
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações do evento</Text>
        <View style={styles.card}>
          <InfoRow
            icon={<Captions size={20} color={ORANGE} />}
            label="Nome"
            value={form.name || "—"}
          />
          <View style={styles.divider} />
          <InfoRow
            icon={<FileText size={20} color={ORANGE} />}
            label="Descrição"
            value={form.description || "—"}
          />
          <View style={styles.divider} />
          <InfoRow
            icon={<Trophy size={20} color={ORANGE} />}
            label="Modalidade"
            value={formatModalidade(form.type) || "—"}
          />
          <View style={styles.divider} />
          <InfoRow
            icon={<CalendarCheck size={20} color={ORANGE} />}
            label="Data e hora"
            value={
              form.date && form.hour
                ? `${form.date} às ${form.hour}`
                : form.date || "—"
            }
          />
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionTitleRow}>
          <Text style={styles.sectionTitle}>Categorias</Text>
          {categoriasCount > 0 && (
            <View style={styles.countBadge}>
              <Text style={styles.countBadgeText}>{categoriasCount}</Text>
            </View>
          )}
        </View>
        <CategoriasTable categories={form.categories ?? []} />
      </View>
    </ScrollView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  scroll: {
    gap: 24,
    paddingBottom: 16,
  },
  section: {
    gap: 10,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: GRAY_500,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  countBadge: {
    backgroundColor: ORANGE,
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 1,
    minWidth: 20,
    alignItems: "center",
  },
  countBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: WHITE,
  },
  card: {
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    overflow: "hidden",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    padding: 14,
  },
  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: ORANGE_LIGHT,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  infoTexts: {
    flex: 1,
    gap: 2,
  },
  infoLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: GRAY_500,
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  infoValue: {
    fontSize: 14,
    color: BLACK,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginHorizontal: 14,
  },
  tableWrapper: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    overflow: "hidden",
  },
  tableGroupHeader: {
    backgroundColor: ORANGE,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  tableGroupTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: WHITE,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  tableDataRow: {
    backgroundColor: WHITE,
  },
  tableRowEven: {
    backgroundColor: "#FAFAFA",
  },
  tableRowLast: {
    borderBottomWidth: 0,
  },
  tableColHeader: {
    fontSize: 11,
    fontWeight: "700",
    color: GRAY_500,
    letterSpacing: 0.3,
  },
  tableCell: {
    fontSize: 13,
    color: BLACK,
  },
  tableCellMuted: {
    fontSize: 13,
    color: GRAY_500,
    textAlign: "center",
  },
  colCategoria: { flex: 1 },
  colVagas: {
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 4,
  },
  colValor: {
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 4,
  },
  tableBadge: {
    backgroundColor: GRAY_100,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 3,
    minWidth: 40,
    alignItems: "center",
  },
  tableBadgeOrange: {
    backgroundColor: "#FFF2EC",
  },
  tableBadgeText: {
    fontSize: 13,
    fontWeight: "600",
    color: BLACK,
  },
  tableBadgeTextOrange: {
    color: ORANGE,
  },
  emptyBox: {
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 13,
    color: GRAY_500,
  },
});

export default FormResult;
