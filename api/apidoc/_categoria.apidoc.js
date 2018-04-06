/**
 * @apiDefine SucessoCategoria
 * 
 * @apiSuccess {Object} id         Id objeto da categoria.
 * @apiSuccess {String} descricao  Descrição da categoria.
 * @apiSuccess {String} ativo      Status categoria.
 * @apiSuccess {String} cor        Cor da categoria.
 * @apiSuccess {Date}   cadastro   Descrição da categoria.
 * @apiSuccess {Date}   alterado   Descrição da categoria.
 *  
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *        "_id": "5ab6a6fea34bb00ad43cfecf",
 *        "descricao": "Aluguel",
 *        "ativo": "s",
 *        "cor": "preto",
 *        "cadastro": "2018-03-24T19:29:02.324Z",
 *        "alterado": "2018-03-24T19:29:02.324Z",
 *        "__v": 0
 *       }
 *     ]
 */

 /**
 * @apiDefine CategoriaErro
 *
 * @apiError NoAccessRight Only authenticated Admins can access the data.
 * @apiError UserNameTooShort Minimum of 5 characters required.
 *
 * @apiErrorExample  Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "UserNameTooShort"
 *     }
 */


 /**
 * @apiDefine UrlExemploID
 * 
 * @apiExample {curl} Example usage:
 *   curl -i http://localhost:5000/api/v1/categoria/5ab6a6fea34bb00ad43cfecf
 */

 /**
 * @apiDefine UrlExemplo
 * 
 * @apiExample {curl} Example usage:
 *   curl -i http://localhost:5000/api/v1/categoria
 */

/**
 * @apiDefine ParametrosCategoria
 * 
 * @apiParam {String} descricao  Descrição da categoria.
 * @apiParam {String} cor        Cor da categoria.
 *
 //* @apiParam (Login) {String} pass Only logged in users can post this.
 //*                                 In generated documentation a separate
 //*                                 "Login" Block will be generated.
 */

// ------------------------------------------------------------------------------------------
// Get List Categoria
// ------------------------------------------------------------------------------------------

 /**
 * 
 * @api {get} /categoria Busca as categorias
 * @apiVersion 0.1.0
 * @apiName  GetListCategoria
 * @apiGroup Categoria
 * 
 * @apiDescription In this case "apiUse" is defined and used.
 * Define blocks with params that will be used in several functions, so you dont have to rewrite them.
 * 
 * @apiUse SucessoCategoria
 * 
 * @apiUse CategoriaErro
 * 
 * @apiUse UrlExemplo
 * 
 * 
 */

// ------------------------------------------------------------------------------------------
// Get List Categoria ID
// ------------------------------------------------------------------------------------------

 /**
 * @api {get} /categoria/:id Busca categoria ID
 * @apiVersion 0.1.0
 * @apiName  GetCategoriaId
 * @apiGroup Categoria
 * 
 * @apiUse SucessoCategoria
 * 
 * @apiUse CategoriaErro
 * 
 * @apiUse UrlExemploID
 * 
 */

// ------------------------------------------------------------------------------------------
// Post Criar categoria
// ------------------------------------------------------------------------------------------ 

 /**
 * @api {post} /categoria Cria nova categoria
 * @apiVersion 0.1.0
 * @apiName   CreateCategoria
 * @apiGroup  Categoria
 * 
 * @apiUse ParametrosCategoria
 * 
 * @apiUse SucessoCategoria
 * 
 * @apiUse CategoriaErro
 * 
 * @apiUse UrlExemplo
 * 
 */

// ------------------------------------------------------------------------------------------
// Put Atuliza categoria
// ------------------------------------------------------------------------------------------ 

 /**
 * @api {put} /categoria Altera categoria
 * @apiVersion 0.1.0
 * @apiName   UpdateCategoria
 * @apiGroup  Categoria
 * 
 * @apiUse ParametrosCategoria
 * 
 * @apiUse SucessoCategoria
 * 
 * @apiUse CategoriaErro
 * 
 * @apiUse UrlExemploId
 * 
 */

// ------------------------------------------------------------------------------------------
// Deleta Categoria
// ------------------------------------------------------------------------------------------ 

 /**
 * @api {delete} /categoria/:id Deleta categoria
 * @apiVersion 0.1.0
 * @apiName   DesativaCategoria
 * @apiGroup  Categoria
 * 
 * @apiUse ParametrosCategoria
 * 
 * @apiUse SucessoCategoria
 * 
 * @apiUse CategoriaErro
 * 
 * @apiUse UrlExemploId
 * 
 */