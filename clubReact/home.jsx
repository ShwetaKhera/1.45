import React from 'react';
import ReactDOM from 'react-dom';
import harryPotter from './images/harryPotter.jpg';
import theatre from './images/theatre.jpg';

function Home(props) {
  return (
    <main>
      <header>
        <h1>1.45 - Silicon Valley Movie Marathon Club</h1>
      </header>

      <h2>Movie Marathon</h2>
      <p>
        Every weekend we organize movie marathons &#127916;. Unlimited snacks
        &#127839; and drinks &#127864; on the house! Please join us this weekend
        for the Harry Potter Series.
      </p>
      <img alt="harry potter" height="60%" width="60%" src={harryPotter} />

      <h2>Virtual Movie Marathon</h2>
      <p>
        Due to the Covid-19 pandemic, we will be organizing our marathons
        virtually. Although it will not be same but we are trying to give you
        the best experience without risking anyone's life.
      </p>
      <img src={theatre} alt="theatre" height="50%" width="50%" />
      <p>
        For better experience there will be limited number of (virtual) seats
        available for all timeslots. So RSVP and book your seat now!
      </p>

      <h2>Movie suggestions</h2>
      <p>We encourage our members to suggest us their favorite movie series.</p>
    </main>
  );
}

export default Home;
