import Plausible from "plausible-tracker";
import { createContext, PropsWithChildren, useContext, useEffect } from "react";

const plausibleTracker = Plausible({
  domain: process.env.PLAUSIBLE_DOMAIN
});

const PlausibleContext = createContext<typeof plausibleTracker>(plausibleTracker);

export function PlausibleProvider({ children }: PropsWithChildren<unknown>) {
  return <PlausibleContext.Provider value={plausibleTracker}>{children}</PlausibleContext.Provider>;
}
export function usePlausible() {
  return useContext(PlausibleContext);
}
export function useTrackPageview(sanitizedPath?: string) {
  const { trackPageview } = usePlausible();
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (sanitizedPath) {
        trackPageview({ url: window.location.origin + sanitizedPath });
      } else {
        trackPageview();
      }
    }
  }, [sanitizedPath, trackPageview]);
}
