import React from "react";
import { StyleProp, TextStyle, StyleSheet } from "react-native";
import { Menu, Divider } from "react-native-paper";

export interface MenuOption {
  label: string;
  onPress: () => void;
  labelStyle?: StyleProp<TextStyle>;
  icon?: string;
  isDivider?: boolean;
}

interface Props {
  visible: boolean;
  onDismiss: () => void;
  anchor: { x: number; y: number };
  options: MenuOption[];
}

export function AnchorMenu({ visible, onDismiss, anchor, options }: Props) {
  return (
    <Menu
      visible={visible}
      onDismiss={onDismiss}
      anchorPosition="bottom"
      anchor={anchor}
      contentStyle={styles.content}
    >
      {options.map((opt, i) =>
        opt.isDivider ? (
          <Divider key={i} style={styles.divider} />
        ) : (
          <Menu.Item
            key={i}
            onPress={() => {
              opt.onPress();
              onDismiss();
            }}
            title={opt.label}
            titleStyle={[styles.label, opt.labelStyle]}
            leadingIcon={opt.icon}
            style={styles.item}
          />
        ),
      )}
    </Menu>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    paddingVertical: 4,
    minWidth: 180,
  },
  item: {
    height: 42,
    justifyContent: "center",
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    color: "#333333",
  },
  divider: {
    backgroundColor: "#EEEEEE",
    marginVertical: 4,
  },
});
