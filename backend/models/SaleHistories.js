import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const SaleHistory = sequelize.define('SaleHistory', {
  history_id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  sale_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Sales',
      key: 'sale_id',
    },
  },
  previous_status_id: {
    type: DataTypes.INTEGER(11)
  },
  new_status_id: {
    type: DataTypes.INTEGER(11)
  },
  sale_status_reason_id: {
    type: DataTypes.INTEGER(11),
    references: {
      model: 'SaleStatusReason',
      key: 'sale_status_reason_id',
    },
  },
  modified_by_user_id: {
    type: DataTypes.INTEGER(11),
    allowNull: true,
    references: {
      model: 'User',
      key: 'user_id',
    },
  },
  modification_date: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  },
  is_priority: {
    type: DataTypes.INTEGER(1),
    allowNull: false,
    defaultValue: 0,
  },
  date_type: {
    type: DataTypes.ENUM('Prioridad', 'Ingresado', 'Validado', 'Activo', 'Anulado', 'No Prioridad'),
  },
  date: {
    type: DataTypes.DATE,
  },
  priority_modified_by_user_id: {
    type: DataTypes.INTEGER(11),
    allowNull: true,
    references: {
      model: 'User',
      key: 'user_id',
    },
  },
}, {
  tableName: 'salehistories',
  timestamps: false,
});

export default SaleHistory;