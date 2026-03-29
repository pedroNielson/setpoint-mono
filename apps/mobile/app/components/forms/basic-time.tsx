import { View, Text, StyleSheet, Platform } from "react-native";
import React, { useRef } from "react";

type Props = {
  title?: string;
  placeholder?: string;
  value: string;
  onChange: (text: string) => void;
  minimumTime?: string;
  maximumTime?: string;
  step?: number;
  flex?: number;
};

const BasicTime = ({
  title,
  placeholder,
  value,
  onChange,
  minimumTime,
  maximumTime,
  step = 60,
  flex,
}: Props) => {
  if (Platform.OS !== "web") return null;

  const inputRef = useRef<HTMLInputElement>(null);

  function handleWrapperClick() {
    if (!inputRef.current) return;
    inputRef.current.focus();
    try {
      (inputRef.current as any).showPicker();
    } catch {}
  }

  return (
    <View style={[styles.wrapper, flex !== undefined && { flex }]}>
      {title && <Text style={styles.title}>{title}</Text>}

      <View style={styles.inputWrapper}>
        <div
          onClick={handleWrapperClick}
          style={{ width: "100%", height: "100%", cursor: "pointer" }}
        >
          <input
            ref={inputRef}
            type="time"
            value={value}
            placeholder={placeholder || "HH:MM"}
            min={minimumTime}
            max={maximumTime}
            step={step}
            onChange={(e) => onChange(e.target.value)}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: 15,
              color: value ? "#111111" : "#aaaaaa",
              fontFamily: "inherit",
              cursor: "pointer",
              padding: 0,
              boxSizing: "border-box",
            }}
          />
        </div>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: "700",
    fontSize: 12,
    color: "#555555",
    marginBottom: 8,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#ffffff",
    height: 42,
    justifyContent: "center",
  },
});

export default BasicTime;
