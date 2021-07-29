export const schema = gql`
  type Wishdomain {
    id: String!
    user: String!
    domain: String!
    createdAt: DateTime!
  }

  type Query {
    wishdomains: [Wishdomain!]!
    wishdomain(id: String!): Wishdomain
  }

  input CreateWishdomainInput {
    domain: String!
  }

  input UpdateWishdomainInput {
    domain: String
  }

  type Mutation {
    createWishdomain(input: CreateWishdomainInput!): Wishdomain!
    updateWishdomain(id: String!, input: UpdateWishdomainInput!): Wishdomain!
    deleteWishdomain(id: String!): Wishdomain!
  }
`;
