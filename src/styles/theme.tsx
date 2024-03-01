const palette = {
  red: "#D50133",
  white: "#FFFFFF",
  lightGray: "#F2F2F2",
  gray: "lightgray",
  darkGray: "#626262",
  darkGray2: "#A0A0A0",
  lightBlack: "#282828",
  black: "#000000",
  yellow: "#F7BA00",
  lightYellow: "#FFF2C7",
  blue: "#5BC9FE",
  lightBlue: "#CDF1FF",
  green: "#9FDD4A",
  lightGreen: "#E2FAAE",
};

export const theme = {
  colors: {
    background: palette.white,
    foreground: palette.black,
    foregroundVariant: palette.lightBlack,
    primary: palette.red,
    secondary: palette.lightGray,
    secondaryVariant: palette.darkGray,
    secondaryVariant1: palette.darkGray2,
    secondaryVariant2: palette.gray,
    alertPrimary: palette.yellow,
    alertSecondary: palette.lightYellow,
    infoPrimary: palette.blue,
    infoSecondary: palette.lightBlue,
    okPrimary: palette.green,
    okSecondary: palette.lightGreen,
  },
  spacing: {
    xs: 5,
    s: 10,
    m: 15,
    l: 20,
    xl: 25,
    xxl: 30,
    xxxl: 35,
  },
  textVariants: {
    body: {
      fontFamily: "Roboto-Medium",
      fontSize: 16,
    },
    bodyVariant: {
      fontFamily: "Roboto-Regular",
      fontSize: 16,
    },
    bodyVariant2: {
      fontFamily: "Roboto-Regular",
      fontSize: 14,
    },
    bodyVariant3: {
      fontFamily: "Roboto-Regular",
      fontSize: 12,
    },
    title: {
      fontFamily: "Roboto-Medium",
      fontSize: 20,
    },
    modalTitle: {
      fontFamily: "Rift-Bold",
      fontSize: 48,
    },
    modalTitleVariant: {
      fontFamily: "Roboto-Regular",
      fontSize: 18,
    },
    modalTitleVariant2: {
      fontFamily: "Roboto-Regular",
      fontSize: 20,
    },
    modalSubtitle: {
      fontFamily: "Zero-Regular",
      fontSize: 28,
    },
    sectionTitle: {
      fontFamily: "Zero-Regular",
      fontSize: 23,
    },
    productTag: {
      fontFamily: "Roboto-Regular",
      fontSize: 11,
    },
    tabNavigator: {
      fontFamily: "Roboto-Medium",
      fontSize: 14,
      letterSpacing: 1,
    },
    button: {
      fontFamily: "Roboto-Medium",
      fontSize: 14,
    },
    input: {
      fontFamily: "Roboto-Regular",
      fontSize: 14,
    },
    price: {
      fontFamily: "Roboto-Medium",
      fontSize: 24,
    },
  },
};
