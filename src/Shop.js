import React, {Component} from 'react';
import {Header, Card, Button, Label} from 'semantic-ui-react';

class Shop extends Component {
  render() {
    return (
      <div className="App">
        <Header as="h2" textAlign="center">Shop</Header>
        <Card.Group centered>
          {this.props.items.map((item, index) => (
              <Card key={index}>
                <Card.Content>
                  <Card.Header>{item.name}</Card.Header>
                  <Card.Meta>{item.price}&cent;</Card.Meta>
                </Card.Content>
                <Card.Content extra>
                  <Button color="blue" fluid animated="fade">
                    <Button.Content visible>Purchase</Button.Content>
                    <Button.Content hidden>Only {item.price}&cent;!</Button.Content>
                  </Button>
                </Card.Content>
              </Card>
          ))}
        </Card.Group>
      </div>
    );
  }
}

export default Shop;
