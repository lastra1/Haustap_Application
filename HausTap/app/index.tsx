import { registerRootComponent } from "expo";
import GuestAccount from "./guess-account";

export default function App() {
  return <GuestAccount />;
}

registerRootComponent(App);