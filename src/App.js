import React, {Component} from 'react';
import {Grid, Container, Header} from 'semantic-ui-react';
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
          quantityOwned: 0
        },
        {
          name: "Basic optical mouse",
          price: 100,
          quantityOwned: 0
        },
        {
          name: "Decent wireless mouse",
          price: 200,
          quantityOwned: 0
        },
      ],
      clicks: 0,
      cps: 0
    }
  }

  render() {
    return (
      <div className="App">
        <Container>
          <Header as="h1" textAlign="center">Click Game</Header>
          <Grid columns={2} divided>
            <Grid.Column width={11}>
              <Score clicks={this.state.clicks} cps={this.state.cps}/>
            </Grid.Column>
            <Grid.Column width={5}>
              <Shop items={this.state.items}/>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default App;
