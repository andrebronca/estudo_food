const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * User Schema
 */
const ContaSchema = new Schema({
    descricao: {
      type: String,
      required: true
    },
    saldo: {
      type: Number,
      required: true,
      default: 0
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
ContaSchema.method({
});

/**
 * Statics
 */
ContaSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - O objectId da conta.
   * @returns {Promise<User, Error>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((conta) => {
        if (conta) {
          return conta;
        }
        const err = new Error('Conta não existe');
        return Promise.reject(err);
      });
  },

  /**
   * Lista os contas em ordem descrescente pelo campo 'cadastro'.
   * @param {number} skip - Numero de cadastros para pular.
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
 * @typedef Conta
 */
module.exports = mongoose.model('Conta', ContaSchema);