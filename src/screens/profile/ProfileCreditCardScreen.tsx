import React, { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Icon, Overlay } from "react-native-elements";
import WebView from "react-native-webview";
import ProfileCardItem from "../../components/profile/ProfileCardItem";
import CustomAlert from "../../components/shared/CustomAlert";
import Loader from "../../components/shared/Loader";
import NavButton from "../../components/shared/NavButton";
import useHandleCreditCards from "../../hooks/useHandleCreditCards";
import { globalStyles, windowHeight } from "../../styles/global";
import { theme } from "../../styles/theme";

const ProfileCreditCardScreen = () => {
  const { getCardList, cardList, addCreditCard, updateCreditCardInContext } =
    useHandleCreditCards();
  const [isLoading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [link, setLink] = useState("");
  const iosScreenHeight = Platform.OS === "ios" && windowHeight > 700;
  const [showCustomAlert, setShowCustomAlert] = useState(false);
  const [customAlertMsg, setCustomAlertMsg] = useState("");
  const [customAlertCode, setCustomAlertCode] = useState("");

  const addNewCard = async () => {
    const resp = await addCreditCard();
    if (resp && resp.includes("https://")) {
      setLink(resp);
      setVisible(true);
    }
  };

  const handleNavState = async (newNavState: any) => {
    const { url } = newNavState;
    let linkWebpay = url.toLowerCase();

    if (linkWebpay.includes("correctamente")) {
      setVisible(false);
      setLink("");
      updateCreditCardInContext();
      setCustomAlertMsg("La tarjeta fue ingresada correctamente");
      setCustomAlertCode("ok");
      setShowCustomAlert(true);
      setTimeout(() => {
        getCardList();
        setShowCustomAlert(false);
      }, 2000);
    }

    if (!linkWebpay || linkWebpay.includes("error")) {
      setVisible(false);
      setLink("");
      setCustomAlertMsg("No se pudo completar la inscripción");
      setCustomAlertCode("warning");
      setShowCustomAlert(true);
      setTimeout(() => {
        getCardList();
        setShowCustomAlert(false);
      }, 2000);
    }
  };

  const cancelInscription = () => {
    setVisible(false);
    setLink("");
  };

  useEffect(() => {
    getCardList();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={[
        globalStyles.background,
        globalStyles.minHeight,
        styles.container,
      ]}
    >
      <View style={styles.textContainer}>
        <Text style={[theme.textVariants.bodyVariant2, styles.text]}>
          Agrega una tarjeta de crédito para pagar con WebPay OneClick
        </Text>
      </View>
      <View style={[globalStyles.windowWidth]}>
        {cardList &&
          cardList.map((card, idx) => (
            <ProfileCardItem
              text1={card.title}
              text2={card.subtitle}
              cardId={card.id}
              key={idx}
              getCardList={getCardList}
              setShowCustomAlert={setShowCustomAlert}
              setCustomAlertCode={setCustomAlertCode}
              setCustomAlertMsg={setCustomAlertMsg}
            />
          ))}
      </View>
      <View style={styles.navButtonContainer}>
        <NavButton
          title="Tarjeta de Crédito"
          icon={{
            name: "plus",
            type: "entypo",
            size: 22,
            color: theme.colors.foreground,
          }}
          navigate={() => addNewCard()}
          addItemButton
        />
      </View>

      <Overlay
        isVisible={visible}
        overlayStyle={[
          styles.payment,
          { bottom: Platform.OS === "ios" && windowHeight <= 667 ? -20 : 0 },
        ]}
      >
        <View
          style={[
            styles.closeIconView,
            {
              height: iosScreenHeight ? 100 : 70,
              paddingTop: iosScreenHeight ? 40 : 0,
            },
          ]}
        >
          <Text
            onPress={() => cancelInscription()}
            style={[styles.closeIconText]}
          >
            <Icon
              type="feather"
              name="x"
              size={25}
              color={theme.colors.background}
            />
          </Text>
          <Text
            style={[
              theme.textVariants.title,
              { color: theme.colors.background },
            ]}
          >
            Medio de Pago
          </Text>
        </View>
        <WebView
          source={{ uri: link }}
          onNavigationStateChange={handleNavState}
          onLoadStart={() => {
            setLoading(true);
          }}
          onLoadEnd={() => {
            setLoading(false);
          }}
        />
        {isLoading && (
          <View style={styles.loaderView}>
            <Loader />
          </View>
        )}
      </Overlay>
      {showCustomAlert && (
        <CustomAlert
          code={customAlertCode}
          text={customAlertMsg}
          positionY={"2%"}
          positionX={"-3%"}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: theme.spacing.s,
  },
  navButtonContainer: {
    marginTop: theme.spacing.s,
  },
  textContainer: {
    width: "100%",
    paddingHorizontal: theme.spacing.m,
  },
  text: {
    color: theme.colors.secondaryVariant,
  },
  payment: {
    width: "100%",
    height: "100%",
    padding: 0,
    bottom: -20,
  },
  closeIconView: {
    backgroundColor: "black",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  closeIconText: {
    marginLeft: "3%",
    marginTop: Platform.OS === "ios" ? 10 : 3,
    marginRight: "6%",
  },
  loaderView: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProfileCreditCardScreen;
