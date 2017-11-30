/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const StockItemType = new ObjectType({
  name: 'StockItem',
  fields: {
    title: { type: new NonNull(StringType) },
    link: { type: new NonNull(StringType) },
    author: { type: StringType },
    pubDate: { type: new NonNull(StringType) },
    content: { type: StringType },
  },
});

// const StockItemType = new ObjectType({
//   name: 'StockItemType',
//   fields: {
//     posts: {
//       type: new GraphQLList(PostType),
//       args: {},
//       async resolve (parentValue, args) {
//         const posts = await fetch('https://jsonplaceholder.typicode.com/posts')
//         return posts.json()
//       }
//     }
//   }
// });

export default StockItemType;
