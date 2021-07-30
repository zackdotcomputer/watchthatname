// From the Redwood Project
import type {
  QueryHookOptions,
  QueryResult,
  MutationHookOptions,
  MutationTuple
} from "@apollo/client";

// @MARK: Override relevant types from Apollo here
declare global {
  interface QueryOperationResult<TData> extends QueryResult<TData> {}
  interface MutationOperationResult<TData, TVariables> extends MutationTuple<TData, TVariables> {}

  interface GraphQLQueryHookOptions extends QueryHookOptions {}
  interface GraphQLMutationHookOptions extends MutationHookOptions {}
}

export {};
