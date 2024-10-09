const { generateKey } = require('crypto')
const sequelize = require('../database')
const {DataTypes, DATE} = require('sequelize')
const uuid = require('uuid')
const database = require('../database')
const { serialize } = require('v8')

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
  id_user: {type: DataTypes.UUID, references: {model: Users, key: 'id_user'}},
  id_friend: {type: DataTypes.UUID, references: {model: Users, key: 'id_user'}},
}, {updatedAt: false})

const RequestToFriend = sequelize.define('requests_to_friend', {
  id_request: {type: DataTypes.UUID, primaryKey: true, defualtValue: uuid.v4()},
  id_user: {type: DataTypes.UUID, references: {model: Users, key: 'id_user'}},
  id_mb_friend: {type: DataTypes.UUID},
  status: {type: DataTypes.STRING},
  date_request: {type: DataTypes.DATE, defaultValue: new Date()}
})

const Chat = sequelize.define('chat', {
  id_chat: {type: DataTypes.UUID, primaryKey: true, defualtValue: uuid.v4()},
  id_user: {type: DataTypes.UUID, references: {model: Users, key: 'id_user'}},
  id_friend: {type: DataTypes.UUID, references: {model: Users, key: 'id_user'}},
}, {updatedAt: false})

const Messages = sequelize.define('messages', {
  id_message: {type: DataTypes.UUID, primaryKey: true, defualtValue: uuid.v4()},
  id_user: {type: DataTypes.UUID, references: {model: Users, key: 'id_user'}},
  text_message: {type: DataTypes.STRING,},
  id_chat: {type: DataTypes.UUID, references: {model: Chat, key: 'id_chat'}}
})

const CommentsGame = sequelize.define('comments_game', {
  id_comment: {type: DataTypes.UUID, primaryKey: true, defualtValue: uuid.v4()},
  id_user: {type: DataTypes.UUID, references: {model: Users, key: 'id_user'}},
  id_game: {type: DataTypes.UUID, references: {model: Games, key: 'id_game'}},
  estimate: {type: DataTypes.UUID, defaultValue: 0},
  text_comment: {type: DataTypes.STRING},
  like_comment: {type: DataTypes.STRING},
  dislike_comment: {type: DataTypes.STRING},
  date_time_creation: {type: DataTypes.DATE, defaultValue: new Date()}
})

const CommentsProfile = sequelize.define('comments_profile',{
  id_comment_profile: {type: DataTypes.UUID, primaryKey: true, defualtValue: uuid.v4()},
  id_user_send: {type: DataTypes.UUID, references: {model: Users, key: 'id_user'}},
  id_user_get: {type: DataTypes.UUID, references: {model: Users, key: 'id_user'}},
  text_comment: {type: DataTypes.STRING},
  like_comment: {type: DataTypes.STRING},
  dislike_comment: {type: DataTypes.STRING},
  date_time_creation: {type: DataTypes.DATE, defaultValue: new Date()}
})

const Library = sequelize.define('library', {
  id_game_user: {type: DataTypes.UUID, primaryKey: true, defualtValue: uuid.v4()},
  id_game: {type: DataTypes.UUID, references: {model: Games, key: 'id_game'}},
  id_user: {type: DataTypes.UUID, references: {model: Users, key: 'id_user'}},
  hours_game: {type: DataTypes.TIME, defaultValue: 0},
  last_session: {type: DataTypes.DATE, defaultValue: 0}
})

const GameDeveloper = sequelize.define('game_developers', {
  id_developer: {type: DataTypes.UUID, primaryKey: true, defualtValue: uuid.v4()},
  id_game: {type: DataTypes.UUID, references: {model: Games, key: 'id_game'}},
  id_server: {type: DataTypes.UUID, references: {model: VirtualServer, key: 'id_server'}},
  id_user: {type: DataTypes.UUID, references: {model: Users, key: 'id_user'}}
})

const TechnicalRequest = sequelize.define('technical_requests', {
  id_request: {type: DataTypes.UUID, primaryKey: true, defualtValue: uuid.v4()},
  id_user: {type: DataTypes.UUID, references: {model: Users, key: 'id_user'}},
  type_request: {type: DataTypes.STRING},
  text_request: {type: DataTypes.STRING},
  date_time_creation: {type: DataTypes.DATE, defaultValue: new Date()},
  status_request: {type: DataTypes.STRING, defaultValue: 'Новая'}
})


module.exports={
  User, Game, VirtualServer, Friend, RequestToFriend, Chat, Messages, CommentsGame, CommentsProfile, Library,
  GameDeveloper, TechnicalRequest
}