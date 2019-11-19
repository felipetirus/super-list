import React from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import Lists from './containers/Lists/Lists';

function App() {
  return (
    <Layout>
      <Lists></Lists>
    </Layout>
  );
}

export default App;
