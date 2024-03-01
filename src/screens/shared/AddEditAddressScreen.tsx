import React, { useEffect, useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { theme } from "../../styles/theme";
import CustomTextInput from "../../components/shared/CustomTextInput";
import CustomPicker from "../../components/shared/CustomPicker";
import { primaryButtonStyles } from "../../styles/buttons";
import { Button } from "react-native-elements";
import useHandleAddressData from "../../hooks/useHandleAddressData";
import Loader from "../../components/shared/Loader";
import { useConfigContext } from "../../contexts/ConfigContext";

const AddEditAddressScreen = ({ navigation, route }: any) => {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: "",
      streetName: "",
      number: "",
      depto: "",
      comunne: "",
    },
  });
  const { communes, getCommunesData, onContinue, loading } =
    useHandleAddressData(navigation, route);
  const [openIos, setOpenIos] = useState(false);
  const { addresses } = useConfigContext();

  useEffect(() => {
    getCommunesData();
  }, [])

  useEffect(() => {
    if (route.params && route.params.addressId !== undefined) {
      const item = addresses.find(x => x.id === route.params.addressId);
      if (item !== undefined) {
        const comuneId = communes && communes.find((elem: { name: string; }) => elem.name === item.commune).id
        setValue("name", item.name)
        setValue("streetName", item.street)
        setValue("number", item.number)
        setValue("depto", item.unitNumber)
        setValue("comunne", comuneId + '_' + item.commune)
      }
    }
  }, [communes]);

  if (communes == null) {
    return <Loader />
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Controller
          control={control}
          name="name"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <CustomTextInput
              placeholder="Nombre (trabajo, casa, oficina, etc)"
              error={error}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          rules={{
            required: "Campo requerido.",
          }}
        />

        <Controller
          control={control}
          name="streetName"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <CustomTextInput
              placeholder="Calle"
              error={error}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          rules={{
            required: "Campo requerido.",
          }}
        />

        <Controller
          control={control}
          name="number"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <CustomTextInput
              placeholder="Número"
              error={error}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          rules={{
            required: "Campo requerido.",
          }}
        />

        <Controller
          control={control}
          name="depto"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <CustomTextInput
              placeholder="Departamento"
              error={error}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          rules={{}}
        />

        {Platform.OS == 'ios' && !openIos && <TouchableOpacity style={styles.touchablePicker} onPress={() => setOpenIos(true)}>
          <Text style={[theme.textVariants.bodyVariant2, { color: theme.colors.secondaryVariant }]}>
            Comuna
          </Text>
        </TouchableOpacity>}
        {/* Picker para Ios */}
        {openIos && <Controller
          control={control}
          name="comunne"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <CustomPicker
              data={communes}
              error={error}
              value={value}
              onChange={onChange}
              from="comunas"
            />
          )}
          rules={{
            required: "Campo requerido.",
          }}
        />}
        {/* Picker para android */}
        {Platform.OS == 'android' && <Controller
          control={control}
          name="comunne"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <CustomPicker
              data={communes}
              error={error}
              value={value}
              onChange={onChange}
              placeholder="Comuna"
              from="comunas"
            />
          )}
          rules={{
            required: "Campo requerido.",
          }}
        />}

        <View style={styles.buttonContainer}>
          {loading ? (
            <View style={styles.loaderContainer}>
              <Loader />
            </View>
          ) : (
            <Button
              title="Continuar"
              onPress={handleSubmit(onContinue)}
              containerStyle={primaryButtonStyles.container}
              buttonStyle={primaryButtonStyles.button}
              titleStyle={[theme.textVariants.button, primaryButtonStyles.text]}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.l,
    alignItems: "center",
  },
  buttonContainer: {
    width: "44%",
  },
  loaderContainer: {
    marginTop: theme.spacing.m,
  },
  touchablePicker: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: theme.colors.secondaryVariant,
    borderRadius: 3,
    borderWidth: 1,
    marginBottom: theme.spacing.l,
    paddingHorizontal: 10
  },
});

export default AddEditAddressScreen;
function elem(elem: any, arg1: (any: any) => boolean) {
  throw new Error("Function not implemented.");
}

