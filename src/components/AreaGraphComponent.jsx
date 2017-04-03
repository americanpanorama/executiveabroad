// import node modules
import d3 from 'd3';
import * as React from 'react';
import ReactDOM from 'react-dom';

import DataStore from '../stores/DataStore.js';
import DimensionsStore from '../stores/DimensionsStore.js';

export default class AreaGraph extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      angles: props.angles,
      ys: props.ys,
      y0s: props.y0s,
      d: this._area()(props.values)
    };
  }

  componentWillEnter(callback) { callback(); }

  componentWillLeave(callback) { callback(); }

  componentWillReceiveProps(nextProps) {
    let radiusStack = d3.scale.linear()
      .domain([0, DataStore.getMaxVisits()])
      .range([DimensionsStore.getGraphInnerRadius(), DimensionsStore.getGraphOuterRadius()]);

    d3.select(ReactDOM.findDOMNode(this))
      .transition()
      .duration(750)
      .attrTween('d', (d) => (t) => this._area().angle((d,i) => d3.interpolate(this.state.angles[i], nextProps.angles[i])(t)).innerRadius((d,i) => { return radiusStack(d3.interpolate(this.state.y0s[i], nextProps.y0s[i])(t)); }).outerRadius((d,i) => radiusStack(d3.interpolate(this.state.y0s[i] + this.state.ys[i], nextProps.y0s[i] + nextProps.ys[i])(t)))(this.props.values) )
      .each('end', () => this.setState({
        angles: nextProps.angles,
        ys: nextProps.ys,
        y0s: nextProps.y0s,
        d: this._area()(nextProps.values)
      }));
  }


  _area() {
    var radiusStack = d3.scale.linear()
      .domain([0, DataStore.getMaxVisits()])
      .range([DimensionsStore.getGraphInnerRadius(), DimensionsStore.getGraphOuterRadius()]);

    return d3.svg.area.radial()
      .interpolate('cardinal-open')
      .tension([0.7])
      .angle(d => DataStore.getDateAngle(d.year + '-01-01'))
      .innerRadius(d => radiusStack(d.y0))
      .outerRadius(d => radiusStack(d.y0+d.y));
  } 

  render() {
    return (
      <path
        d={ this.state.d }
        className={ this.props.region }
        key={ 'area' + this.props.region }
      />
    );
  }

}