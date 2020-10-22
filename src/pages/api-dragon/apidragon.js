import React, { Component } from 'react'
import './apidragon.css'

class Apidragon extends Component{
    constructor(){
        super()
        this.state = {ListDragon: [], dragon: {}, id_dragon: 0};
    }
    componentDidMount(){
        fetch("http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon")
        .then(response => response.json())
        .then( data => {this.setState({ListDragon: data})})
    }

    getList(){
        fetch("http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon")
        .then(response => response.json())
        .then( data => {this.setState({ListDragon: data})})
    }

    onCreate(){
        const dragon = {name: 'teu pai', type: 'aquele gordo'}
        const request ={
            method: 'post',
            heders: {'containerType': 'application/json'},
            body: JSON.stringify(dragon)
        }
        fetch('http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/', request)
        .then(response => response.json())
        .then(response2 => this.getList())
    }

    onEdit(id){
        console.log('Edit'+id)
    }

    onDelete(id){
        fetch('http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/'+id, {method: 'DELETE'})
        .then(response => response.json())
        .then(response2 => this.getList())

    }

    render(){
        const {ListDragon} = this.state
        return<>
            <div className="container">
                <button className="btn btn-primary ml-5 my-3">Criar</button>
                <div className="row">
                    <div className="col">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Tipo</th>
                                    <th>Data</th>
                                    <th className="text-center largura">Açãoes</th>
                                </tr>
                            </thead>   
                            <tbody>
                            {ListDragon.map(
                                dragon =>
                                <tr>
                                    <td>{dragon.id}</td>
                                    <td>{dragon.name}</td>
                                    <td>{dragon.type}</td>
                                    <td>{dragon.createdat}</td>
                                    <td className="largura">
                                        <button onClick={() => this.onEdit(dragon.id)} className="btn btn-success ml-3">Editar</button>
                                        <button onClick={() => this.onDelete(dragon.id)}className="btn btn-danger ml-4">Deletar</button>
                                    </td>
                                </tr>
                            )}
                            </tbody> 
                        </table>
                    </div>
                </div>
            </div>
        </>
    }
}
export default Apidragon