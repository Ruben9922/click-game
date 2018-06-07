import React, {Component} from 'react';
import {Container, Grid, Header} from 'semantic-ui-react';
import Shop from "./Shop";
import Score from "./Score";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [
        {
          name: "90's ball mouse",
          price: 20,
          quantityOwned: 0,
          cpsIncrement: 0.2
        },
        {
          name: "Basic optical mouse",
          price: 100,
          quantityOwned: 0,
          cpsIncrement: 1
        },
        {
          name: "Decent wireless mouse",
          price: 200,
          quantityOwned: 0,
          cpsIncrement: 2
        },
      ],
      clicks: 0,
      cps: 0
    };

    this.handleMainButtonClick = this.handleMainButtonClick.bind(this);
    this.handlePurchaseButtonClick = this.handlePurchaseButtonClick.bind(this);
  }

  handleMainButtonClick() {
    return this.setState(prevState => ({
      clicks: prevState.clicks + 1
    }));
  }

  handlePurchaseButtonClick(index) {
    this.setState(prevState => {
      let {items, clicks} = prevState;
      let item = items[index];
      if (clicks >= item.price) {
        let updatedItem = Object.assign({}, item, {quantityOwned: item.quantityOwned + 1});
        let updatedItems = items.slice();
        updatedItems.splice(index, 1, updatedItem);

        // Subtract price from total clicks
        let updatedClicks = clicks - item.price;

        return {
          items: updatedItems,
          clicks: updatedClicks
        };
      } else {
        return {};
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Container>
          <Header as="h1" textAlign="center">Click Game</Header>
          <Grid columns={2} divided>
            <Grid.Column width={11}>
              <Score clicks={this.state.clicks} cps={this.state.cps} incrementClicks={this.handleMainButtonClick}/>
            </Grid.Column>
            <Grid.Column width={5}>
              <Shop items={this.state.items} incrementQuantityOwned={this.handlePurchaseButtonClick}/>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default App;
