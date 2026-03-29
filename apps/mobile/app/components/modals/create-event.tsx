import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  Animated,
  Easing,
} from "react-native";
import { BLACK, GRAY_500, ORANGE } from "../../../constants/colors";
import { X } from "lucide-react-native";
import BasicInsert from "../forms/basic-insert";
import AreaInsert from "../forms/area-insert";
import BasicDate from "../forms/basic-date";
import BasicTime from "../forms/basic-time";
import { CategoriasSelector } from "../forms/category-insert";
import { Categoria } from "../../../constants/types";
import BasicButton from "../forms/button";

interface Props {
  visible: boolean;
  onClose: () => void;
}

const DRAWER_WIDTH = 480;
const DURATION_IN = 320;
const DURATION_OUT = 240;

export function CreateEventDrawer({ visible, onClose }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const translateX = useRef(new Animated.Value(DRAWER_WIDTH)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      translateX.setValue(DRAWER_WIDTH);
      backdropOpacity.setValue(0);

      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: DURATION_IN,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: DURATION_IN,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: DRAWER_WIDTH,
          duration: DURATION_OUT,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: DURATION_OUT,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        if (finished) setModalVisible(false);
      });
    }
  }, [visible]);

  return (
    <Modal
      transparent
      visible={modalVisible}
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>

      <Animated.View style={[styles.drawer, { transform: [{ translateX }] }]}>
        <View style={styles.header}>
          <Text style={styles.titulo}>Criar evento</Text>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <X size={14} color={GRAY_500} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <BasicInsert
            title="Nome"
            placeholder="Insira o nome do evento"
            value=""
            onChange={() => {}}
          />
          <AreaInsert
            title="Descrição"
            placeholder="Insira a descrição do evento"
            value=""
            onChange={() => {}}
          />
          <Text style={{ marginLeft: 10, fontWeight: "bold" }}>Data</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <BasicDate
              format="complete"
              value=""
              onChange={() => {}}
              flex={7}
            />
            <BasicTime value="" onChange={() => {}} flex={3} />
          </View>
          <CategoriasSelector value={categorias} onChange={setCategorias} />

          <View style={{ justifyContent: "flex-end", flex: 1 }}>
            <BasicButton
              title="Salvar"
              color={ORANGE}
              onPress={() => {}}
              style={styles.saveButton}
            />
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  saveButton: {
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: ORANGE,
    borderRadius: 8,
    alignItems: "center",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  drawer: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: -4, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  titulo: {
    fontSize: 18,
    fontWeight: "700",
    color: BLACK,
    letterSpacing: -0.3,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    alignItems: "center",
    justifyContent: "center",
  },
  closeX: {
    fontSize: 14,
    color: GRAY_500,
  },
  content: {
    flex: 1,
    padding: 10,
    gap: 20,
  },
});
