import React, {Component} from 'react';
import {Button, Card, Header} from 'semantic-ui-react';

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
                <Card.Meta>
                  Costs {item.price} clicks<br/>
                  Increases CPS by {item.cpsIncrement}<br/>
                  {item.quantityOwned} owned
                </Card.Meta>
              </Card.Content>
              <Card.Content extra>
                <Button color="blue" fluid onClick={() => this.props.incrementQuantityOwned(index)}>
                  Purchase
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
