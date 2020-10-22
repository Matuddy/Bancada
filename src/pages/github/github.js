import React, { Component } from 'react'
import './github.css'

class Github extends Component{
    constructor(){
        super()
        this.state = {
            user:[],
            repo:[]
        }
    }

    componentDidMount(){
        fetch("https://api.github.com/users/matuddy") //esse comando paga as info da api github
        .then(response => response.json()) //esse comando comverte as info para o formato json 
        .then( data => {this.setState({user: data})}) //esse comando coloca o valor 'data' dentro do atributo 'user'

        fetch("https://api.github.com/users/matuddy/repos")
        .then(response => response.json())
        .then( data => {this.setState({repo: data})})
    }

    render(){
        const {user, repo} = this.state;
        // console.log(repo);
        return <>
            <div className="container">
                <div className="row">
                    <div className="col-ml-3 col-12">
                        <p className="titulo">Meu GitHub infos</p>
                        <div>
                            <img className="circle-photo" src={user.avatar_url}></img>
                            <div>
                            <span className="font-weight-bold">Login:</span> @{user.login} <br/>
                            <span className="font-weight-bold">Name:</span> {user.name} <br/>
                            <span className="font-weight-bold">company:</span> {user.company} <br/>
                            <span className="font-weight-bold">location:</span> {user.location} <br/>
                            </div>
                        </div>
                    </div>

                    <div className="col-ml-9 col-12">
                    <div>{user.login}</div>
                    {repo.map(
                    repositorio => 
                    <div className="card bg-card">
                        Nome do repositorio: {repositorio.name} <br/>
                        Descrição: {repositorio.description} <br/>
                        Link do Repositório: <a href={repositorio.html_url}>Clique aqui</a>
                    </div>
                    
                )}
                    </div>
                </div>
            </div>

        </>;
    }

}

export default Github