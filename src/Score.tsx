import React from 'react';
import {Button, Icon, Popup, Statistic} from 'semantic-ui-react';

type ScoreProps = {
  clicks: number;
  cps: number;
  onMainButtonClick: () => void;
};

export default function Score({
                                clicks,
                                cps,
                                onMainButtonClick
}: ScoreProps): JSX.Element {
  return (
    <div style={{marginTop: "50px", marginBottom: "50px", textAlign: "center"}}>
      <Statistic.Group widths={2} className="centerh" style={{width: "65%"}}>
        <Statistic>
          <Statistic.Label>Total Clicks</Statistic.Label>
          <Statistic.Value>
            <Icon name="mouse pointer"/>
            &nbsp;
            {Math.floor(clicks)}
          </Statistic.Value>
        </Statistic>
        <Statistic>
          <Statistic.Label>
            Clicks per second (CPS)
            &nbsp;
            <Popup trigger={<Icon name="question circle" color="blue"/>}>
              This is the amount by which the <b>Total Clicks</b> increases automatically each second.
            </Popup>
          </Statistic.Label>
          <Statistic.Value>
            <Icon name="tachometer alternate"/>
            &nbsp;
            {cps.toFixed(1)}
          </Statistic.Value>
        </Statistic>
      </Statistic.Group>
      <Button primary size="massive" onClick={onMainButtonClick}
              style={{marginTop: "30px", marginBottom: "30px"}}>Click here!</Button>
    </div>
  );
}
