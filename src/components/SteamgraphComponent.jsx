// import node modules
import d3 from 'd3';
import * as React from 'react';
import ReactDOM from 'react-dom';

import ReactTransitionGroup from 'react-addons-transition-group';

import DataStore from '../stores/DataStore.js';
import DimensionsStore from '../stores/DimensionsStore.js';

import AreaGraph from './AreaGraphComponent.jsx';
import SelectedTerm from './SelectedTermComponent.jsx';
import YearTick from './YearTickComponent.jsx';
import DestinationsTimeline from './DestinationsTimelineComponent.jsx';

export default class SteamGraph extends React.Component {

  constructor (props) { 
    super(props); 
    this.state = {
      rotate: DataStore.getTimelineRotation()
    };
  }

  componentWillReceiveProps(nextProps) {
    d3.select(ReactDOM.findDOMNode(this)).select('g')
      .transition()
      .duration(750)
      .attrTween('transform', (d) => (t) => 'translate(' + DimensionsStore.getTimelineWidth() + ',' + DimensionsStore.getTimelineWidth() + ') rotate(' + d3.interpolate(this.state.rotate, DataStore.getTimelineRotation())(t) + ' ' + DimensionsStore.getRadius() + ',' + DimensionsStore.getRadius() + ')' )
      .each('end', () => this.setState({
        rotate: DataStore.getTimelineRotation()
      }));
  }

  render() {
    var stack = d3.layout.stack()
      .values(d => d.values )
      .y(d => d.visits);

    let stackedData = stack(DataStore.getDestinationsByYear());

    return (
      <svg
        width={ DimensionsStore.getWidthHeight() }
        height={ DimensionsStore.getWidthHeight() }
      > 
        {/* masks to obscure details */}
        <rect
          x={ 0 }
          y={ DimensionsStore.getWidthHeight() / 2 + DimensionsStore.getRadius() }
          width={ DimensionsStore.getWidthHeight() }
          height={ DimensionsStore.getWidthHeight() - (DimensionsStore.getWidthHeight() / 2 + DimensionsStore.getRadius()) }
          className='timelineMask'

        />
        <g transform={'translate(' + DimensionsStore.getTimelineWidth() + ',' + DimensionsStore.getTimelineWidth() + ') rotate(' + this.state.rotate + ' ' + DimensionsStore.getRadius() + ',' + DimensionsStore.getRadius() + ')'}>

            {/* masks to obscure details */}
            <circle
              cx={DimensionsStore.getRadius()}
              cy={DimensionsStore.getRadius()}
              r={ DimensionsStore.getRadius() + DimensionsStore.getTimelineWidth() / 2}
              strokeWidth={ DimensionsStore.getTimelineWidth() }
              className='timelineMask'
            /> 



            {/* tick marks for distance */}
            { [10, 7.5, 5, 2.5].map(milesAway => {
              return (
                <circle
                  cx={DimensionsStore.getRadius()}
                  cy={DimensionsStore.getRadius()}
                  r={ DimensionsStore.getDestinationDistance(milesAway * 1000 * 1609.344) }
                  className='distanceTicks'
                  key={ 'tickDistance' + milesAway }
                />
              );
            })}
            <ReactTransitionGroup
              component='g' 
              transform={'translate(' + DimensionsStore.getRadius() + ',' + DimensionsStore.getRadius() + ')'}
            >
              { stackedData.map((region,i) => {
                return (
                  <AreaGraph
                    values={ region.values }
                    selectedId={ DataStore.getSelectedId() }
                    region={region.key}
                    key={'area' + region.key}
                    angles={ region.values.map(yearData => DataStore.getDateAngle(yearData.year + '-01-01'))}
                    ys={ region.values.map(yearData=>yearData.y) }
                    y0s={ region.values.map(yearData=>yearData.y0) }
                  />
                );
              }) }   
            </ReactTransitionGroup>

            <ReactTransitionGroup
              key='selectedTerm'
              component='g'
            >
              <SelectedTerm
                graphArc={ DimensionsStore.getMaskArc() }
                startAngle={ DataStore.getOfficeholderStartAngle(DataStore.getSelectedId(), DataStore.getSelectedOffice()) }
                endAngle={ DataStore.getOfficeholderEndAngle(DataStore.getSelectedId(), DataStore.getSelectedOffice()) }
                key={ 'mask' + DataStore.getSelectedOffice() + DataStore.getSelectedId() }
              />
            </ReactTransitionGroup>

          { DataStore.getMonthsSelectedWithAngles().map((monthData) => {
            return (
              <ReactTransitionGroup
                key={ 'month' + monthData.year + monthData.month }
                component='g' 
                className='months' 
              >
                <YearTick
                  yearData={ monthData }
                  label={ (monthData.month == 1) ? monthData.year : ((monthData.month - 1) % 4 == 0) ? monthData.monthName.substring(0,3) : '' }
                />
              </ReactTransitionGroup>
            );
          }) }

          {/* destination points */}
          <ReactTransitionGroup
            component='g' 
            className='destinationsRing' 
          >
            { DataStore.getSimplifiedDestinationsForSelected().map((destination, i) => {
              if (destination && destination.geometry && destination.geometry.coordinates) {
                return (
                  <DestinationsTimeline
                    destination={ destination }
                    angle={ DataStore.getDateAngle(destination.properties.date_convert.substring(0,10)) }
                    originAngle={ (DataStore.getOfficeholderEndAngle(DataStore.getSelectedId(), DataStore.getSelectedOffice()) + DataStore.getOfficeholderStartAngle(DataStore.getSelectedId(), DataStore.getSelectedOffice())) / 2 }
                    key={ 'destinationRing' + destination.properties.cartodb_id }
                    selected={ DataStore.getVisibleLocationIds().indexOf(destination.properties.cartodb_id) !== -1 }
                    unselected={ (DataStore.getVisibleLocationIds().indexOf(destination.properties.cartodb_id) == -1) && DataStore.hasVisibleLocation() }
                    onClick={ this.props.onClick }
                    onHover={ this.props.onHover }
                    onMouseLeave={ this.props.onMouseLeave }
                  />
                );
              }
            })}
          </ReactTransitionGroup>
        </g>
      </svg>
    );
  }
}