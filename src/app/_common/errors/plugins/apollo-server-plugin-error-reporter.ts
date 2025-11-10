/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApolloServerPlugin, GraphQLRequestContextDidEncounterErrors, GraphQLRequestListener } from '@apollo/server';
import { GraphQLError } from 'graphql';
import Container from 'typedi';

import { IRequesterContext } from '@interfaces/requester-context.interface';
import { ApolloServerErrorCode } from '@apollo/server/errors';
import { ArgumentValidationError } from 'type-graphql';
import { ErrorCode } from '../constants/error-codes.enum';

export const ApolloServerPluginErrorReporter: ApolloServerPlugin<IRequesterContext> = {
  requestDidStart(): Promise<GraphQLRequestListener<IRequesterContext>> {
    return Promise.resolve({
      didEncounterErrors(requestContext: GraphQLRequestContextDidEncounterErrors<IRequesterContext>) {
        // const errorReporter = Container.get(ErrorReporter);
        requestContext.errors.forEach((error) => {
          // errorReporter.reportApolloError(error, requestContext);
          const { contextValue } = requestContext;
          translateErrorMessage(error, contextValue);
          if (!contextValue.isSystemAdmin) hideDetailsForNonSystemAdmin(error, contextValue);
        });
        return Promise.resolve();
      }
    });
  }
};

// eslint-disable-next-line n/handle-callback-err
function translateErrorMessage(error: GraphQLError, context: IRequesterContext): void {
  // Not implemented yet
}

function hideDetailsForNonSystemAdmin(error: GraphQLError, context: IRequesterContext): void {
  if (error.originalError instanceof GraphQLError) {
    hideDetailsForNonSystemAdmin(error.originalError, context);
    return;
  }

  if (!shouldShowMessage(error)) {
    error.message = 'Ooops! Something went wrong. Please try again later.';
    error.extensions.code = ErrorCode.SomethingWentWrong;
  }
}

function shouldShowMessage(error: GraphQLError): boolean {
  const { name } = Object.getPrototypeOf(error).constructor;
  const { originalError, extensions } = error;

  const isValidationError =
    name === 'ArgumentValidationError' || name === 'ValidationError' || extensions?.code === ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED;
  const isArgumentValidationError = originalError instanceof ArgumentValidationError;
  const isNotInternalErrorWithCode =
    typeof extensions.code === 'string' && extensions.code !== ErrorCode.InternalServerError && 'internal' in error && error.internal === false;

  return isValidationError || isArgumentValidationError || isNotInternalErrorWithCode;
}
