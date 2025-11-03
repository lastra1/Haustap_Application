import { useRouter } from "expo-router";
import { useEffect } from "react";
import { SHOW_CLIENT_HOME } from "../src/devFlags";

export default function Index() {
  const router = useRouter();
  useEffect(() => {
    // Delay navigation slightly to ensure the Root Layout (navigator/Slot)
    // has mounted. Navigating immediately in the first render can cause
    // "Attempted to navigate before mounting the Root Layout" errors.
    const timer = setTimeout(() => {
      if (SHOW_CLIENT_HOME) {
        router.replace("/client-side");
      } else {
        // When ready, set the flag to false to route to signup (partner flow)
        router.replace("/partner");
      }
    }, 50);
    return () => clearTimeout(timer);
  }, []);
  return null;
}
