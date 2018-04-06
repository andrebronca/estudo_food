const mongoose = require('mongoose');

const Schema = mongoose.Schema;


/**
 * User Schema
 */
const TituloSchema = new Schema({
    descricao: {
      type: String,
      required: true
    },
    total_parcelas: {
      type: Number,
      required: true,
      default: 1
    },
    emissao: {
      type: Date,
      required: true
    },
    valor: {
      type: Number,
      required: true
    },
    ativo: {
      type: String,
      required: true,
      enum: ['s','n'],
      default: 's'
    },
    categoria: {
      type: Schema.Types.ObjectId,
      ref: 'Categoria'
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
TituloSchema.method({
});

/**
 * Statics
 */
TituloSchema.statics = {
  /**
   * Get titulo
   * @param {ObjectId} id - O objectId do titulo.
   * @returns {Promise<User, Error>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((titulo) => {
        if (titulo) {
          return titulo;
        }
        const err = new Error('Titulo não existe');
        return Promise.reject(err);
      });
  },

  /**
   * Lista os titulos em ordem descrescente pelo campo 'cadastro'.
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
};

/**
 * @typedef Titulo
 */
module.exports = mongoose.model('Titulo', TituloSchema);