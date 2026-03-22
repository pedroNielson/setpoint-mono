import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
  StatusBar,
  useWindowDimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withSpring,
  Easing,
} from "react-native-reanimated";
import { useAuthStore } from "../store/useAuthStore";

const ORANGE = "#FF5C00";
const ORANGE_LIGHT = "#FF7A2E";
const BLACK = "#0A0A0A";
const GRAY_900 = "#111111";
const GRAY_700 = "#2A2A2A";
const GRAY_500 = "#555555";
const WHITE = "#FFFFFF";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState<
    "username" | "password" | null
  >(null);
  const { login, isLoading } = useAuthStore();
  const { width } = useWindowDimensions();

  const isWeb = Platform.OS === "web";
  const isWideScreen = isWeb && width > 768;

  const logoScale = useSharedValue(0.8);
  const logoOpacity = useSharedValue(0);
  const cardOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(40);
  const shakeX = useSharedValue(0);
  const badgeOpacity = useSharedValue(0);

  useEffect(() => {
    logoScale.value = withSpring(1, { damping: 14, stiffness: 120 });
    logoOpacity.value = withTiming(1, { duration: 400 });
    cardOpacity.value = withTiming(1, {
      duration: 500,
      easing: Easing.out(Easing.cubic),
    });
    cardTranslateY.value = withTiming(0, {
      duration: 500,
      easing: Easing.out(Easing.cubic),
    });
    badgeOpacity.value = withTiming(1, { duration: 700 });
  }, []);

  function triggerShake() {
    shakeX.value = withSequence(
      withTiming(10, { duration: 55 }),
      withTiming(-10, { duration: 55 }),
      withTiming(8, { duration: 55 }),
      withTiming(-8, { duration: 55 }),
      withTiming(4, { duration: 55 }),
      withTiming(0, { duration: 55 }),
    );
  }

  async function handleLogin() {
    setError("");
    try {
      await login(username, password);
    } catch (err: any) {
      setError(err.message);
      triggerShake();
    }
  }

  const logoAnimStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const cardAnimStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [
      { translateY: cardTranslateY.value },
      { translateX: shakeX.value },
    ],
  }));

  const badgeAnimStyle = useAnimatedStyle(() => ({
    opacity: badgeOpacity.value,
  }));

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={BLACK} />

      <View style={styles.bgAccentTop} />
      <View style={styles.bgAccentDot1} />
      <View style={styles.bgAccentDot2} />
      <View style={styles.bgAccentDot3} />

      <KeyboardAvoidingView
        style={styles.kav}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Animated.View style={[styles.logoArea, logoAnimStyle]}>
          <View style={styles.logoMark}>
            <Text style={styles.logoMarkText}>S</Text>
          </View>
          <Text style={styles.logoText}>Setpoint</Text>
          <Text style={styles.logoTagline}>Sua plataforma esportiva</Text>
        </Animated.View>

        <View style={styles.cardContainer}>
          <Animated.View
            style={[
              styles.card,
              isWideScreen && styles.cardWide,
              cardAnimStyle,
            ]}
          >
            <Text style={styles.cardTitle}>Entrar</Text>
            <Text style={styles.cardSubtitle}>Bem-vindo de volta</Text>

            <View style={styles.fieldWrapper}>
              <Text style={styles.fieldLabel}>Usuário</Text>
              <View
                style={[
                  styles.inputWrapper,
                  focusedField === "username" && styles.inputWrapperFocused,
                ]}
              >
                <TextInput
                  style={styles.input}
                  placeholder="seu.usuario"
                  placeholderTextColor={GRAY_500}
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onFocus={() => setFocusedField("username")}
                  onBlur={() => setFocusedField(null)}
                />
                {focusedField === "username" && (
                  <View style={styles.inputAccentBar} />
                )}
              </View>
            </View>

            <View style={styles.fieldWrapper}>
              <Text style={styles.fieldLabel}>Senha</Text>
              <View
                style={[
                  styles.inputWrapper,
                  focusedField === "password" && styles.inputWrapperFocused,
                ]}
              >
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor={GRAY_500}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                />
                {focusedField === "password" && (
                  <View style={styles.inputAccentBar} />
                )}
              </View>
            </View>

            {error ? (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonLoading]}
              onPress={handleLogin}
              disabled={isLoading}
              activeOpacity={0.85}
            >
              {isLoading ? (
                <ActivityIndicator color={WHITE} />
              ) : (
                <>
                  <Text style={styles.buttonText}>Entrar</Text>
                  <Text style={styles.buttonArrow}>→</Text>
                </>
              )}
            </TouchableOpacity>

            <View style={styles.cardFooter}>
              <View style={styles.footerDivider} />
              <Text style={styles.footerText}>
                Esqueceu sua senha?{" "}
                <Text style={styles.footerLink}>Recuperar acesso</Text>
              </Text>
            </View>
          </Animated.View>
        </View>

        <Animated.View style={[styles.bottomBadge, badgeAnimStyle]}>
          <View style={styles.badgeDot} />
          <Text style={styles.badgeText}>
            Plataforma oficial · Temporada 2026
          </Text>
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: BLACK },

  bgAccentTop: {
    position: "absolute",
    top: -80,
    right: -80,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: ORANGE,
    opacity: 0.07,
  },
  bgAccentDot1: {
    position: "absolute",
    top: "18%",
    left: 28,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: ORANGE,
    opacity: 0.5,
  },
  bgAccentDot2: {
    position: "absolute",
    top: "22%",
    left: 48,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: ORANGE,
    opacity: 0.3,
  },
  bgAccentDot3: {
    position: "absolute",
    bottom: 120,
    right: 32,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: ORANGE,
    opacity: 0.4,
  },

  kav: { flex: 1, justifyContent: "center", paddingHorizontal: 24 },

  logoArea: { alignItems: "center", marginBottom: 40 },
  logoMark: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: ORANGE,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  logoMarkText: {
    fontSize: 28,
    fontWeight: "900",
    color: WHITE,
    letterSpacing: -1,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "800",
    color: WHITE,
    letterSpacing: -1.5,
  },
  logoTagline: {
    fontSize: 13,
    color: GRAY_500,
    marginTop: 4,
    letterSpacing: 0.5,
  },

  cardContainer: { alignItems: "center" },

  card: {
    width: "100%",
    backgroundColor: GRAY_900,
    borderRadius: 20,
    padding: 28,
    borderWidth: 1,
    borderColor: GRAY_700,
  },
  cardWide: { width: "40%" },

  cardTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: WHITE,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  cardSubtitle: { fontSize: 14, color: GRAY_500, marginBottom: 28 },

  fieldWrapper: { marginBottom: 18 },
  fieldLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: GRAY_500,
    marginBottom: 8,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  inputWrapper: {
    backgroundColor: GRAY_700,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "transparent",
    overflow: "hidden",
  },
  inputWrapperFocused: { borderColor: ORANGE },
  input: { padding: 14, fontSize: 15, color: WHITE },
  inputAccentBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: ORANGE,
  },

  errorBox: {
    backgroundColor: "#2A0A00",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  errorText: { color: ORANGE_LIGHT, fontSize: 13, fontWeight: "500" },

  button: {
    backgroundColor: ORANGE,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 4,
  },
  buttonLoading: { opacity: 0.8 },
  buttonText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  buttonArrow: { color: WHITE, fontSize: 18, fontWeight: "600" },

  cardFooter: { marginTop: 24, alignItems: "center", gap: 12 },
  footerDivider: { width: 40, height: 1, backgroundColor: GRAY_700 },
  footerText: { fontSize: 13, color: GRAY_500 },
  footerLink: { color: ORANGE, fontWeight: "600" },

  bottomBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 32,
  },
  badgeDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: ORANGE },
  badgeText: { fontSize: 12, color: GRAY_500, letterSpacing: 0.3 },
});
