import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { AuthenticationError } from 'apollo-server-express';
import { defaultFieldResolver, GraphQLSchema } from 'graphql';
import { verify } from 'jsonwebtoken';
import { jwtConstants } from 'src/utils/constants';

export function authDirectiveTransformer(
  schema: GraphQLSchema,
  directiveName: string,
) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: fieldConfig => {
      const authDirective = getDirective(
        schema,
        fieldConfig,
        directiveName,
      )?.[0];

      if (authDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;

        // Replace the original resolver with a function that *first* calls
        // the original resolver, then converts its result to upper case
        fieldConfig.resolve = async function (source, args, context, info) {
          const { token, dataSources } = context;
          console.log(token)
          console.log(dataSources.userService.findByEmail("826812055@qq.com"))

          // if (!token) {
          //   throw new AuthenticationError("没有token令牌");
          // }

          // try {
          //   const decodeData: any = await verify(token, jwtConstants.secret);
          //   console.log(decodeData)
          //   const user = await dataSources.users.findById(decodeData.userId);
          //   context.user = user;
           
          // } catch (error) {
          //   throw new AuthenticationError("未授权");
          // }

          const result = await resolve(source, args, context, info);

          return result;
        };
        return fieldConfig;
      }
    },
  });
}
