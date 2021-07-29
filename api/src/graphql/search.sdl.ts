export const schema = gql`
  type DomainResult {
    domain: String!
    desiredDomain: String!

    available: Boolean!
    definitive: Boolean!

    price: DomainPrice
  }

  type DomainPrice {
    price: Int!
    currency: String
  }

  type Query {
    search(query: SearchQueryInput!, page: Int): [DomainResult!]!
  }

  input SearchQueryInput {
    query: String!
    noCountryCodes: Boolean
  }
`;
