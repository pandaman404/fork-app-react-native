import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Button, Overlay } from "react-native-elements";
import { theme } from "../../styles/theme";
import DeliveryIcon from "../../assets/delivery.svg";
import StoreIcon from "../../assets/retiro.svg";
import { useConfigContext } from "../../contexts/ConfigContext";
import useNps from "../../hooks/useNps";

const NpsPopUp = () => {
  const { user } = useConfigContext();
  const { visible, npsData, openEvaluation, cancelEvaluation } = useNps(user);

  if (!visible) {
    return null;
  }

  return (
    <Overlay isVisible={visible} overlayStyle={styles.overlay}>
      <Button
        type="clear"
        icon={{
          name: "x",
          type: "feather",
          size: 22,
          color: theme.colors.foreground,
        }}
        containerStyle={styles.closeNps}
        onPress={() => cancelEvaluation()}
      />
      <Text style={[theme.textVariants.modalTitleVariant2, styles.title]}>
        Califica tu experiencia
      </Text>
      <View style={styles.serviceContainer}>
        {npsData && npsData.kind === 1 ? (
          <DeliveryIcon
            height={45}
            width={40}
            fill={theme.colors.primary}
            style={{ bottom: theme.spacing.s }}
          />
        ) : (
          <StoreIcon height={45} width={40} fill={theme.colors.primary} />
        )}
        <View style={styles.serviceInfo}>
          <Text
            style={[
              theme.textVariants.bodyVariant3,
              {
                color: theme.colors.secondaryVariant,
                textAlign: "center",
                marginBottom: theme.spacing.xs,
              },
            ]}
          >
            {npsData && npsData.kind == 1
              ? `Retiro en tienda ${npsData && npsData.storeName}`
              : npsData && npsData.kind == 0
              ? `Despacho a ${npsData && npsData.addressName}`
              : ""}
          </Text>
          <Text
            style={[
              theme.textVariants.bodyVariant3,
              { color: theme.colors.secondaryVariant },
            ]}
          >
            {npsData && npsData.dateMessage}
          </Text>
        </View>
      </View>
      <View style={styles.scoreContainer}>
        <Text style={[theme.textVariants.bodyVariant, styles.scoreTitle]}>
          ¿Qué nota nos sacamos?
        </Text>
        <View style={styles.scoreGridContainer}>
          {[1, 2, 3, 4, 5, 6, 7].map((score) => {
            return (
              <TouchableOpacity
                style={[
                  styles.scoreItem,
                  score < 7 ? { borderRightWidth: 2 } : { borderRightWidth: 0 },
                ]}
                key={score}
                onPress={() => openEvaluation(score)}
              >
                <Text
                  style={[
                    theme.textVariants.bodyVariant,
                    { fontWeight: "bold" },
                  ]}
                >
                  {score}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  overlay: {
    width: "80%",
    borderRadius: 5,
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: theme.spacing.l,
  },
  closeNps: {
    position: "absolute",
    top: "4%",
    right: "1%",
  },
  title: {
    fontWeight: "bold",
    marginBottom: theme.spacing.m,
  },
  serviceContainer: {
    flexDirection: "row",
    marginBottom: theme.spacing.s,
  },
  serviceInfo: {
    marginLeft: theme.spacing.s,
  },
  scoreContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  scoreTitle: {
    fontWeight: "bold",
    marginBottom: theme.spacing.m,
  },
  scoreGridContainer: {
    flexDirection: "row",
    borderColor: theme.colors.foreground,
    borderWidth: 2,
    borderRadius: 5,
  },
  scoreItem: {
    padding: 13,
    borderColor: theme.colors.foreground,
  },
});

export default NpsPopUp;
