import React from 'react';
import Default from "./components/layout/Layout";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'

library.add(faStroopwafel)

function App() {
  return (
      <Default/>
  );
}

export default App;
