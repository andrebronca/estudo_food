const Titulo = require('../models/titulo.model');

/**
 * Load titulo and append to req.
 */
function load(req, res, next, id) {
  Titulo.get(id)
    .then((titulo) => {
      req.titulo = titulo; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get titulo
 * @returns {Titulo}
 */
function get(req, res) {
  return res.json(req.titulo);
}

/**
 * Cria uma nova titulo
 * @property {string} req.body.descricao - Descrição titulo.
 * @property {string} req.body.cor - Cor da titulo.
 * @returns {Titulo}
 */
function create(req, res, next) {
  const titulo = new Titulo({
    descricao: req.body.descricao,
    //Altera somente para desativado (exclui), não atualiza
    //ativo: req.body.ativo,
    total_parcela: req.body.total_parcela,
    categoria: req.body.categoria,
    emissao: req.body.emissao,
    valor: req.body.valor
  });

  titulo.save()
    .then(savedTitulo => res.json(savedTitulo))
    .catch(e => next(e));

}

/**
 * Atualiza uma nova titulo
 * @property {string} req.body.descricao - Descrição titulo.
 * @property {string} req.body.ativo - Status da titulo.
 * @property {string} req.body.cor - Cor da titulo.
 * @returns {Titulo}
 */
function update(req, res, next) {
  const titulo = req.titulo;
  titulo.descricao = req.body.descricao;
  //Altera somente para desativado (exclui), não atualiza
  //titulo.ativo = req.body.ativo;
  titulo.total_parcelas = req.body.total_parcelas;
  titulo.categoria = req.body.categoria;
  titulo.emissao = req.body.emissao;
  titulo.valor = req.body.valor;

  titulo.save()
    .then(savedTitulo => res.json(savedTitulo))
    .catch(e => next(e));
}

/**
 * Get titulo list.
 * @property {number} req.query.skip - Number of titulos to be skipped.
 * @property {number} req.query.limit - Limit number of titulos to be returned.
 * @returns {Titulo[]}
 */
function list(req, res, next) {
  // const { limit = 50, skip = 0 } = req.query;
  // Titulo.list({ limit, skip })
  //   .then(titulos => res.json(titulos))
  //   .catch(e => next(e));
  Titulo.find()
    .populate('categoria',['descricao','cor'])
    .exec()
    .then( titulo => res.json(titulo))
    .catch(e => next(e));
}

// /**
//  * Apaga titulo.
//  * @returns {Titulo}
//  */
// function remove(req, res, next) {
//   const titulo = req.titulo;
//   titulo.remove()
//     .then(deletedTitulo => res.json(deletedTitulo))
//     .catch(e => next(e));
// }

/**
 * Desativa uma nova titulo.
 * @returns {Titulo}
 */
function desativa(req, res, next) {
  const titulo = req.titulo;
  //titulo.descricao = req.body.descricao;
  titulo.ativo = 'n';
  //stitulo.cor = req.body.cor;

  titulo.save()
    .then(savedTitulo => res.json(savedTitulo))
    .catch(e => next(e));
}


module.exports = { load, get, create, update, list, desativa };