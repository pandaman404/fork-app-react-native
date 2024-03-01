import React from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AuthTabs from "../../navigators/AuthTabs";
import { globalStyles } from "../../styles/global";
import { theme } from "../../styles/theme";

const AuthScreen = () => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.foreground}
      />
      <SafeAreaView
        style={{ flex: 0, backgroundColor: theme.colors.foreground }}
      />
      <SafeAreaView
        style={{ flex: 1, backgroundColor: theme.colors.background }}
      >
        <View
          style={[
            globalStyles.flex1,
            globalStyles.background,
            styles.container,
          ]}
        >
          <Text style={[theme.textVariants.title, styles.title]}>
            Comida rica para delivery o retiro de tienda
          </Text>
          <AuthTabs />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    top: Platform.OS === "ios" ? 20 : 0,
  },
  title: {
    color: theme.colors.secondaryVariant,
    textAlign: "center",
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.l,
    paddingHorizontal: "5%",
  },
});

export default AuthScreen;
