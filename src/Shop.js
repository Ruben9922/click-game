import React, {Component} from 'react';
import {Button, Card, Header, Label, Progress} from 'semantic-ui-react';

export default function Shop({itemInstances, items, clicks, onPurchaseButtonClick}) {
  return (
    <div>
      <Header as="h2" textAlign="center">Shop</Header>
      <Card.Group centered>
        {itemInstances.map((itemInstance, index) => (
          <Card key={index}>
            <Progress value={clicks} total={itemInstance.price} color="blue" attached="top"/>
            <Card.Content>
              <Card.Header>
                {items[itemInstance.item].name}
                &nbsp;
                <Label circular>
                  {itemInstance.quantityOwned}
                </Label>
              </Card.Header>
              <Card.Meta>
                Costs {itemInstance.price} clicks<br/>
                Increases CPS by {items[itemInstance.item].cpsIncrement}<br/>
              </Card.Meta>
            </Card.Content>
            <Card.Content extra>
              <Button color="blue" fluid onClick={() => onPurchaseButtonClick(index)}
                      disabled={clicks < itemInstance.price}>
                Purchase
              </Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </div>
  );
}
