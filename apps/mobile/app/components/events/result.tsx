import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { BLACK, ORANGE, ORANGE_LIGHT, WHITE } from "../../../constants/colors";
import { CalendarCheck, Captions, FileText, Trophy } from "lucide-react-native";
type Props = {
  form: {
    nome: string;
    descricao: string;
    modalidade: string;
    data: string;
    hora: string;
    categorias: string[];
  };
};

const FormResult = ({ form }: Props) => {
  return (
    <>
      <View style={styles.reviewBox}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            justifyContent: "flex-start",
          }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              backgroundColor: WHITE,
              justifyContent: "center",
              borderColor: ORANGE_LIGHT,
              borderWidth: 1,
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <Captions size={26} color={ORANGE} />
          </View>
          <View
            style={{
              flexDirection: "column",
              gap: 4,
              justifyContent: "center",
              alignItems: "flex-start",
              paddingBottom: 8,
            }}
          >
            <Text style={[styles.reviewItem, { fontWeight: "700" }]}>
              Nome{" "}
            </Text>
            <Text style={[styles.reviewItem, { fontWeight: "400" }]}>
              {form.nome}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            justifyContent: "flex-start",
          }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              backgroundColor: WHITE,
              justifyContent: "center",
              borderColor: ORANGE_LIGHT,
              borderWidth: 1,
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <FileText size={26} color={ORANGE} />
          </View>
          <View
            style={{
              flexDirection: "column",
              gap: 4,
              justifyContent: "center",
              alignItems: "flex-start",
              paddingBottom: 8,
              flex: 1,
            }}
          >
            <Text style={[styles.reviewItem, { fontWeight: "700" }]}>
              Descrição{" "}
            </Text>
            <Text
              style={[styles.reviewItem, { fontWeight: "400" }]}
              numberOfLines={0}
            >
              {form.descricao}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            justifyContent: "flex-start",
          }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              backgroundColor: WHITE,
              justifyContent: "center",
              borderColor: ORANGE_LIGHT,
              borderWidth: 1,
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <Trophy size={26} color={ORANGE} />
          </View>
          <View
            style={{
              flexDirection: "column",
              gap: 4,
              justifyContent: "center",
              alignItems: "flex-start",
              paddingBottom: 8,
            }}
          >
            <Text style={[styles.reviewItem, { fontWeight: "700" }]}>
              Modalidade{" "}
            </Text>
            <Text style={[styles.reviewItem, { fontWeight: "400" }]}>
              {form.modalidade}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            justifyContent: "flex-start",
          }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              backgroundColor: WHITE,
              justifyContent: "center",
              borderColor: ORANGE_LIGHT,
              borderWidth: 1,
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <CalendarCheck size={26} color={ORANGE} />
          </View>
          <View
            style={{
              flexDirection: "column",
              gap: 4,
              justifyContent: "center",
              alignItems: "flex-start",
              paddingBottom: 8,
            }}
          >
            <Text style={[styles.reviewItem, { fontWeight: "700" }]}>
              Data de início{" "}
            </Text>
            <Text style={[styles.reviewItem, { fontWeight: "400" }]}>
              {form.data} - {form.hora}
            </Text>
          </View>
        </View>
        <Text style={styles.reviewItem}>
          Categorias: {form.categorias.map((c) => c.nome).join(", ")}
        </Text>
      </View>

      <View
        style={{
          marginTop: "auto",
          gap: 10,
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      ></View>
    </>
  );
};

const styles = StyleSheet.create({
  reviewBox: {
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    padding: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },

  reviewItem: {
    fontSize: 14,
    color: BLACK,
  },
});

export default FormResult;
