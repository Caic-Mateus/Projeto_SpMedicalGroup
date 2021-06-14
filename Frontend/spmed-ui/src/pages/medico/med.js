import React, { Component, useState } from 'react';
import axios from "axios"

import Header from '../../components/header';


import '../../assets/css/med.css';
import logo from '../../assets/img/image 3.png';
import insta from '../../assets/img/6bd4d4b8a16a7ec07ee9b9df0300a983 1.png';
import face from '../../assets/img/logo+label+logo+website+icon-1320166595550437062 1.png';
import ytb from '../../assets/img/60005d802c2876c821bdab2bbdb9af2a 1.png';

class Med extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaConsultas: [],
      idConsultaAlterada : 0,
      descricao:''
    }
  };
  buscaConsultas = () => {
    axios("http://localhost:5000/api/Consultas", {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('login')
      }
    })
      .then(resposta => {
        if (resposta.status === 200) {
          this.setState({ listaConsultas: resposta.data })
        }
      })
      .catch(erro => console.log(erro));
  }
  componentDidMount() {
    this.buscaConsultas();
  }

  // Recebe uma consulta da lista
buscarConsultaPorId = (consulta)=> {
    this.setState({
      // Atualiza o state id ConsultaAlterada com o valor do id da consulta recebida
      idConsultaAlterada : consulta.idConsulta,
      descricao : consulta.descricao
      
    }, ()=> {
      console.log(
        'A consulta ' + consulta.idConsulta + 'foi selecionada',
        'agora o valor do state idConsultaAlterada é: ' + this.state.idConsultaAlterada,
        'e o valor do state descricao é: '+ this.state.descricao
      )
    })
}
atualizaCampo = async(event) => {
  await this.setState({ descricao : event.target.value})
  console.log(this.state.descricao)
};

editaDesc = (event) => {
    event.preventDefault();

    axios.patch("http://localhost:5000/api/Consultas/descricao/"+this.state.idConsultaAlterada, {
    
    
    
    
      body : JSON.stringify({descricao : this.state.descricao})
    })
    .then(resposta => {
      if(resposta.status ===204){
        console.log(
        'Consulta ' + this.state.idConsultaAlterada + 'atualizada!',
        'Sua nova descrição agora é: ' + this.state.descricao
         ) }
    })
    .then(this.buscaConsultas)
}
  render() {
    return (
      <main>
        <div>
          <Header></Header>
          <section className="corpo">
            <div className="posicao">
              <div className="grid">
                <h1 className="title">Listagem consultas médico</h1>
                

                  <div className="listagem">
                    {this.state.listaConsultas.map((consulta) => {
                      return (
                        <section className="divisao">
                          <div className="box">
                            <tr key={consulta.idConsulta}></tr>
                            <p>Paciente: {consulta.idPacienteNavigation.nomePaciente} </p>
                            <p>Idade Paciente:{consulta.idPacienteNavigation.idade}</p>
                            <p>Situação: { consulta.idConsulta}</p>
                            <p>Data: {consulta.dataConsulta}</p>
                            
                          </div>
                          <div className="descricao box2">
                              <div className="desc"><p>Descrição: {consulta.descricao}</p></div>
                              <section className="alterar">
                                <div className="alterar">
                                  <form onSubmit={this.editaDesc}>
                                  
                                  
                                  {/* Faz a chamada da função buscarConsultaPorId passando o Consulta selecionada */}
                                  <button onClick={() => this.buscarConsultaPorId(consulta)} className="btnalt">Alterar</button>
                                  <input
                                    type="text"
                                    value={this.state.descricao}
                                    onChange={this.atualizaCampo}
                                    placeholder = "Descrição consulta"
                                  />
                                  <button type="submit" >Editar</button>
                                  </form>
                                </div>
                              </section>
                            </div>
                        </section>

                      )
                    })}


                  </div>


                </div>
              </div>
            
          </section>
          {/* Inicio Footer */}
          <footer className="rodape">
            <div className="content flex-spbt-center">
              <div className="links-footer">
                <div className="links">
                  <h2>Links Úteis</h2>
                  <ul>
                    <li><a href="#">Regras de Utilização</a></li>
                    <li><a href="#">Suporte</a></li>
                    <li><a href="#">Central de Ajuda</a></li>
                    <li><a href="#">Contato</a></li>
                  </ul>
                </div>
                <div className="links">
                  <h2>Páginas</h2>
                  <ul>
                    <li><a href="#">Inicio</a></li>
                    <li><a href="#">Campeonatos</a></li>
                    <li><a href="#">Resultados</a></li>
                    <li><a href="#">Notícias</a></li>
                    <li><a href="#">Login/Cadastro</a></li>
                  </ul>
                </div>
              </div>
              <img className="logo-rodape" src={logo} alt="Logo E-Players" />
              <div className="sociais">
                <h2>Faça parte do nosso clan, receba notícias e promoções!</h2>
                <form action>
                  <input type="email" placeholder="E-mail" />
                  <input type="submit" defaultValue="Cadastrar" />
                </form>
                <div className="siga-nos">
                  <h2>Siga-nos em:</h2>
                  <a href="#"><img src={insta} alt="Logo do Instagram" /></a>
                  <a href="#"><img src={face} alt="Logo do Facebook" /></a>
                  <a href="#"><img src={ytb} alt="Logo do Youtube" /></a>
                </div>
              </div>
            </div>
          </footer>
        </div>

        {/* <section>
                    <div>
                        <h2>
                            Lista Consultas
                        </h2>
                        {this.state.listaConsultas.map((consulta) => {
                            return(
                                <section>
                                    <div>
                                        <tr key = {consulta.idConsulta}></tr>
                                        <p>{consulta.idConsulta}</p>
                                        <p>{consulta.descricao}</p>
                                    </div>
                                </section>
                            )
                        })}
                    </div>
                </section> */}
      </main>
    )
  }
}
export default Med;