class Counter {
    constructor () {
      this.value = 0
    }
    increase () {
      this.value += 1
      return this // Aqui!
    }
    decrease () {
      this.value -= 1
      return this // Aqui!
    }
    log () {
      console.log(this.value)
      return this // E aqui!
    }
 }

// new Counter()
// .increase()
// .log() // => 1



  function criarPessoa(nome) {
    return {
        nome: nome,
        idade: 25,
        alterarNome: function(nome) {
            this.nome = nome;
            return this;
        },
        alterarIdade: function(idade) {
            this.idade = idade;
            return this;
        }
    };
}

//var pessoa = criarPessoa("Maria").alterarIdade(30).alterarNome("Paulo");
//console.log("Nome: " + pessoa.nome + "; Idade: " + pessoa.idade);

function douglas(){
    return "douglas"
}
var test = "teste"
var a = {
    "name": "a"
}

a = JSON.parse(JSON.stringify(a))
console.log(a)