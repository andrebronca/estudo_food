const mongoose = require('mongoose');

const Schema = mongoose.Schema;
/**
 * User Schema
 */
const PedidoSchema = new Schema({
    cliente: {
      type: String,
      required: true
    },
    item: [{ 
        //_id : false, //mais facil de encontrar criando um id por registro
        produto: {
            type: Schema.Types.ObjectId,
            ref: 'Produto'
        },
        quantidade: {
          type: Number,
          required: true
        },
        valor_unitario:{
          type: Number,
          required: true
        },
        valor_total:{
          type: Number,
          required: true
        }
    }],
    valor: {
      type: Number,
      required: true
    },
    mesa: {
      type: Schema.Types.ObjectId,
      ref: 'Mesa',
      required: true
    },
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
PedidoSchema.method({
  'cria' : function (dados) {
  return this.model('Pedido').create(dados)
    .then((pedido) => {
      if (pedido) {
        return pedido;
      }
      const err = new Error('Pedido não existe');
      return Promise.reject(err);
    });
  },
  'teste' : function () {
    return this.model('Pedido').find()
    // .exec()
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
  list({ skip = 0, limit = 50 , pedidos} = {}) {
    return this.find({ '_id': pedidos
    })
      .populate('item.produto',['descricao'])
      .populate('mesa',['descricao'])
      .sort({ cadastro: -1 })
      .skip(+skip)
      .limit(+limit)
      //.select("item cliente valor cadastrado alterado")
      .select({'__v':0})
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