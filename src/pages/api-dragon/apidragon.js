import React, { Component } from 'react'
import './apidragon.css'
import { Modal, Button, Form } from 'react-bootstrap'

class Apidragon extends Component{
    constructor(){
        super()
        this.state = {ListDragon: [], showModal: false, showAlert: false};
    }
    componentDidMount(){
        this.getList()
    }

    getList(){
        fetch("http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon")
        .then(response => response.json())
        .then( data => {this.setState({ListDragon: data})})
    }

    onCreate(event){
        event.preventDefault();
        let from = event.target;

        const dragon = {name: from.elements.name.value, type: from.elements.type.value }
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

    handleModaClose(){
        this.setState({showModal: false})
    }

    handleModaOpen(){
        this.setState({showModal: true})
    }

    render(){
        const {ListDragon, showModal, showAlert} = this.state
        return<>
            <div className="container">
                <button onClick={() => this.handleModaOpen()} className="btn btn-primary ml-6 my-3">Criar</button>
                <div className="row">
                    <div className="col">
                        <table className="table">
                            <thead className='cor'>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Tipo</th>
                                    <th className='ml-6'>Data</th>
                                    <th className="text-center largura">Açãoes</th>
                                </tr>
                            </thead>
                            <tbody>
                            {ListDragon.map(
                                dragon =>
                                <tr className='cor'>
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
            <Modal show={showModal} onHide={()=> this.handleModalClose()}>
                <Modal.Header>
                    <Modal.Title>Criar Dragão</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onClick={this.onCreate}>
                        <Form.Group controlId='formName'>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type='text' name='name'></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='formType'>
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control type='text' name='Type'></Form.Control>
                        </Form.Group>
                        <Button variant='success' type='submit'>
                                Enviar
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=> this.handleModaClose()}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    }
}
export default Apidragon