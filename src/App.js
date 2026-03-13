import React from 'react';
import { Navbar, ChatWidget } from './components';
import { About, Header, Footer, Skills } from './container';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Header />
      <About />
<Skills />
      <Footer />
      <ChatWidget />
    </div>
  );
}

export default App;
