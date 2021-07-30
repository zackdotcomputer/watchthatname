import { AuthProvider } from "@redwoodjs/auth";
import { ClerkProvider, ClerkLoaded, useClerk } from "@clerk/clerk-react";
import { FatalErrorBoundary, RedwoodProvider } from "@redwoodjs/web";
import FatalErrorPage from "src/pages/FatalErrorPage";
import Routes from "src/Routes";
import { PlausibleProvider } from "./PlausibleProvider";

import "./index.css";
import "./scaffold.css";
import { DWApolloProvider } from "./DWApolloProvider";
import { TypePolicy } from "./GQLTypePolicy";

const ClerkAuthProvider = ({ children }) => {
  const frontendApi = process.env.CLERK_FRONTEND_API_URL;
  if (!frontendApi) {
    throw new Error("Need to define env variable CLERK_FRONTEND_API_URL");
  }

  return (
    <ClerkProvider frontendApi={frontendApi}>
      <ClerkLoaded>{children}</ClerkLoaded>
    </ClerkProvider>
  );
};

const AppWrapped = () => {
  const clerk = useClerk();
  if (!clerk) {
    console.error("Clerk was not loaded");
  }

  return (
    <RedwoodProvider>
      <PlausibleProvider>
        <AuthProvider client={clerk} type="clerk">
          <DWApolloProvider
            graphQLClientConfig={{
              cacheConfig: TypePolicy
            }}
          >
            <Routes />
          </DWApolloProvider>
        </AuthProvider>
      </PlausibleProvider>
    </RedwoodProvider>
  );
};

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <ClerkAuthProvider>
      <AppWrapped />
    </ClerkAuthProvider>
  </FatalErrorBoundary>
);

export default App;
