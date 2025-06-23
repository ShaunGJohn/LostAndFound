/*'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    static associate(models) {
      // You can define associations here if needed
    }
  }
  Request.init({
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lostItemId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    foundItemId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
    },
  }, {
    sequelize,
    modelName: 'Request',
    tableName: 'Requests',
    timestamps: true,
  });

  return Request;
};
*/

// server/models/Request.js
/*const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Request = sequelize.define('Request', {
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  receiverId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  lostItemId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  foundItemId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending'
  }
}, {
  tableName: 'Requests',
  timestamps: true
});

module.exports = Request;
*/


// ✅ Updated models/request.js
/*
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Request = sequelize.define('Request', {
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  receiverId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  lostItemId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  foundItemId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending'
  }
}, {
  tableName: 'Requests',
  timestamps: true
});

module.exports = Request;
*/

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Request extends Model {
  // ✅ Define associations here
  static associate(models) {
    Request.belongsTo(models.User, {
      as: 'sender',
      foreignKey: 'senderId'
    });

    Request.belongsTo(models.LostItem, {
      as: 'lostItem',
      foreignKey: 'lostItemId'
    });

    Request.belongsTo(models.FoundItem, {
      as: 'foundItem',
      foreignKey: 'foundItemId'
    });
  }
}

Request.init({
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  receiverId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  lostItemId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  foundItemId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending'
  }
}, {
  sequelize,
  modelName: 'Request',
  tableName: 'Requests',
  timestamps: true
});

module.exports = Request;
