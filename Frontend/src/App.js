import React from 'react';
import { BrowserRouter as Router, Routes, Route }
	from 'react-router-dom';
import Home from './home';
import Navbar from './Navbar';
import Freespace from './freespace';
import Senti from './sentimental_analysis';
import Summary from './summarizer';

function App() {
	return (
		<Router>
			<Navbar/>
			<Routes>
				<Route exact path='/' element={<Senti/>} />
				<Route path='/freespace' element={<Freespace />} />
				<Route path='/home' element={<Home/>} />
				<Route path='/Summary' element={<Summary/>} />
			</Routes>
		</Router>
	);
}

export default App;
