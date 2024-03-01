import React, { useState } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { Icon } from "react-native-elements";
import useHandleCreditCards from "../../hooks/useHandleCreditCards";
import { theme } from "../../styles/theme";
import QuestionModal from "../shared/QuestionModal";

const ProfileCardItem = ({
  text1,
  text2,
  cardId,
  getCardList,
  setShowCustomAlert,
  setCustomAlertCode,
  setCustomAlertMsg,
}: any) => {
  const { deleteCreditCard } = useHandleCreditCards();
  const [visible, setVisible] = useState(false);

  const deleteWebpay = async (id: number) => {
    setVisible(false);
    await deleteCreditCard(id);
    setShowCustomAlert(true);
    setCustomAlertCode("ok");
    setCustomAlertMsg("Tu medio de pago ha sido eliminado");
    getCardList();
    setTimeout(() => {
      setShowCustomAlert(false);
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={[theme.textVariants.body, styles.text1]}>{text1}</Text>
        <Text style={[theme.textVariants.bodyVariant2, styles.text2]}>
          {text2}
        </Text>
      </View>
      <View>
        <Icon
          type="evilicon"
          name="trash"
          size={40}
          color={theme.colors.foreground}
          onPress={() => setVisible(true)}
        />
      </View>

      <QuestionModal
        visible={visible}
        title={"Eliminarás este medio de pago de tu perfil"}
        subtitle={"¿De acuerdo?"}
        cancelButton={"Cancelar"}
        acceptButton={"Sí, eliminar"}
        handleCancelButton={() => setVisible(false)}
        handleAcceptButton={() => deleteWebpay(cardId)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.secondaryVariant2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text1: {
    color: theme.colors.foreground,
    marginBottom: theme.spacing.s,
  },
  text2: {
    color: theme.colors.secondaryVariant,
  },
});

export default ProfileCardItem;
