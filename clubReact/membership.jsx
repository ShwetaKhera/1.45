import React from 'react';
import ReactDOM from 'react-dom';

function Membership() {
  return (
    <main class="membership">
      <p>Nothing to do this weekend? Join our club!</p>
      <h2>APPLY NOW!</h2>
      <form>
        <label>Name: </label>
        <input id="name" minlength="3" maxlength="10" required />

        <label>Email: </label>
        <input id="email" type="email" minlength="6" maxlength="30" required />

        <label>Password: </label>
        <input
          id="password"
          type="password"
          minlength="6"
          maxlength="15"
          required
        />

        <label>Area: </label>
        <select name="area" id="area" required>
          <option value="Palo Alto">Palo Alto</option>
          <option value="Mountain View">Mountain View</option>
          <option value="Redwood City">Redwood City</option>
          <option value="Santa Clara">Santa Clara</option>
        </select>

        <p></p>
        <button id="signup" type="button">
          Sign Up
        </button>
      </form>
    </main>
  );
}

export default Membership;
