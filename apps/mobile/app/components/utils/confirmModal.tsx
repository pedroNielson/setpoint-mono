import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { TriangleAlert } from "lucide-react-native";

interface Props {
  visible: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
}

export function ConfirmModal({
  visible,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel,
  danger = false,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
            {danger && (
              <View style={styles.iconWrapper}>
                <TriangleAlert size={22} color="#E53935" />
              </View>
            )}
            <Text style={styles.title}>{title}</Text>
          </View>

          {description && <Text style={styles.description}>{description}</Text>}

          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={onCancel}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelLabel}>{cancelLabel}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.confirmBtn, danger && styles.confirmBtnDanger]}
              onPress={onConfirm}
              activeOpacity={0.7}
            >
              <Text style={styles.confirmLabel}>{confirmLabel}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 360,
    gap: 8,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FEECEC",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111111",
    letterSpacing: -0.2,
  },
  description: {
    fontSize: 13,
    color: "#666666",
    lineHeight: 19,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  cancelBtn: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    alignItems: "center",
    justifyContent: "center",
  },
  cancelLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#444444",
  },
  confirmBtn: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#111111",
    alignItems: "center",
    justifyContent: "center",
  },
  confirmBtnDanger: {
    backgroundColor: "#E53935",
  },
  confirmLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
