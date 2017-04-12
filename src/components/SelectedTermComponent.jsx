// import node modules
import d3 from 'd3';
import * as React from 'react';
import ReactDOM from 'react-dom';

import ReactTransitionGroup from 'react-addons-transition-group';

import DimensionsStore from '../stores/DimensionsStore.js';

// utils
// TODO: refactor to use same structure as PanoramaDispatcher;
// Having `flux` as a dependency, and two different files, is overkill.
import { AppActions, AppActionTypes } from '../utils/AppActionCreator';
import AppDispatcher from '../utils/AppDispatcher';


// main app container
export default class SelectedTerm extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      d: this.props.graphArc.startAngle(this.props.startAngle).endAngle(this.props.endAngle)()
    };
  }

  componentWillEnter(callback) {
    let middleAngle = (this.props.startAngle + this.props.endAngle) / 2;
    d3.select(ReactDOM.findDOMNode(this))
      .transition()
      .duration(750)
      .attrTween('d', (d) => (t) => {
        return this.props.graphArc
          .startAngle((d,i) => d3.interpolate(middleAngle, this.props.startAngle)(t))
          .endAngle((d,i) => d3.interpolate(middleAngle, this.props.endAngle)(t))();
      })
      .each('end', () => {
        this.setState({
          d: this.props.graphArc.startAngle(this.props.startAngle).endAngle(this.props.endAngle)()
        });
        callback();
      });
  }

  componentWillLeave(callback) {
    callback();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.d !== nextProps.graphArc.startAngle(nextProps.startAngle).endAngle(nextProps.endAngle)()) {
      this.setState({
        d: nextProps.graphArc.startAngle(nextProps.startAngle).endAngle(nextProps.endAngle)()
      });
    }
  }

  render() {
    return (
      <path
        d={ this.state.d }
        transform={ 'translate(' + DimensionsStore.getRadius() + ',' + DimensionsStore.getRadius() + ')' }
        strokeWidth={ 1 }
        className='termMask'
      /> 
    );
  }

}