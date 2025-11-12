import { registerRootComponent } from "expo";
import LogInScreen from "./auth/log-in";

export default function App() {

  return <LogInScreen />;
}

registerRootComponent(App);