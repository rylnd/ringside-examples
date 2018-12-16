import * as React from 'react';
import Ringside from 'ringside';

export default class RingsideDemo extends React.Component {
  state = { top: 0, left: 0 };
  private tooltipEdge = 40;
  private outerRef = React.createRef<HTMLDivElement>();
  private innerRef = React.createRef<HTMLDivElement>();

  private generateRandomTooltip = () => {
    const { current: outerElement } = this.outerRef;
    const { current: innerElement } = this.innerRef;
    const outerBounds = outerElement && outerElement.getBoundingClientRect();
    const innerBounds = innerElement && innerElement.getBoundingClientRect();

    if (outerBounds && innerBounds) {
      const ringside = new Ringside(
        innerBounds,
        outerBounds,
        this.tooltipEdge,
        this.tooltipEdge
      );

      const fitPositions = ringside
        .positions()
        .filter(position => position.fits);
      const randomPosition =
        fitPositions[Math.floor(Math.random() * fitPositions.length)];

      const { top, left } = randomPosition;
      this.setState({ top, left });
    }
  };

  public render() {
    const { top, left } = this.state;

    return (
      <div
        className="outer"
        ref={this.outerRef}
        style={{
          backgroundColor: 'gray',
          height: '200px',
          lineHeight: '200px'
        }}
      >
        <div
          className="inner"
          ref={this.innerRef}
          style={{
            display: 'inline-block',
            backgroundColor: 'orangered',
            lineHeight: 1.5,
            cursor: 'pointer'
          }}
          onClick={this.generateRandomTooltip}
        >
          RANDOM TOOLTIP
        </div>
        <div
          className="tooltip"
          style={{
            backgroundColor: 'blue',
            position: 'absolute',
            height: this.tooltipEdge,
            width: this.tooltipEdge,
            top,
            left
          }}
        />
      </div>
    );
  }
}
