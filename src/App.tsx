import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Header,
  Icon,
  Menu,
  Message,
} from "semantic-ui-react";
import Shop from "./Shop";
import Score from "./Score";
import "./App.css";
import { useImmerReducer } from "use-immer";
import { v4 as uuidv4 } from "uuid";

export type Items = Record<
  string,
  { name: string; initialPrice: number; cpsIncrement: number }
>;

export interface ItemInstance {
  id: string;
  itemKey: string;
  quantityOwned: number;
  price: number;
}

type State = {
  itemInstances: ItemInstance[];
  clicks: number;
  cps: number;
};

type Action =
  | { type: "purchase"; index: number }
  | { type: "click" }
  | { type: "autoClick" };

const items: Items = {
  ballMouse: {
    name: "90's ball mouse",
    initialPrice: 10,
    cpsIncrement: 0.5,
  },
  opticalMouse: {
    name: "Basic optical mouse",
    initialPrice: 100,
    cpsIncrement: 1,
  },
  wirelessMouse: {
    name: "Decent wireless mouse",
    initialPrice: 200,
    cpsIncrement: 2,
  },
};

function generateItemInstances(): ItemInstance[] {
  return Object.entries(items).map(([k, v]) => ({
    id: uuidv4(),
    itemKey: k,
    quantityOwned: 0,
    price: v.initialPrice,
  }));
}

// TODO: Merge with existing using, e.g., Object.assign()
const initialState: State = {
  itemInstances: generateItemInstances(),
  clicks: 0,
  cps: 0,
};

function reducer(draft: State, action: Action) {
  switch (action.type) {
    case "purchase": {
      const itemInstance = draft.itemInstances[action.index];

      // Only if the user has enough clicks
      if (draft.clicks >= itemInstance.price) {
        const item = items[itemInstance.itemKey];

        // Increment quantity owned
        itemInstance.quantityOwned++;

        // Subtract item price from total clicks
        draft.clicks -= itemInstance.price;

        // Inflate price
        itemInstance.price = Math.round(
          item.initialPrice *
            (1 + 0.1 * Math.pow(itemInstance.quantityOwned, 1.6)),
        );

        // Add item's CPS increment to total CPS
        draft.cps += item.cpsIncrement;
      }
      return;
    }
    case "click":
      draft.clicks++;
      return;
    case "autoClick":
      draft.clicks += draft.cps;
      return;
  }
}

export default function App(): JSX.Element {
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const [timerId, setTimerId] = useState<number | null>(null);

  useEffect(() => {
    setTimerId(window.setInterval(() => dispatch({ type: "autoClick" }), 1000));

    return () => {
      if (timerId !== null) {
        window.clearInterval(timerId);
      }
    };
  }, [dispatch, timerId]);

  return (
    <div className="App">
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item header link href=".">
            Click Game
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item link href="//rubendougall.co.uk/">
              <Icon name="arrow left" />
              Back to Main Website
            </Menu.Item>
            <Menu.Item link href="https://github.com/Ruben9922/click-game">
              <Icon name="github" />
              GitHub
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
      <Container style={{ marginTop: "4em" }}>
        <Header
          as="h1"
          textAlign="center"
          style={{ marginTop: "2.5em", marginBottom: "1em" }}
        >
          Click Game
        </Header>

        <Message warning icon>
          <Icon name="warning sign" />
          <Message.Content>
            <Message.Header>Progress not saved</Message.Header>
            <p>
              Game state is currently <strong>not saved</strong>, so any
              progress will be lost upon refreshing or closing the page. This is
              something I plan to add in future.
            </p>
          </Message.Content>
        </Message>
        <br />

        <Grid columns={2} divided>
          <Grid.Column width={11}>
            <Score
              clicks={state.clicks}
              cps={state.cps}
              onMainButtonClick={() => dispatch({ type: "click" })}
            />
          </Grid.Column>
          <Grid.Column width={5}>
            <Shop
              itemInstances={state.itemInstances}
              items={items}
              onPurchaseButtonClick={(index) =>
                dispatch({ type: "purchase", index })
              }
              clicks={state.clicks}
            />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}
