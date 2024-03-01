import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { globalStyles, windowHeight } from "../../styles/global";
import { theme } from "../../styles/theme";
import CustomTextInput from "../../components/shared/CustomTextInput";
import DeliveryAddressCheckout from "../../components/checkout/DeliveryAddressCheckout";
import { useCartContext } from "../../contexts/CartContext";
import ContinueButton from "../../components/checkout/ContinueButton";
import { PHONE_REGEX } from "../../utils/constants";
import { Switch } from "react-native-elements";
import CommentBox from "../../components/checkout/CommentBox";
import { useConfigContext } from "../../contexts/ConfigContext";
import { getShedules } from "../../api/cart";
import CustomPicker from "../../components/shared/CustomPicker";

const CheckoutDeliveryScreen = ({ navigation }: any) => {
  const { user, config } = useConfigContext();
  const { cart } = useCartContext();
  const [showPicker, setShowPicker] = useState(false);
  const [horariosArr, setHorariosArr] = useState<any[]>([]);
  const [iosSchedule, setIosSchedule] = useState({
    obj: { from: "", to: "", price: "" },
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      phone:
        user.phone.startsWith("9") || user.phone.startsWith("2")
          ? "+56 " + user.phone
          : user.phone,
      scheduleId: "",
      isGift: false,
      comment: "",
    },
  });

  const getHorario = async () => {
    let resp = await getShedules(config.storeId);
    if (resp.length > 0) {
      setHorariosArr(resp);
    }
  };

  useEffect(() => {
    getHorario();
  }, []);

  return (
    <KeyboardAvoidingView
      style={{
        height: Platform.OS === "ios" ? windowHeight - 100 : windowHeight - 70,
        backgroundColor: theme.colors.background,
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={[globalStyles.flex1, styles.screenContainer]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <DeliveryAddressCheckout navigate={navigation.navigate} />
          <View style={styles.formContainer}>
            <Text style={[theme.textVariants.body, styles.title]}>
              Estás a sólo 2 pasos de terminar tu compra
            </Text>
            <Controller
              control={control}
              name="phone"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <CustomTextInput
                  placeholder="Teléfono de contacto"
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
          </View>

          {/* horario */}
          {config.delivery == "DELIVERY" && (
            <View>
              <Text
                style={[
                  theme.textVariants.body,
                  styles.title,
                  { marginBottom: theme.spacing.s },
                ]}
              >
                Horario de entrega
              </Text>
              {Platform.OS === "android" && (
                <Controller
                  control={control}
                  name="scheduleId"
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <CustomPicker
                      data={horariosArr}
                      error={error}
                      value={value}
                      onChange={onChange}
                      from="horarios"
                    />
                  )}
                  rules={{
                    required: "Campo requerido.",
                  }}
                />
              )}
              {Platform.OS === "ios" && !showPicker && (
                <TouchableOpacity
                  onPress={() => setShowPicker(true)}
                  style={styles.touchablePicker}
                >
                  <Text style={theme.textVariants.bodyVariant}>
                    {iosSchedule.obj.from !== ""
                      ? iosSchedule.obj.from +
                        "-" +
                        iosSchedule.obj.to +
                        " " +
                        "$" +
                        iosSchedule.obj.price
                      : "Selecciona Hora"}
                  </Text>
                </TouchableOpacity>
              )}
              {showPicker && (
                <Controller
                  control={control}
                  name="scheduleId"
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <CustomPicker
                      data={horariosArr}
                      error={error}
                      value={value}
                      onChange={onChange}
                      from="horarios"
                      setIosSchedule={setIosSchedule}
                      setShowPicker={setShowPicker}
                      iosSchedule={iosSchedule}
                    />
                  )}
                  rules={{
                    required: "Campo requerido.",
                  }}
                />
              )}
            </View>
          )}

          {/* comentarios */}
          <Text style={[theme.textVariants.body, styles.title]}>
            Comentarios adicionales
          </Text>

          {/* regalo */}
          <View style={styles.commentsContainer}>
            <Text style={[theme.textVariants.body, styles.title]}>
              ¡Es un regalo!
            </Text>
            <Text style={[theme.textVariants.bodyVariant2, styles.subtitle]}>
              Comentarios sobre mi pedido
            </Text>
            <Controller
              control={control}
              name="comment"
              render={({ field: { onChange, onBlur, value } }) => (
                <CommentBox
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            <View style={styles.switchContainer}>
              <Controller
                control={control}
                name="isGift"
                render={({ field: { onChange, value } }) => (
                  <Switch
                    value={value}
                    onValueChange={onChange}
                    color={theme.colors.primary}
                  />
                )}
              />
            </View>
          </View>
        </ScrollView>
      </View>
      <View
        style={[
          globalStyles.flexRow,
          globalStyles.flexCenter,
          globalStyles.windowWidth,
          styles.footer,
        ]}
      >
        <ContinueButton
          deliveryData
          title={cart.totalModalidad}
          handleSubmit={handleSubmit}
          navigate={navigation.navigate}
          nextScreen={"CheckoutDiscountsScreen"}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.m,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontWeight: "bold",
    color: theme.colors.foreground,
    marginBottom: theme.spacing.l,
  },
  subtitle: {
    fontWeight: "bold",
    color: theme.colors.foreground,
    marginBottom: theme.spacing.xs,
  },
  formContainer: {
    marginTop: theme.spacing.l,
  },
  commentsContainer: {
    bottom: 15,
    backgroundColor: theme.colors.secondary,
    flexDirection: "column",
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.s,
    marginBottom: 70,
  },
  switchContainer: {
    position: "absolute",
    top: Platform.OS === "ios" ? 5 : 5,
    right: Platform.OS === "ios" ? 10 : 5,
  },
  footer: {
    minHeight: 80,
    borderTopWidth: 1,
    borderTopColor: theme.colors.secondaryVariant2,
    backgroundColor: theme.colors.background,
    paddingBottom: Platform.OS === "ios" ? theme.spacing.m : 0,
  },
  touchablePicker: {
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: theme.colors.secondaryVariant,
    borderRadius: 3,
    borderWidth: 1,
    marginBottom: theme.spacing.l,
    paddingHorizontal: 10,
  },
});

export default CheckoutDeliveryScreen;
