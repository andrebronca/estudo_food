const Produto = require('../models/produto.model');

/**
 * Load produto and append to req.
 */
function load(req, res, next, id) {
  Produto.get(id)
    .then((produto) => {
      req.produto = produto; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get produto
 * @returns {Produto}
 */
function get(req, res) {
  return res.json(req.produto);
}

/**
 * Cria uma nova produto
 * @property {string} req.body.descricao - Descrição produto.
 * @property {string} req.body.cor - Cor da produto.
 * @returns {Produto}
 */
function create(req, res, next) {
  const produto = new Produto({
    descricao: req.body.descricao,
    // Toda produto fica ativa como padrão
    //ativo: req.body.ativo,
    preco: req.body.preco
  });

  produto.save()
    .then(savedProduto => res.json(savedProduto))
    .catch(e => next(e));
}

/**
 * Atualiza uma nova produto
 * @property {string} req.body.descricao - Descrição produto.
 * @property {string} req.body.ativo - Status da produto.
 * @property {string} req.body.cor - Cor da produto.
 * @returns {Produto}
 */
function update(req, res, next) {
  const produto = req.produto;
  produto.descricao = req.body.descricao;
  //Altera somente para desativado (exclui), não atualiza
  //produto.ativo = req.body.ativo;
  produto.preco = req.body.preco;

  produto.save()
    .then(savedProduto => res.json(savedProduto))
    .catch(e => next(e));
}

/**
 * Get produto list.
 * @property {number} req.query.skip - Number of produtos to be skipped.
 * @property {number} req.query.limit - Limit number of produtos to be returned.
 * @returns {Produto[]}
 */
function list(req, res, next) {
  var { limit = 50, skip = 0, fields = 0, order, filter} = req.query;
//fields
  fields = fields.replace(/,/g,' ');
//order
  order = order.split(',');
  prefix = 1;
  orderNew = {};
  order.forEach(element => {
    if (element.match(/-/)){
      prefix = -1;
    } 
    campo = element.replace(/-|\s/g, '');
    
    orderNew[campo] = prefix;
    prefix = 1;
  })
  order = orderNew;    

//filter
  filter = filter.replace(/\[|\]/g, '');
  filter = filter.split(',');

  filtro = {};
  filter.forEach((element, index) => {

   element = element.split('=');
    filtro[element[0]] =  element[1];
  });

  filter = filtro;

  console.log(order);
   
  Produto.list({ limit, skip, fields, order, filter})
    .then(produtos => res.json(produtos))
    .catch(e => next(e));
}

// /**
//  * Apaga produto.
//  * @returns {Categoria}
//  */
// function remove(req, res, next) {
//   const produto = req.produto;
//   produto.remove()
//     .then(deletedCategoria => res.json(deletedCategoria))
//     .catch(e => next(e));
// }

/**
 * Desativa uma nova produto.
 * @returns {Categoria}
 */
function desativa(req, res, next) {
  const produto = req.produto;
  //produto.descricao = req.body.descricao;
  produto.ativo = 'n';
  //sproduto.cor = req.body.cor;

  produto.save()
    .then(savedCategoria => res.json(savedCategoria))
    .catch(e => next(e));
}


module.exports = { load, get, create, update, list, desativa };