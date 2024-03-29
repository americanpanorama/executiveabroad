// import node modules
import * as React from 'react';

import DimensionsStore from '../stores/DimensionsStore';

var objToday = new Date();
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// main app container
export default class About extends React.Component {

  render() {
    return (
      <div id='about' style={ DimensionsStore.getAboutStyle() }>
        <svg
          width={ DimensionsStore.getWidthHeight() }
          height={ DimensionsStore.getWidthHeight() }
          id='about-bg'
        > 

          <circle
            cx={ DimensionsStore.getRadius() }
            cy={ DimensionsStore.getRadius() }
            r={ DimensionsStore.getRadius() }
            transform={'translate(' + DimensionsStore.getTimelineWidth() + ',' + DimensionsStore.getTimelineWidth() + ')' }
          />

        </svg>

        <div 
          id='about-close'  
          onClick={ this.props.onClick }
          style={ DimensionsStore.getAboutCloseStyle() }
        >
          close
        </div>

        <div id='about-content'  style={ DimensionsStore.getAboutContentStyle() } >
          <p>Before the twentieth-century, no sitting president and only a single secretary of state traveled outside the United States. With several modest and one very significant exception–Woodrow Wilson's more than half year abroad at the end of the First World War–it was not until the Second World War that international travel became commmon for presidents. In the first decade of the twentieth century, Theodore Roosevelt and William Howard Taft together made three trips to two places, the U.S.-administered Panama Canal Zone and just across the Rio Grande into Mexico. A century later their counterparts George W. Bush and Barack Obama together made more more than 300 trips, traveling to all corners of the globe.</p>

          <p>Beginning with Franklin Delano Roosevelt, foreign travel by presidents became the norm. This both reflected and reinforced the United States's government's more active role as a global power in the twentieth century. But some of the more dramatic bumps in on the frequency of travel by presidents are arguably more a product of technological innovation than any change in the U.S.'s stance towards the world. The noticable increase in 1959 followed the introduction of a Boeing 707 jet for presidential travel; that of 1990 a new, more capable and luxurious Air Force One. Executive travel represents an important form of soft power, and this map projects its growth during what's been called the American Century.</p>

          <h3>Sources</h3>

          <p>The majority of the <a href='https://history.state.gov/departmenthistory/travels'>data for foreign trips by presidents and secretaries of state</a> come from the Office of the Historian, Bureau of Public Affairs, United States of America. 2016 travel data for Barack Obama came from <a href='https://en.wikipedia.org/wiki/List_of_presidential_trips_made_by_Barack_Obama_during_2016'>Wikipedia</a> and for John Kerry from the <a href='https://2009-2017.state.gov/secretary/travel/2016/index.htm'>U.S. Department of State website</a>. An excellent study is Richard J. Ellis's <cite>Presidential Travel: They Journey from George Washington to George W. Bush</cite> (Lawrence, Kansas: University Press of Kansas) 2008.</p>

          <h3>Acknowledgments</h3>
          <p>This map is authored by Robert K. Nelson, Justin Madron, Timothy Barney, Lily Calaycay and the students in Barney's "The Rhetorical Lives of Maps" seminar: Will Alpaugh, Bryan Carapucci, Zach Clarke, Emily Ferkler, Cathryn Flint, Mitchell Gregory, Paige Harty, Annie Hunter, Madison Kloster, Sean Menges, Dan Robert, Michael Roberts, Lauren Scheffey, Maddie Shea, Mason Zadan, and Violet Zeng.</p>
          <p>The <a href='//mellon.org'>Andrew W. Mellon Foundation</a> generously provided grant funding to develop American Panorama.</p>
          <h3>Citation and License</h3>
          <p>If you are citing <cite>The Executive Abroad</cite>, we recommend the following format using the <cite>Chicago Manual of Style</cite>.</p>
          <blockquote>Robert K. Nelson, et al., &ldquo;The Executive Abroad,&rdquo; <cite>American Panorama</cite>, ed. Robert K. Nelson and Edward L. Ayers, accessed {months[objToday.getMonth()] + ' ' + objToday.getDate() + ', ' + objToday.getFullYear()}, https://dsl.richmond.edu/panorama/executiveabroad.</blockquote>
          <p>This work is licensed under a <a rel='license' href='http://creativecommons.org/licenses/by-nc-sa/4.0/' target='_blank'>Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.</p>

        </div> 
      </div>
    );
  }

}
