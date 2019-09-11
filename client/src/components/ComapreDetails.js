import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getPlayerDetails } from '../queries/queries';
import { ListGroup } from 'react-bootstrap';


class ComapreDetails extends Component {
    displayBookDetails(){
      console.log('this.props.data', this.props.data);
        const { player } = this.props.data;
        if(player){
            return(

              <ListGroup>
                <ListGroup.Item>{ player.name }</ListGroup.Item>
                <ListGroup.Item>{ player.gender }</ListGroup.Item>
                <ListGroup.Item>{ player.team }</ListGroup.Item>
                <ListGroup.Item> {player.innings.length} </ListGroup.Item>
                <ListGroup.Item> {this.getTotalScore(player.innings, 'score')} </ListGroup.Item>
                <ListGroup.Item> {this.getTotalScore(player.innings, 'wickets')} </ListGroup.Item>
                <ListGroup.Item> {this.getTotalScore(player.innings, 'dots')} </ListGroup.Item>
                <ListGroup.Item> {this.getTotalCount(player.innings, 'centuries')} </ListGroup.Item>
                <ListGroup.Item> {this.getTotalCount(player.innings, 'fifties')} </ListGroup.Item>
                <ListGroup.Item> {this.getTotalCount(player.innings, 'mom')} </ListGroup.Item>
              </ListGroup>
            );
        } else {
            return( <div>No book selected...</div> );
        }
    }
    getTotalScore (innings, attr){
      let totlSc = 0;
      if (innings && innings.length){
        innings.map(item => {
          totlSc = totlSc + item[attr];
        });
          return totlSc;
      } else {
        return totlSc;
      }
    }
    getTotalCount (innings, attr){
      let totlSc = 0;
      if (innings && innings.length){
        innings.map(item => {
          if (item[attr]){
            totlSc ++;
          }
        });
          return totlSc;
      } else {
        return totlSc;
      }
    }
    render(){
        return(
            <div id="book-details">
                { this.displayBookDetails() }
            </div>
        );
    }
}

export default graphql(getPlayerDetails, {
    options: (props) => {
        return {
            variables: {
                id: props.playerId
            }
        }
    }
})(ComapreDetails);
