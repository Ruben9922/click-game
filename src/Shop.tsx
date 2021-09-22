import React from 'react';
import {Button, Card, Header, Label, Progress} from 'semantic-ui-react';
import {ItemInstance, Items} from "./App";

type ShopProps = {
  itemInstances: ItemInstance[];
  items: Items;
  clicks: number;
  onPurchaseButtonClick: (index: number) => void;
};

export default function Shop({
                               itemInstances,
                               items,
                               clicks,
                               onPurchaseButtonClick
}: ShopProps): JSX.Element {
  return (
    <div>
      <Header as="h2" textAlign="center">Shop</Header>
      <Card.Group centered>
        {itemInstances.map((itemInstance, index) => {
          const item = items[itemInstance.itemKey];

          return (
            <Card key={index}>
              <Progress value={clicks} total={itemInstance.price} color="blue" attached="top"/>
              <Card.Content>
                <Card.Header>
                  {item.name}
                  &nbsp;
                  <Label circular>
                    {itemInstance.quantityOwned}
                  </Label>
                </Card.Header>
                <Card.Meta>
                  Costs {itemInstance.price} clicks<br/>
                  Increases CPS by {item.cpsIncrement}<br/>
                </Card.Meta>
              </Card.Content>
              <Card.Content extra>
                <Button color="blue" fluid onClick={() => onPurchaseButtonClick(index)}
                        disabled={clicks < itemInstance.price}>
                  Purchase
                </Button>
              </Card.Content>
            </Card>
          );
        })}
      </Card.Group>
    </div>
  );
}
