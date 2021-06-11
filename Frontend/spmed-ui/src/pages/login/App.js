import React, { Component } from 'react';
import axios from 'axios';
import {parseJwt , usuarioAutenticado} from "../../services/auth";

class App extends Component {
    constructor(props){
      super(props);
      this.state = {
        email : '',
        senha : '',
        erroMensagem : '',
        isLoading : false
      }
    };
efetuaLogin =(event) => {
  // Ignora o comportamento padrao do navegador (recarregar)

  event.preventDefault();

  this.setState ({ erroMensagem: '', isLoading: true })

  // Define a url e o corpo da requisição
  axios.post("http://localhost:5000/api/login", {
    email : this.state.email,
    senha : this.state.senha
  })
  
  // Verifica o retorno da requisição
  .then(resposta =>{
    // Caso o status code seja 200, 
    if (resposta.status === 200){
      // salva o valor do token no localStorage
      localStorage.setItem('login', resposta.data.token)

      console.log(resposta.data.token)

      this.setState({ isLoading: false})

      // // define a var base64 que vai receber o payload do token
      // let base64 = localStorage.getItem('login').split('.')[1];

      // // Exibe no console o vakor decodificado de base64 paara string
      // console.log(window.atob(base64));

      // // Exibe no console o valor convertido de string para json
      // console.log(JSON.parse(window.atob(base64)))

      // // Exibe no console apenas o valor do tipo de usuariovconvertido de string para json
     // console.log(JSON.parse(window.atob(base64)).role)

     console.log(parseJwt());

     // Se for um paciente, redireciona para a pagina de paciente
    //  if(parseJwt().role === "3"){
    //    this.props.history.push('/paciente')
    //  }
    switch (parseJwt().role) {
      case "1" :
        this.props.history.push('/adm')
        break;
      case "2" :
        this.props.history.push('/med')
        break;
      case "3" :
        this.props.history.push('/paciente')
        break;
    
      default:
        break;
    }
    }
  })

  // Caso haja o erro,
  .catch(() => {
    // define o valor do state erroMensagem com uma mensagem personalizada e define que a requisição acabou
    this.setState({ erroMensagem : "email ou senha invalidos, tente novamente", isLoading : false})
  })

}

//função generica que atualiza o state de acordo com o input
// pode ser reutilizado em varios inputs diferentes
atualizaCampo =( campo ) => {
  this.setState({ [campo.target.name] : campo.target.value})
}

  render(){
      return(
        <div>
          <main>
            <section>
              <p>bem vindo</p>
              <form onSubmit={this.efetuaLogin}>
                <input
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.atualizaCampo}
                  placeholder="email"
                />

                <input
                  type="password"
                  name="senha"
                  value={this.state.senha}
                  onChange={this.atualizaCampo}
                  placeholder="senha"
                />

                <p>{this.state.erroMensagem}</p>

                {/* Verifica se a requisição está em andamento
                    Se estiver, desabilita o click do botão
                */}

                {
                  // Caso o isLoading seja true, renderiza o botao desabilitado com o texto "Loading"
                  this.state.isLoading === true && 
                  <button type="submit" disabled>Loading...</button>
                }

               { /*  Casp seja false, renderiza o botão habilitado com o texto "Login" */
                  this.state.isLoading === false &&
                  <button 
                  type="submit"
                  disabled={this.state.email === '' || this.state.senha === '' ? 'none' : ''}
                  >
                    Login
                  </button>
               }
                  
                
              </form>
            </section>
          </main>
        </div>
      )}

};

export default App;
