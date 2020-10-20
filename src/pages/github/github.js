import React, { Component } from 'react'

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
            <div className="row">
                <div className="col-3">
                    <p>Meu GitHub infos</p>
                    <p>
                        Login: @{user.login} <br/>
                    </p>
                </div>

                <div className="col-4">
                <div>{user.login}</div>
                {repo.map(
                repositorio => 
                <p>
                    Nome do repositorio: {repositorio.name} <br/>
                    Descrição: {repositorio.description} <br/>
                    Link do Repositório: <a href={repositorio.html_url}>Clique aqui</a>
                </p>
                
            )}
                </div>
            </div>

        </>;
    }

}

export default Github