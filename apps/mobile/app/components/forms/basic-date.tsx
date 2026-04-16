import { View, Text, StyleSheet, Platform } from "react-native";
import React, { useRef } from "react";

type Format = "day" | "month" | "year" | "complete";

type Props = {
  title?: string;
  placeholder?: string;
  value: string;
  onChange: (text: string) => void;
  format?: Format;
  minimumDate?: Date;
  maximumDate?: Date;
  flex?: number;
};

function getInputType(format: Format): string {
  switch (format) {
    case "day":
    case "month":
    case "year":
      return "number";
    case "complete":
      return "date";
  }
}

function getPlaceholder(format: Format, fallback?: string): string {
  switch (format) {
    case "day":
      return "DD";
    case "month":
      return "MM";
    case "year":
      return "YYYY";
    case "complete":
      return "DD/MM/YYYY";
    default:
      return fallback || "Insira a data";
  }
}

function getMinMax(format: Format, min?: Date, max?: Date) {
  if (format !== "complete") {
    return {
      min: format === "day" ? "1" : format === "month" ? "1" : "1900",
      max: format === "day" ? "31" : format === "month" ? "12" : "2100",
    };
  }
  return {
    min: min?.toISOString().split("T")[0],
    max: max?.toISOString().split("T")[0],
  };
}

function isoToBR(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

function brToISO(br: string): string {
  if (!br) return "";
  const [d, m, y] = br.split("/");
  return `${y}-${m}-${d}`;
}

const BasicDate = ({
  title,
  placeholder,
  value,
  onChange,
  format = "complete",
  minimumDate,
  maximumDate,
  flex,
}: Props) => {
  if (Platform.OS !== "web") return null;

  const inputRef = useRef<HTMLInputElement>(null);

  const inputType = getInputType(format);
  const { min, max } = getMinMax(format, minimumDate, maximumDate);
  const inputValue = format === "complete" ? brToISO(value) : value;

  function handleWrapperClick() {
    if (!inputRef.current) return;
    inputRef.current.focus();
    try {
      (inputRef.current as any).showPicker();
    } catch {}
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    if (format === "complete") {
      onChange(val ? isoToBR(val) : "");
    } else {
      onChange(val);
    }
  }

  return (
    <View style={[styles.wrapper, flex !== undefined && { flex }]}>
      {title && (
        <Text style={{ fontWeight: "bold", marginBottom: 8 }}>{title}</Text>
      )}
      <View style={styles.inputWrapper}>
        <div
          onClick={handleWrapperClick}
          style={{ width: "100%", height: "100%", cursor: "pointer" }}
        >
          <input
            ref={inputRef}
            type={inputType}
            value={inputValue}
            placeholder={getPlaceholder(format, placeholder)}
            min={min}
            max={max}
            onChange={handleChange}
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
    paddingHorizontal: 0,
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

export default BasicDate;
