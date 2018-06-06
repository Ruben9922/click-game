import React, {Component} from 'react';
import {Button, Icon, Popup, Statistic} from 'semantic-ui-react';

class Score extends Component {
  render() {
    return (
      <div className="App" style={{marginTop: "50px", marginBottom: "50px", textAlign: "center"}}>
        <Statistic.Group widths={2} className="centerh" style={{width: "50%"}}>
          <Statistic>
            <Statistic.Label>Total Clicks</Statistic.Label>
            <Statistic.Value>
              <Icon name="mouse pointer"/>
              &nbsp;
              {this.props.clicks}
            </Statistic.Value>
          </Statistic>
          <Statistic>
            <Statistic.Label>
              Clicks per second
              &nbsp;
              <Popup trigger={<Icon name="question circle" color="blue"/>}>
                This is the amount by which the <b>Total Clicks</b> increases automatically each second.
              </Popup>
            </Statistic.Label>
            <Statistic.Value>
              <Icon name="tachometer alternate"/>
              &nbsp;
              {this.props.cps}
            </Statistic.Value>
          </Statistic>
        </Statistic.Group>
        <Button primary size="massive" onClick={this.props.incrementClicks}
                style={{marginTop: "30px", marginBottom: "30px"}}>Click here!</Button>
      </div>
    );
  }
}

export default Score;
