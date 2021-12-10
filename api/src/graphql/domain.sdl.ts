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
    search(input: SearchQueryInput!, offset: Int, limit: Int): [Domain!]! @skipAuth
    favorites(offset: Int, limit: Int): [Domain!]! @requireAuth
    findOne(domain: String!): Domain @skipAuth
  }

  type Mutation {
    setWishdomain(input: SetWishInput!): Domain! @requireAuth
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
