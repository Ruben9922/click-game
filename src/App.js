import React, {Component} from 'react';
import {Container, Grid, Header, Icon, Menu} from 'semantic-ui-react';
import Shop from "./Shop";
import Score from "./Score";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [
        {
          name: "90's ball mouse",
          initialPrice: 10,
          quantityOwned: 0,
          cpsIncrement: 0.5
        },
        {
          name: "Basic optical mouse",
          initialPrice: 100,
          quantityOwned: 0,
          cpsIncrement: 1
        },
        {
          name: "Decent wireless mouse",
          initialPrice: 200,
          quantityOwned: 0,
          cpsIncrement: 2
        },
      ],
      clicks: 0,
      cps: 0
    };

    // Initialise item prices to their initial prices
    for (let item of this.state.items) {
      item.price = item.initialPrice;
    }

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
      let {items, clicks, cps} = prevState;
      let item = items[index];
      if (clicks >= item.price) {
        let updatedItem = Object.assign({}, item, {
          quantityOwned: item.quantityOwned + 1, // Increment quantity owned
          price: Math.round(item.initialPrice * (1 + (0.1 * Math.pow(item.quantityOwned + 1, 1.6)))) // Increase price
        });
        let updatedItems = items.slice();
        updatedItems.splice(index, 1, updatedItem);

        // Subtract item price from total clicks
        let updatedClicks = clicks - item.price;

        // Add item CPS increment to CPS
        let updatedCps = cps + item.cpsIncrement;

        return {
          items: updatedItems,
          clicks: updatedClicks,
          cps: updatedCps
        };
      } else {
        return {};
      }
    });
  }

  tick() {
    this.setState(prevState => ({
      clicks: prevState.clicks + prevState.cps
    }));
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <div className="App">
        <Menu fixed="top" inverted>
          <Container>
            <Menu.Item header link href=".">Wordsearch Generator</Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item link href="//rubendougall.co.uk/">
                <Icon name="arrow left"/>
                Back to Main Website
              </Menu.Item>
              <Menu.Item link href="https://github.com/Ruben9922/click-game">
                <Icon name="github"/>
                GitHub
              </Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>
        <Container style={{marginTop: "4em"}}>
          <Header as="h1" textAlign="center" style={{marginTop: "2.5em", marginBottom: "1em"}}>Click Game</Header>
          <Grid columns={2} divided>
            <Grid.Column width={11}>
              <Score clicks={this.state.clicks} cps={this.state.cps} onMainButtonClick={this.handleMainButtonClick}/>
            </Grid.Column>
            <Grid.Column width={5}>
              <Shop items={this.state.items} onPurchaseButtonClick={this.handlePurchaseButtonClick}
                    clicks={this.state.clicks}/>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default App;
