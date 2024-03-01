import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Overlay } from 'react-native-elements'
import { BackgroundImage } from 'react-native-elements/dist/config'
import { primaryButtonStyles, secondaryButtonStyles } from '../../styles/buttons'
import { theme } from '../../styles/theme'

const QuestionModal = ({
  visible,
  title,
  subtitle,
  cancelButton,
  acceptButton,
  handleCancelButton,
  handleAcceptButton }: any) => {
  return (
    <Overlay
      isVisible={visible}
      overlayStyle={styles.modalContainer}
    >
      <View>
        <Text style={theme.textVariants.body}>
          {title}
        </Text>
        {subtitle && <Text style={[theme.textVariants.bodyVariant2, styles.subtitle]}>
          {subtitle}
        </Text>}
        <View style={styles.submitContainer}>
          <Button
            title={cancelButton}
            containerStyle={[secondaryButtonStyles.container, styles.cancel]}
            buttonStyle={[secondaryButtonStyles.button, { backgroundColor: theme.colors.background }]}
            titleStyle={[theme.textVariants.button, secondaryButtonStyles.text, { paddingHorizontal: theme.spacing.l }]}
            onPress={handleCancelButton}
          />
          <Button
            title={acceptButton}
            containerStyle={[secondaryButtonStyles.container, styles.submit]}
            buttonStyle={[secondaryButtonStyles.button, { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary }]}
            titleStyle={[theme.textVariants.button, secondaryButtonStyles.text, { paddingHorizontal: theme.spacing.l, color: theme.colors.background }]}
            onPress={handleAcceptButton}
          />
        </View>
      </View>
    </Overlay>
  )
}

const styles = StyleSheet.create({
  submitContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 40,
  },
  submit: {
    maxWidth: 190,
  },
  cancel: {
    maxWidth: 190,
    marginRight: 10,
  },
  modalContainer: {
    width: "85%",
    height: 'auto',
    padding: theme.spacing.m,
  },
  subtitle: {
    backgroundColor: theme.colors.background,
    color: theme.colors.secondaryVariant,
    textAlign: "left",
    width: "100%",
  },
})

export default QuestionModal