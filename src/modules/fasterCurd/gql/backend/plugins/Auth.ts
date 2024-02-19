import { ApolloServerPlugin, GraphQLRequestContext, GraphQLRequestListener } from "@apollo/server";
import { Injectable, Logger } from "@nestjs/common";
import { AuthService } from "src/modules/auth/auth.service";

interface FCContext {
  token: string;
}
const logger = new Logger('FCAuthPlugins')

export class FCAuthPlugins implements ApolloServerPlugin<FCContext> {
  authService: AuthService
  static _instances = new Map<string, FCAuthPlugins>()

  private constructor() { }

  public static create(id: string) {
    if (this._instances.has(id)) {
      throw new Error('FCAuthPlugins id already exists')
    }
    const instance = new FCAuthPlugins()
    this._instances.set(id, instance)

    return instance
  }

  public static getInstance(id: string) {
    const instance = this._instances.get(id)
    if (!instance) {
      throw new Error('FCAuthPlugins id not found')
    }
    return instance
  }

  init(authService: AuthService) {
    if (this.hasInit) {
      throw new Error('FCAuthPlugins already initialized')
    }
    if (!authService) {
      throw new Error('FCAuthPlugins requires AuthService')
    }
    this.authService = authService
    logger.debug('FCAuthPlugins initialized')
    this.hasInit = true
    return this
  }

  hasInit = false

  async unexpectedErrorProcessingRequest({ requestContext, error, }: { requestContext: GraphQLRequestContext<FCContext>; error: Error; }): Promise<void> {
    logger.error('Invalid request:', error)
  }

  async invalidRequestWasReceived({ error }: { error: Error; }): Promise<void> {
    logger.error('Invalid request:', error)
  }

  async requestDidStart(requestContext: GraphQLRequestContext<FCContext>): Promise<void | GraphQLRequestListener<FCContext>> {
    if (!this.hasInit) {
      throw new Error('FCAuthPlugins not initialized')
    }
    this.requestDidStart = this._requestDidStart
    return this._requestDidStart(requestContext)
  }

  async _requestDidStart(requestContext: GraphQLRequestContext<FCContext>): Promise<void | GraphQLRequestListener<FCContext>> {
    const {
      contextValue: apolloContext,
      request: {
        variables: requestVariables,

      },
    } = requestContext;
    return {
      async validationDidStart(requestContext) {
        // console.log(
        //   requestContext.request.operationName, 
        //   requestContext.request.variables,
        //   requestContext.request.query,
        //   )
      },
      async didResolveOperation(requestContext) {
        // extract token from headers
        const token = apolloContext.token;

        if (!token) {
          throw new Error('No token');
        } else {
          console.log('Token:', token);
          console.log(requestVariables)
          requestContext.operation?.selectionSet.selections.forEach((selection) => {
            // @ts-ignore
            const { arguments: args, name, kind } = selection as any;

            console.log(name.value)
            // console.log(kind)
          })
        }
      },
    };
  }
}

function handleValue(argValue, requestVariables) {
  const {
    kind,
  } = argValue;
  let val;

  switch (kind) {
    case 'IntValue':
      val = argValue.value;
      break;

    case 'StringValue':
      val = argValue.value;
      break;

    case 'Variable':
      val = requestVariables[argValue.name.value];
      break;

    default:
      // If I haven't come across it yet, hopefully it just works...
      val = argValue.value;
      break;
  }

  return val;
}

function flattenArgs(apolloArgs, requestVariables) {
  const args = {};

  apolloArgs.forEach((apolloArg) => {
    console.log(JSON.stringify(apolloArg, null, 2));
    const {
      kind,
      name: {
        value: argName,
      },
      value: argValue,
    } = apolloArg;

    switch (kind) {
      case 'Argument':
        args[argName] = handleValue(argValue, requestVariables);
        break;

      default:
        break;
    }
  });

  return args;
}