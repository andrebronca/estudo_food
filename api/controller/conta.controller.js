const Conta = require('../models/conta.model');

/**
 * Load conta and append to req.
 */
function load(req, res, next, id) {
  Conta.get(id)
    .then((conta) => {
      req.conta = conta;
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get conta
 * @returns {Conta}
 */
function get(req, res) {
  return res.json(req.conta);
}

/**
 * Cria uma nova conta
 * @property {string} req.body.descricao - Descrição conta.
 * @property {string} req.body.cor - Cor da conta.
 * @returns {Conta}
 */
function create(req, res, next) {
  const conta = new Conta({
    descricao: req.body.descricao,
    // Toda conta fica ativa como padrão
    //ativo: req.body.ativo,
    cor: req.body.cor
  });

  conta.save()
    .then(savedConta => res.json(savedConta))
    .catch(e => next(e));
}

/**
 * Atualiza uma nova conta
 * @property {string} req.body.descricao - Descrição conta.
 * @property {string} req.body.ativo - Status da conta.
 * @property {string} req.body.cor - Cor da conta.
 * @returns {Conta}
 */
function update(req, res, next) {
  const conta = req.conta;
  conta.descricao = req.body.descricao;
  conta.ativo = req.body.ativo;
  conta.cor = req.body.cor;

  conta.save()
    .then(savedConta => res.json(savedConta))
    .catch(e => next(e));
}

/**
 * Get conta list.
 * @property {number} req.query.skip - Number of contas to be skipped.
 * @property {number} req.query.limit - Limit number of contas to be returned.
 * @returns {Conta[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Conta.list({ limit, skip })
    .then(contas => res.json(contas))
    .catch(e => next(e));
}

// /**
//  * Apaga conta.
//  * @returns {Conta}
//  */
// function remove(req, res, next) {
//   const conta = req.conta;
//   conta.remove()
//     .then(deletedConta => res.json(deletedConta))
//     .catch(e => next(e));
// }

/**
 * Desativa uma nova conta.
 * @returns {Conta}
 */
function desativa(req, res, next) {
  const conta = req.conta;
  //conta.descricao = req.body.descricao;
  conta.ativo = 'n';
  //sconta.cor = req.body.cor;

  conta.save()
    .then(savedConta => res.json(savedConta))
    .catch(e => next(e));
}


module.exports = { load, get, create, update, list, desativa };