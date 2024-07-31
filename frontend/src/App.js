import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Blogs from './Blogs';
import NewBlog from './NewBlog';
import Layout from './Layout';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/*" element={<Layout />}>
            <Route index element={<div className="inner1 text-white"><Home /></div>} />
            <Route path="blogs" element={<div className="inner2 text-white"><Blogs /></div>} />
            <Route path="new-blog" element={<div className="inner3 text-white"><NewBlog /></div>} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer/>
    </div>
  );
}

export default App;
