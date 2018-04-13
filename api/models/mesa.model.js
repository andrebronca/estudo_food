const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Pedido = require('./pedido.model');

/**
 * User Schema
 */
const MesaSchema = new Schema({
    descricao: {
      type: String,
      required: true
    },
    pedido:{
      type: Pedido.schema
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
MesaSchema.method({'cria' : function (id) {
  return this.findById(id)
  .exec()
  .then((mesa) => {
    if (mesa) {
      return mesa;
    }
    const err = new Error('Pedido não existe');
    return Promise.reject(err);
  });
}
});

/**
 * Statics
 */
MesaSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, Error>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((mesa) => {
        if (mesa) {
          return mesa;
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
module.exports = mongoose.model('Mesa', MesaSchema);