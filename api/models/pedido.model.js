// function validator (val) {
//     return val == 'something';
//   }
//   new Schema({ 
//       name: { 
//           type: String, 
//           validate: validator 
//         }
//     });



//import Promise from 'bluebird';
const mongoose = require('mongoose');
//import httpStatus from 'http-status';
//import APIError from '../helpers/APIError';



const Schema = mongoose.Schema;

const Produto = require('./produto.model');

/**
 * User Schema
 */
const PedidoSchema = new Schema({
    cliente: {
      type: String,
      required: true
    },
    item: [Produto.schema]
  },
  {
    timestamps: {
      createdAt: 'cadastrado',
      updatedAt: 'alterado'
    }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
PedidoSchema.method({'cria' : function (id) {
  return this.findById(id)
  .exec()
  .then((pedido) => {
    if (pedido) {
      return pedido;
    }
    const err = new Error('Pedido não existe');
    return Promise.reject(err);
  });
}
});

/**
 * Statics
 */
PedidoSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, Error>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((pedido) => {
        if (pedido) {
          return pedido;
        }
        const err = new Error('Pedido não existe');
        return Promise.reject(err);
      });
  },

  /**
   * Lista os usuarios em ordem descrescente pelo campo 'cadastro'.
   * @param {number} skip - Numero de cadastro para pular.
   * @param {number} limit - Limite de cadastros para retornar.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ cadastro: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
 }
//  list(){
//    return this.find()
//     .exec();
//  }
};

/**
 * @typedef User
 */
module.exports = mongoose.model('Pedido', PedidoSchema);