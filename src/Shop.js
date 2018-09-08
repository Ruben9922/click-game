import React, {Component} from 'react';
import {Button, Card, Header, Label, Progress} from 'semantic-ui-react';

class Shop extends Component {
  render() {
    return (
      <div>
        <Header as="h2" textAlign="center">Shop</Header>
        <Card.Group centered>
          {this.props.items.map((item, index) => (
            <Card key={index}>
              <Progress value={this.props.clicks} total={item.price} color="blue" attached="top"/>
              <Card.Content>
                <Card.Header>
                  {item.name}
                  &nbsp;
                  <Label circular>
                    {item.quantityOwned}
                  </Label>
                </Card.Header>
                <Card.Meta>
                  Costs {item.price} clicks<br/>
                  Increases CPS by {item.cpsIncrement}<br/>
                </Card.Meta>
              </Card.Content>
              <Card.Content extra>
                <Button color="blue" fluid onClick={() => this.props.onPurchaseButtonClick(index)}
                        disabled={this.props.clicks < item.price}>
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
