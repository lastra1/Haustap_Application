import { registerRootComponent } from "expo";
import { router } from "expo-router";
import { useEffect } from "react";
import { getUserRole, loadBaseUrl } from "../src/config/apiConfig";

export default function App() {
  useEffect(() => {
    const initializeApp = async () => {
      await loadBaseUrl();
     
      const role = await getUserRole();

      if (!role) {
        router.replace('/guess-account');
      } else if (role === 'client') {
        router.replace('/client-side');
      } else if (role === 'service-provider' || role === 'provider') {
        router.replace('/service-provider');
      } else {
        router.replace('/guess-account'); // Fallback to login if role is unrecognized
      }

    };

    initializeApp();
  }, []);

  return null; 
}

registerRootComponent(App);