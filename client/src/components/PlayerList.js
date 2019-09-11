import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';
import { Form, Button, Col, Row, ListGroup } from 'react-bootstrap';

import ComapreDetails from './ComapreDetails';


class PlayerList extends Component {
    constructor(props){
        super(props);
        this.state = {
            player1 : null,
            player2 : null
        }
        this.onChangePlayer1 = this.onChangePlayer1.bind(this);
        this.onChangePlayer2 = this.onChangePlayer2.bind(this);
        this.getDetails = this.getDetails.bind(this);
    }
    onChangePlayer1(event) {
        this.setState({player1: event.target.value});
    }
    onChangePlayer2(event) {
        this.setState({player2: event.target.value});
    }
    getDetails() {
      if (this.state.player1 && this.state.player2){

      }
    }
    displayBooks(){
        var data = this.props.data;
        if(data.loading){
            return( <div>Loading books...</div> );
        } else {
            return data.findAllplayer.map((book, i) => {
                return(
                    <option value={book.id} key={i}>{ book.name }</option>
                    // <Dropdown.Item key={i} >{ book.name }</Dropdown.Item>
                    // <li key={ book.id } onClick={ (e) => this.setState({ selected: book.id }) }>{ book.name }</li>
                );
            })
        }
    }
    render(){
        let stylehidden = {display: this.state.player1 && this.state.player2 ? "" : "none"};
        return(
            <div className="jumbotron">
              <Form>
                <Row>
                  <Col xs lg="4">
                    <Form.Group  controlId="exampleForm.ControlSelect2">
                      <Form.Label>Example multiple select</Form.Label>
                      <Form.Control as="select" name="player1" value={this.state.player1} onChange={this.onChangePlayer1}>
                      <option >Please Select Player1</option>
                      {this.displayBooks()}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col xs lg="4">
                    <Form.Group controlId="exampleForm.ControlSelect2">
                      <Form.Label>Example multiple select</Form.Label>
                      <Form.Control as="select" name="player2" value={this.state.player2} onChange={this.onChangePlayer2}>
                      <option >Please Select Player2</option>
                      {this.displayBooks()}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col xs lg="3">

                  </Col>
                </Row>
              </Form>
              <Row style={stylehidden}>
                <Col xs lg="4">
                  <ListGroup>
                    <ListGroup.Item>Name</ListGroup.Item>
                    <ListGroup.Item>Gender</ListGroup.Item>
                    <ListGroup.Item>Team</ListGroup.Item>
                    <ListGroup.Item>Innings</ListGroup.Item>
                    <ListGroup.Item>Runs</ListGroup.Item>
                    <ListGroup.Item>Wickets</ListGroup.Item>
                    <ListGroup.Item>Dot balls</ListGroup.Item>
                    <ListGroup.Item>Centuries</ListGroup.Item>
                    <ListGroup.Item>Fifties</ListGroup.Item>
                    <ListGroup.Item>Man Of the Match</ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col xs lg="4">
                  <ComapreDetails playerId={ this.state.player1 } />
                </Col>
                <Col xs lg="4">
                  <ComapreDetails playerId={ this.state.player2 } />
                </Col>
              </Row>
            </div>
        );
    }
}

export default graphql(getBooksQuery)(PlayerList);
