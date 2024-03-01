import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import MainStacks from "./src/navigators/MainStacks";
import AppLoading from "expo-app-loading";
import { ConfigProvider, useConfigContext } from "./src/contexts/ConfigContext";
import useInitialLoad from "./src/hooks/useInitialLoad";

export default function App() {
  const { initialLoadIsCompleted, setinitialLoadIsCompleted, loadInitialData } =
    useInitialLoad();

  if (!initialLoadIsCompleted) {
    return (
      <AppLoading
        startAsync={loadInitialData}
        onFinish={() => setinitialLoadIsCompleted(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <NavigationContainer>
      <ConfigProvider>
        <MainStacks />
      </ConfigProvider>
    </NavigationContainer>
  );
}
