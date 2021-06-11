import React, {Component, useState} from 'react';
import axios from "axios"

class Med extends Component{
    constructor(props){
        super(props);
        this.state = {
            listaConsultas : []
        }
    };
    buscaConsultas = () => {
        axios("http://localhost:5000/api/Consultas", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('login')
            }
        })
        .then(resposta =>{
            if(resposta.status ===200) {
                this.setState({ listaConsultas : resposta.data })
            }
        })
        .catch(erro => console.log(erro));
        }
    componentDidMount(){
        this.buscaConsultas();
    }

    render(){
        return(
            <main>
                <section>
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
                </section>
            </main>
        )
    }
}
export default Med;