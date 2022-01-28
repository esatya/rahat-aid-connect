import React from 'react';

export default function Invalid({ message }) {
  return (
    <>
      <div id="loader">
        <h3> {message || '404 Error'}</h3>
      </div>
    </>
  );
}
