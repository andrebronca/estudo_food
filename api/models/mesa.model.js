const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * User Schema
 */
const MesaSchema = new Schema({
    descricao: {
      type: String,
      required: true
    },
    pedido:[{
      type: Schema.Types.ObjectId,
      ref: 'Pedido'
    }],
    ativo: {
      type: String,
      required: true,
      enum: ['s','n'],
      default: 's'
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
        const err = new Error('Mesa não existe');
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
      .select({'__v':0})
      .populate({
        'path':'pedido', 
        'model': 'Pedido',
        'select': {'__v':0}, 
        'populate':{
          'path':'item.produto',
          'model': 'Produto',
          'select':{
            'descricao': 1
          }
        }
      })
      .sort({ cadastro: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
 }
};

/**
 * @typedef User
 */
module.exports = mongoose.model('Mesa', MesaSchema);