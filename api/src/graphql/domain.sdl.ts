export const schema = gql`
  type Domain {
    id: String!
    domain: String!
    desiredDomain: String

    available: Boolean!
    definitive: Boolean!

    price: DomainPrice

    favorited: Boolean

    whois: String
  }

  type DomainPrice {
    price: Int!
    currency: String
  }

  type Query {
    search(input: SearchQueryInput!, offset: Int, limit: Int): [Domain!]!
    favorites(offset: Int, limit: Int): [Domain!]!
    findOne(domain: String!): Domain
  }

  type Mutation {
    setWishdomain(input: SetWishInput!): Domain!
  }

  input SetWishInput {
    domain: String!
    desiredDomain: String
    favorited: Boolean!
  }

  input SearchQueryInput {
    query: String!
    noCountryCodes: Boolean
  }
`;
