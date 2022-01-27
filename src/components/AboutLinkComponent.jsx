// import node modules
import * as React from 'react';

import DimensionsStore from '../stores/DimensionsStore';

// main app container
export default class AboutLink extends React.Component {

  render() {
    return (
      <svg
        width={DimensionsStore.getWidthHeight()}
        height={DimensionsStore.getWidthHeight()}
      >
        <defs>
          <path
            id='aboutArcSegment'
            d={DimensionsStore.getAboutMapLinkArc()}
            transform={'translate(' + DimensionsStore.getTimelineWidth() + ',' + DimensionsStore.getTimelineWidth() + ') rotate(0 ' + DimensionsStore.getRadius() + ',' + DimensionsStore.getRadius() + ')'}
          />
        </defs>

        <text
          stroke='transparent'
          fontSize={DimensionsStore.getAboutMapLinkSize()}
          textAnchor='end'
          className='aboutLink'
        >
          <textPath
            onClick={this.props.onClick}
            xlinkHref="#aboutArcSegment"
            startOffset='19%'
          >
            About this Map
          </textPath>
        </text>

        <text
          stroke='transparent'
          fontSize={DimensionsStore.getAboutMapLinkSize()}
          textAnchor='middle'
          className='aboutLink'
        >
          <textPath
            xlinkHref="#aboutArcSegment"
            startOffset='20%'
          >
            |
          </textPath>
        </text>

        <text
          stroke='transparent'
          fontSize={DimensionsStore.getAboutMapLinkSize()}
          textAnchor='start'
          className='aboutLink'
        >
          <a href='https://dsl.richmond.edu/panorama/#maps' target='_blank'>
            <textPath
              xlinkHref="#aboutArcSegment"
              startOffset='21%'
            >
              American Panorama
            </textPath>
          </a>
        </text>
      </svg>
    );
  }

}