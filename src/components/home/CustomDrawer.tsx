import React from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useConfigContext } from "../../contexts/ConfigContext";
import LogoutButton from "../auth/LogoutButton";
import { theme } from "../../styles/theme";
import { Icon } from "react-native-elements";
import { capitalizeText } from "../../utils/formatText";
import {
  privacyPolicyURL,
  termsAndConditionsURL,
  zendeskChatUrl,
} from "../../utils/env";
const CustomDrawer = ({ navigation }: any) => {
  const { user, onLogoutSubmit } = useConfigContext();
  const { navigate, closeDrawer } = navigation;

  const links = {
    termsAndConditions: termsAndConditionsURL,
    privacyPolicy: privacyPolicyURL,
    chat: zendeskChatUrl,
  };

  const openWebBrowser = async (link: string) => {
    if (link == "terminos") {
      try {
        await WebBrowser.openBrowserAsync(links.termsAndConditions);
      } catch (error) {
        console.log(error);
      }
    }
    if (link == "politicas") {
      try {
        await WebBrowser.openBrowserAsync(links.privacyPolicy);
      } catch (error) {
        console.log(error);
      }
    }
    if (link == "chat") {
      try {
        await WebBrowser.openBrowserAsync(links.chat);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <ScrollView>
      <DrawerContentScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/logo-512x512.png")}
            style={styles.imageTag}
          />
        </View>
        <View style={styles.usernameContainer}>
          <Icon
            type="evilicon"
            name="user"
            color={theme.colors.primary}
            size={40}
          />
          <View style={styles.fullnameContainer}>
            <Text style={theme.textVariants.body} numberOfLines={3}>
              {capitalizeText(user.fullName.substring(0, 60))}
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={styles.helpBtns}
            onPress={() =>
              navigate("ProfileStacks", {
                screen: "ProfileScreen",
                params: {
                  screen: "Mi perfil",
                },
              })
            }
          >
            <Text style={theme.textVariants.body}>Mi perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.helpBtns}
            onPress={() =>
              navigate("ProfileStacks", {
                screen: "ProfileScreen",
                params: {
                  screen: "Direcciones",
                },
              })
            }
          >
            <Text style={theme.textVariants.body}>Direcciones</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.helpBtns}
            onPress={() =>
              navigate("ProfileStacks", {
                screen: "ProfileScreen",
                params: {
                  screen: "Tarjeta de Crédito",
                },
              })
            }
          >
            <Text style={theme.textVariants.body}>Tarjeta de crédito</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.helpBtns}
            onPress={() =>
              navigate("ProfileStacks", {
                screen: "ProfileScreen",
                params: {
                  screen: "Pedidos",
                },
              })
            }
          >
            <Text style={theme.textVariants.body}>Pedidos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.helpBtns}
            onPress={() =>
              navigate("ProfileStacks", {
                screen: "ProfileScreen",
                params: {
                  screen: "Alcancía",
                },
              })
            }
          >
            <Text style={theme.textVariants.body}>Alcancía</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.helpContainer}>
          <TouchableOpacity
            style={styles.helpBtnTop}
            onPress={() => openWebBrowser("terminos")}
          >
            <Text style={theme.textVariants.body}>Términos y condiciones</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.helpBtns}
            onPress={() => openWebBrowser("politicas")}
          >
            <Text style={theme.textVariants.body}>Políticas de privacidad</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.helpBtns}
            onPress={() => openWebBrowser("chat")}
          >
            <Text style={theme.textVariants.body}>Ayuda</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.logoutContainer}>
          <LogoutButton
            closeDrawer={closeDrawer}
            onLogoutSubmit={onLogoutSubmit}
          />
        </View>
      </DrawerContentScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 110,
  },
  imageTag: {
    width: 200,
    height: 200,
    position: "absolute",
    top: -70,
    transform: [{ scale: 0.75 }],
  },
  usernameContainer: {
    marginLeft: theme.spacing.s,
    marginTop: theme.spacing.xxxl,
    marginBottom: theme.spacing.l,
    flexDirection: "row",
    alignItems: "center",
  },
  fullnameContainer: {
    width: "80%",
    maxHeight: 45,
    marginLeft: 2,
  },
  helpBtns: {
    height: 50,
    marginLeft: theme.spacing.l,
    color: theme.colors.foreground,
  },
  helpBtnTop: {
    marginTop: theme.spacing.l,
    height: 50,
    marginLeft: theme.spacing.l,
    color: theme.colors.foreground,
  },
  helpContainer: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.secondaryVariant2,
  },
  logoutContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: theme.colors.secondaryVariant2,
    marginTop: 10,
  },
  logo: {
    position: "absolute",
    height: 130,
    width: 130,
    top: Platform.OS === "ios" ? -30 : -25,
    left: "35%",
  },
  shape: {
    position: "absolute",
    zIndex: 1,
  },
});

export default CustomDrawer;
