import React, {Component} from 'react';
import axios from "axios";

import Header from '../../components/header';
import Footer from '../../components/footer';


import '../../assets/css/med.css';


class Adm extends Component{
    constructor(props){
        super(props);
        this.state = {
            listaConsultas : []
        }
    };
    buscaConsultas = () => {
        axios("http://localhost:5000/api/Consultas/listartodas", {
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
    render(){
        return(
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
                       
                          <div className="box">
                            <tr key={consulta.idConsulta}></tr>
                            <p>Paciente: {consulta.idPacienteNavigation.nomePaciente} </p>
                            <p>Data Nascimento:{new Intl.DateTimeFormat('pt-BR').format(new Date(consulta.idPacienteNavigation.dataNascimento))}</p>
                            <p>Situação: { consulta.idSituacaoNavigation.situacao1}</p>
                            <p>Data Consulta: {new Intl.DateTimeFormat('pt-BR').format(new Date(consulta.dataConsulta))}</p>
                            
                          </div>
                          
                  

                      )
                    })}


                  </div>


                </div>
              </div>
            
          </section>
                <Footer></Footer>
            </div>
            </main>
        )
    }
}
export default Adm;