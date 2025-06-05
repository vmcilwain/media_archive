import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MediaListPage from '../pages/MediaListPage';

interface Props {
  name: string;
}

const App: React.FC<Props> = ({ name }) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MediaListPage />} />
      </Routes>
    </Router>
  );
};

export default App;
