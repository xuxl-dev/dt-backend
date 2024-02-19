import { ApolloServerPlugin, GraphQLRequestContext, GraphQLRequestListener } from "@apollo/server";

interface FCContext {
  token: string;
}

export class FCApolloPlugins implements ApolloServerPlugin<FCContext> {
  async requestDidStart(requestContext: GraphQLRequestContext<FCContext>): Promise<void | GraphQLRequestListener<FCContext>> {
    const {
      contextValue: apolloContext,
      request: {
        variables: requestVariables,
      },
    } = requestContext;
    return {
      async didResolveOperation(requestContext) {
       
      },
    };
  }
}