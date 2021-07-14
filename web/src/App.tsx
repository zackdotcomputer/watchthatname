import { FatalErrorBoundary } from '@redwoodjs/web';
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo';
import { ChakraProvider } from '@chakra-ui/react';
import FatalErrorPage from 'src/pages/FatalErrorPage';
import Routes from 'src/Routes';

import './index.css';

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <ChakraProvider>
      <RedwoodApolloProvider>
        <Routes />
      </RedwoodApolloProvider>
    </ChakraProvider>
  </FatalErrorBoundary>
);

export default App;
