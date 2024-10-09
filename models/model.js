const { generateKey } = require('crypto')
const sequelize = require('../database')
const {DataTypes} = require('sequelize')
const uuid = require('uuid')

// id_user во всех таблицах, кроме User, является айдишкой получателя. Другие айдишки, связанные с пользователём - отправитель.

const User = sequelize.define('users',{
  id_user: {type: DataTypes.UUID, primaryKey: true, defualtValue: uuid.v4()},
  surname: {type: DataTypes.STRING},
  name: {type: DataTypes.STRING},
  patronymic: {type: DataTypes.STRING},
  phone: {type: DataTypes.STRING},
  email: {type: DataTypes.STRING},
  password: {type: DataTypes.STRING},
  type_account: {type: DataTypes.STRING, defaultValue: "player"},
  status: {type: DataTypes.STRING, defaultValue: "unblocked"},
  wallet: {type: DataTypes.FLOAT, defaultValue: 0}
}, {updatedAt: false})

const Game = sequelize.define('games', {
  id_game: {type: DataTypes.UUID, primaryKey: true, defualtValue: uuid.v4()},
  name: {type: DataTypes.STRING, unique: true},
  description: {type: DataTypes.STRING},
  genre: {type: DataTypes.STRING},
  poster: {type: DataTypes.STRING},
  price: {type: DataTypes.FLOAT},
  link_download: {type: DataTypes.STRING},
  date_publication: {type: DataTypes.DATE, defaultValue: new Date()}
}, {updatedAt: false})

const VirtualServer = sequelize.define('virtual_servers', {
  id_server: {type: DataTypes.UUID, primaryKey: true, defualtValue: uuid.v4()},
  ip_address: {type: DataTypes.STRING},
  mac_address: {type: DataTypes.STRING},
  free_space: {type: DataTypes.BIGINT}, //данные хранятся в битах
  RAM: {type: DataTypes.FLOAT},
  traffic_capacity: {type: DataTypes.FLOAT}
}, {updatedAt: false})

const Friend = sequelize.define('friends', {
  id_relation: {type: DataTypes.UUID, primaryKey: true, defualtValue: uuid.v4()},
  id_user: {type: DataTypes.UUID, references: {model: User, key: 'id_user'}},
  id_friend: {type: DataTypes.UUID, references: {model: User, key: 'id_user'}},
}, {updatedAt: false})

const RequestToFriend = sequelize.define('requests_to_friend', {
  id_request: {type: DataTypes.UUID, primaryKey: true, defualtValue: uuid.v4()}, // БЛЯТЬ ЗАЕБАЛО
})


module.exports={
  User,
  Product,
  Warehouse,
  Category,
  Basket_Product,
  Order
}