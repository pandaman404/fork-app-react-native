import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { Icon } from "react-native-elements";
import { theme } from "../../styles/theme";
import QuestionModal from "../shared/QuestionModal";
import * as Analytics from 'expo-firebase-analytics';

const ProfileItemAddress = ({
  name,
  streetAndNumber,
  showAddressOptions,
  id,
  showOptions,
  disabled,
  deleteAddress,
  openEditAddress,
  handleCustomAlert
}: any) => {
  const [visible, setVisible] = useState(false);

  const toggleModal = () => {
    setVisible(!visible);
    showAddressOptions(null)
  };

  const confirmDeleteAddress = (id: any) => {
    deleteAddress(id)
    toggleModal()
    handleCustomAlert(
      'Dirección eliminada con éxito',
      'ok'
    )
    Analytics.logEvent('delete_address_app', {
      address_id: id,
      address_name: name
    });
  }

  const handleDeletePress = () => {
    setVisible(true);
    showAddressOptions(null);
  }

  return (
    <Pressable onPress={() => showAddressOptions(null)}>
      <View
        style={[
          styles.profileItemWithOptions,
          {
            backgroundColor: disabled ? theme.colors.secondary : theme.colors.background
          }]}>
        {/* Direccion */}
        <View style={[styles.container]}>
          <Text style={[theme.textVariants.body, styles.name]}>{name}</Text>
          <Text style={[theme.textVariants.bodyVariant2, styles.streetNum]}>{streetAndNumber}</Text>
        </View>
        {/* Opciones */}
        <View style={{ position: "absolute", right: 20 }}>
          <Icon
            name="dots-three-vertical"
            type="entypo"
            color={theme.colors.foreground}
            size={20}
            onPress={() => showAddressOptions(id)}
          />
          {/* Editar - Eliminar */}
          {showOptions && <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={[styles.optionsView, { paddingLeft: 10 }]}
              onPress={() => openEditAddress(id)}
            >
              <Icon
                name="edit"
                type="font-awesome-5"
                color={theme.colors.foreground}
                size={22}
                style={{ marginRight: 10 }}
              />
              <Text style={theme.textVariants.bodyVariant}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionsView}
              onPress={() => handleDeletePress()}
            >
              <Icon
                name="trash"
                type="evilicon"
                color={theme.colors.foreground}
                size={40}
                style={{ marginRight: 0 }}
              />
              <Text style={theme.textVariants.bodyVariant}>Eliminar</Text>
            </TouchableOpacity>
          </View>}
        </View>
        {/* Pregunta para eliminar */}
        <QuestionModal
          visible={visible}
          title={'Eliminarás esta dirección de tu perfil'}
          subtitle={'¿De acuerdo?'}
          cancelButton={'No'}
          acceptButton={"Sí"}
          handleCancelButton={toggleModal}
          handleAcceptButton={() => confirmDeleteAddress(id)}
        />
      </View>
    </Pressable>
  )
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.m,
  },
  name: {
    color: theme.colors.foreground,
    marginBottom: theme.spacing.s,
  },
  streetNum: {
    color: theme.colors.secondaryVariant,
  },
  optionsContainer: {
    width: 110,
    height: 85,
    backgroundColor: "white",
    borderRadius: 5,
    position: "absolute",
    right: 25,
    top: -35,
    shadowColor: theme.colors.foregroundVariant,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionsView: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    justifyContent: "flex-start",
  },
  profileItemWithOptions: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.secondaryVariant2,
  }
});

export default ProfileItemAddress;
