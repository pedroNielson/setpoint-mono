import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react-native";
import {
  BLACK,
  GRAY_100,
  GRAY_200,
  GRAY_400,
  GRAY_500,
  ORANGE,
  WHITE,
} from "../../../constants/colors";

type Option = {
  label: string;
  value: string;
};

type Props = {
  title?: string;
  placeholder?: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  flex?: number;
};

function HoverOption({
  option,
  isSelected,
  isLast,
  onSelect,
}: {
  option: Option;
  isSelected: boolean;
  isLast: boolean;
  onSelect: (val: string) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <TouchableOpacity
      style={[
        styles.option,
        isSelected && styles.optionSelected,
        hovered && !isSelected && styles.optionHovered,
        isLast && styles.optionLast,
      ]}
      onPress={() => onSelect(option.value)}
      activeOpacity={0.7}
      {...(Platform.OS === "web"
        ? {
            onMouseEnter: () => setHovered(true),
            onMouseLeave: () => setHovered(false),
          }
        : {})}
    >
      <Text
        style={[
          styles.optionText,
          isSelected && styles.optionTextSelected,
          hovered && !isSelected && styles.optionTextHovered,
        ]}
      >
        {option.label}
      </Text>
      {isSelected && <Text style={styles.checkmark}>✓</Text>}
    </TouchableOpacity>
  );
}

const BasicSelect = ({
  title,
  placeholder,
  value,
  options,
  onChange,
  flex,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<View>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (Platform.OS !== "web" || !isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      const node = (wrapperRef.current as any)?._nativeTag
        ? document.querySelector(
            `[data-id="${(wrapperRef.current as any)._nativeTag}"]`,
          )
        : null;
      if (node && !node.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    const timeout = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 50);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  function handleSelect(val: string) {
    onChange(val);
    setIsOpen(false);
  }

  return (
    <View
      ref={wrapperRef}
      style={[styles.wrapper, flex !== undefined && { flex }]}
    >
      {title && <Text style={styles.title}>{title}</Text>}

      <TouchableOpacity
        style={[styles.trigger, isOpen && styles.triggerOpen]}
        onPress={() => setIsOpen((p) => !p)}
        activeOpacity={0.8}
      >
        <Text style={[styles.triggerText, !selected && styles.placeholder]}>
          {selected?.label ?? placeholder ?? "Selecione uma opção"}
        </Text>
        <ChevronDown
          size={16}
          color={isOpen ? ORANGE : GRAY_500}
          style={{ transform: [{ rotate: isOpen ? "180deg" : "0deg" }] }}
        />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdown}>
          <ScrollView
            style={styles.scroll}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {options.map((option, index) => (
              <HoverOption
                key={option.value}
                option={option}
                isSelected={option.value === value}
                isLast={index === options.length - 1}
                onSelect={handleSelect}
              />
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 99,
  },
  title: {
    fontSize: 12,
    fontWeight: "700",
    color: BLACK,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: GRAY_400,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: WHITE,
    height: 42,
  },
  triggerOpen: {
    borderColor: ORANGE,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  triggerText: {
    fontSize: 15,
    color: BLACK,
    flex: 1,
  },
  placeholder: {
    color: GRAY_500,
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    left: 10,
    right: 10,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: ORANGE,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: WHITE,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 999,
  },
  scroll: {
    maxHeight: 220,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: GRAY_100,
  },
  optionSelected: {
    backgroundColor: ORANGE,
  },
  optionHovered: {
    backgroundColor: GRAY_100,
  },
  optionLast: {
    borderBottomWidth: 0,
  },
  optionText: {
    fontSize: 14,
    color: BLACK,
    flex: 1,
  },
  optionTextSelected: {
    color: ORANGE,
    fontWeight: "700",
  },
  optionTextHovered: {
    color: BLACK,
  },
  checkmark: {
    fontSize: 13,
    color: ORANGE,
    fontWeight: "700",
  },
});

export default BasicSelect;
