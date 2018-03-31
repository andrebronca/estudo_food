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

/**
 * User Schema
 */
const ProdutoSchema = new Schema({
    descricao: {
      type: String,
      required: true
    },
    ativo: {
      type: String,
      required: true,
      enum: ['s','n'],
      default: 's'
    },
    preco: {
      type: Number,
      default: 0.00
    }
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
ProdutoSchema.method({
});

/**
 * Statics
 */
ProdutoSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, Error>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((produto) => {
        if (produto) {
          return produto;
        }
        const err = new Error('Produto não existe');
        return Promise.reject(err);
      });
  },

  /**
   * Lista os produtos em ordem descrescente pelo campo 'cadastro'.
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
module.exports = mongoose.model('Produto', ProdutoSchema);