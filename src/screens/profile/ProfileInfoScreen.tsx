import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import ProfileEditUserModal from "../../components/profile/ProfileEditUserModal";
import ProfileInfoItem from "../../components/profile/ProfileInfoItem";
import CustomAlert from "../../components/shared/CustomAlert";
import { useConfigContext } from "../../contexts/ConfigContext";
import { addItemButtonStyles } from "../../styles/buttons";
import { globalStyles } from "../../styles/global";
import { theme } from "../../styles/theme";
import { capitalizeText } from "../../utils/formatText";

const ProfileInfoScreen = () => {
  const { user, updateUser } = useConfigContext();
  const [visible, setVisible] = useState(false);
  const [showCustomAlert, setShowCustomAlert] = useState(false)
  const [customAlertMsg, setCustomAlertMsg] = useState('')
  const [customAlertCode, setCustomAlertCode] = useState('ok')

  const toggleProfileEditUserModal = () => {
    setVisible(!visible);
  };

  return (
    <View style={[globalStyles.background, globalStyles.flex1]}>
      <ProfileInfoItem
        text1={capitalizeText(user.fullName)}
        text2={user.email}
      />
      <ProfileInfoItem text1="RUT" text2={user.rut} />
      <ProfileInfoItem text1="Télefono" text2={user.phone} />
      <View style={styles.navButtonContainer}>
        <Button
          type="outline"
          title="Editar Perfil"
          icon={{
            type: "font-awesome-5",
            name: "edit",
            size: 20,
            color: theme.colors.foreground,
          }}
          containerStyle={addItemButtonStyles.container}
          buttonStyle={addItemButtonStyles.button}
          titleStyle={[theme.textVariants.button, addItemButtonStyles.text]}
          onPress={() => toggleProfileEditUserModal()}
        />
      </View>
      <ProfileEditUserModal
        visible={visible}
        toggleProfileEditUserModal={toggleProfileEditUserModal}
        user={user}
        updateUser={updateUser}
        setShowCustomAlert={setShowCustomAlert}
        setCustomAlertMsg={setCustomAlertMsg}
        setCustomAlertCode={setCustomAlertCode}
      />
      {showCustomAlert && <CustomAlert text={customAlertMsg} code={customAlertCode} positionY={"2%"} positionX={'-4%'} />}
    </View>
  );
};

const styles = StyleSheet.create({
  navButtonContainer: {
    flexDirection: "row",
    marginTop: theme.spacing.s,
    justifyContent: "center",
  },
  logoutButtonContainer: {
    position: "absolute",
    bottom: "5%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  loaderContainer: {
    position: "absolute",
    bottom: "10%",
    width: "100%",
  },
  modalContainer: {
    width: "85%",
    padding: theme.spacing.m,
  },
  title: {
    marginBottom: theme.spacing.m,
  },
  inputContainer: {
    marginBottom: theme.spacing.m,
  },
  inputDesc: {
    backgroundColor: theme.colors.background,
    color: theme.colors.secondaryVariant,
    textAlign: "right",
    position: "absolute",
    top: "52%",
    width: "100%",
  },
  submitContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  submit: {
    maxWidth: 190,
  },
});

export default ProfileInfoScreen;
