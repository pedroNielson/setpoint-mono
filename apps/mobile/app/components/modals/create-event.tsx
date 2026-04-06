import { use, useEffect, useRef, useState } from "react";
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
import { BLACK, GRAY_400, GRAY_500, ORANGE } from "../../../constants/colors";
import { X } from "lucide-react-native";
import BasicInsert from "../forms/basic-insert";
import AreaInsert from "../forms/area-insert";
import BasicDate from "../forms/basic-date";
import BasicTime from "../forms/basic-time";
import { CategoriasSelector } from "../forms/category-insert";
import { Categoria, EventForm } from "../../../constants/types";
import BasicButton from "../forms/button";
import BasicSelect from "../forms/basic-select";
import FormResult from "../events/result";
import { api } from "../../../services/api";
import { useAuthStore } from "../../../services/useAuthStore";

interface Props {
  visible: boolean;
  onClose: () => void;
}

const DRAWER_WIDTH = 480;
const DURATION_IN = 320;
const DURATION_OUT = 240;

export function CreateEventDrawer({ visible, onClose }: Props) {
  const { token } = useAuthStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [step, setStep] = useState<"form" | "review">("form");

  const [form, setForm] = useState<EventForm>({
    name: "",
    description: "",
    type: "",
    date: "",
    hour: "",
    categories: [],
  });

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

  function handleSave() {
    if (!form.name || !form.date || !form.hour) {
      alert("Preencha nome, data e hora");
      return;
    }

    setStep("review");
  }

  async function handleCreateEvent() {
    console.log("Evento criado:", form);

    const novo = await api.events.create(token, form);
    console.log("Resposta da API:", novo);
    // resetForm();
    onClose();
  }

  function resetForm() {
    setForm({
      name: "",
      description: "",
      type: "",
      date: "",
      hour: "",
      categories: [],
    });
    setStep("form");
  }

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
          <Text style={styles.titulo}>
            {step === "form" ? "Criar evento" : "Revisar evento"}
          </Text>

          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => {
              resetForm();
              onClose();
            }}
          >
            <X size={14} color={GRAY_500} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {step === "form" ? (
            <>
              <BasicInsert
                title="Nome"
                placeholder="Insira o nome do evento"
                value={form.name}
                onChange={(v) => setForm((prev) => ({ ...prev, name: v }))}
              />

              <AreaInsert
                title="Descrição"
                placeholder="Insira a descrição do evento"
                value={form.description}
                onChange={(v) =>
                  setForm((prev) => ({ ...prev, description: v }))
                }
              />

              <BasicSelect
                title="Modalidade"
                value={form.type}
                options={[
                  { label: "Beach Tenis", value: "beach-tenis" },
                  { label: "Futevolei", value: "futevolei" },
                  { label: "Volei de areia", value: "volei-de-areia" },
                ]}
                onChange={(v) => setForm((prev) => ({ ...prev, type: v }))}
              />

              <Text style={{ marginLeft: 10, fontWeight: "bold" }}>Data</Text>

              <View style={{ flexDirection: "row" }}>
                <BasicDate
                  format="complete"
                  value={form.date}
                  onChange={(v) => setForm((prev) => ({ ...prev, date: v }))}
                  flex={7}
                />

                <BasicTime
                  value={form.hour}
                  onChange={(v) => setForm((prev) => ({ ...prev, hour: v }))}
                  flex={3}
                />
              </View>

              <CategoriasSelector
                value={form.categories}
                onChange={(cats) =>
                  setForm((prev) => ({ ...prev, categories: cats }))
                }
              />

              <View style={{ marginTop: "auto" }}>
                <BasicButton
                  title="Salvar"
                  color={ORANGE}
                  onPress={handleSave}
                  style={styles.saveButton}
                />
              </View>
            </>
          ) : (
            <>
              <FormResult form={form} />

              <View
                style={{ marginTop: "auto", flexDirection: "row", gap: 10 }}
              >
                <BasicButton
                  title="Voltar"
                  color={GRAY_400}
                  onPress={() => setStep("form")}
                  style={[styles.cancelButton, { flex: 0.3 }]}
                />

                <BasicButton
                  title="Criar evento"
                  color={ORANGE}
                  onPress={handleCreateEvent}
                  style={[styles.saveButton, { flex: 0.7 }]}
                />
              </View>
            </>
          )}
        </View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
    paddingHorizontal: 16,
    paddingVertical: 18,
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

  content: {
    flex: 1,
    padding: 16,
    gap: 20,
  },

  saveButton: {
    marginTop: 5,
    backgroundColor: ORANGE,
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 5,
  },
  cancelButton: {
    marginTop: 5,
    backgroundColor: GRAY_400,
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 5,
  },

  // 🔥 REVIEW SCREEN

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
    lineHeight: 20,
  },
});
