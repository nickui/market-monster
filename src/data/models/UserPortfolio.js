/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import DataType from 'sequelize';
import Model from '../sequelize';
import UserProfile from './UserProfile';

const UserPortfolio = Model.define('UserPortfolio', {
  userId: {
    type: UserProfile.DataType.UUID,
    primaryKey: true,
  },

  displayName: {
    type: UserProfile.DataType.displayName,
  },

  bankBalance: {
    type: DataType.INTEGER(),
  },

  stockValue: {
    type: DataType.INTEGER(),
  },
});

export default UserPortfolio;
