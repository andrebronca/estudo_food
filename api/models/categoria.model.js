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
const CategoriaSchema = new Schema({
    descricao: {
      type: String,
      required: true
    },
    tipo: {
      type: String,
      required: true,
      enum: ['d', 'r']
    },
    ativo: {
      type: String,
      required: true,
      enum: ['s','n'],
      default: 's'
    },
    cor: {
      type: String,
      default: 'preto'
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
CategoriaSchema.method({
});

/**
 * Statics
 */
CategoriaSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, Error>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((categoria) => {
        if (categoria) {
          return categoria;
        }
        const err = new Error('Categoria não existe');
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
module.exports = mongoose.model('Categoria', CategoriaSchema);