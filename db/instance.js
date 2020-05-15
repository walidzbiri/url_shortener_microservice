const config= require('../knexfile');
const environment = process.env.NODE_ENV || 'development';
const knex = require('knex')(config[environment]);

module.exports=knex;