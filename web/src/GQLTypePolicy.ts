import { ApolloClientCacheConfig } from "./DWApolloProvider";
import { offsetLimitPagination } from "@apollo/client/utilities";

export const TypePolicy: ApolloClientCacheConfig = {
  typePolicies: {
    Query: {
      fields: {
        search: {
          ...offsetLimitPagination()
        }
      }
    }
  }
};
