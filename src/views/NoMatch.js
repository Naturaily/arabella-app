import React from 'react';
import { Link } from 'react-router-dom';

const Repos = () => {
  return (
    <section className="nomatch">
      <h2>Oops, something went horribly wrong. The page you are trying to access does not exist.</h2>
      <Link to="/">
        <button type="button">Go back</button>
      </Link>
    </section>
  );
};

export default Repos;
