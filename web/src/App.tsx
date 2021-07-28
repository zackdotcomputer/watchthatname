import { AuthProvider } from '@redwoodjs/auth'
import { ClerkProvider, ClerkLoaded, useClerk } from '@clerk/clerk-react'
import { FatalErrorBoundary } from "@redwoodjs/web";
import { RedwoodApolloProvider } from "@redwoodjs/web/apollo";
import FatalErrorPage from "src/pages/FatalErrorPage";
import Routes from "src/Routes";

import "./index.css";
import "./scaffold.css";


// You can set user roles in a "roles" array on the public metadata in Clerk.
// Also, you need to add two env variables: CLERK_FRONTEND_API_URL for web and
// CLERK_API_KEY for api, with the frontend api host and api key, respectively,
// both from your Clerk.dev dashboard.
let clerk
const ClerkAuthConsumer = ({ children }) => {
  clerk = useClerk()
  return React.cloneElement(children, { client: clerk })
}

const ClerkAuthProvider = ({ children }) => {
  const frontendApi = process.env.CLERK_FRONTEND_API_URL
  if (!frontendApi) {
    throw new Error('Need to define env variable CLERK_FRONTEND_API_URL')
  }

  return (
    <ClerkProvider frontendApi={frontendApi}>
      <ClerkLoaded>
        <ClerkAuthConsumer>{children}</ClerkAuthConsumer>
      </ClerkLoaded>
    </ClerkProvider>
  )
}

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <ClerkAuthProvider>
    <AuthProvider client={clerk} type="clerk">
      <RedwoodApolloProvider>
        <Routes />
      </RedwoodApolloProvider>
    </AuthProvider>
    </ClerkAuthProvider>
  </FatalErrorBoundary>
);

export default App;
