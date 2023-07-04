import Home from 'pages/Home';
import Score from 'pages/Score/Score';
import Start from 'pages/Start/Start';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/" element={<Score />} /> */}
      </Routes>
    </Router>
  );
}
