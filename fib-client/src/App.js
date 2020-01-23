import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import OtherPage from './OtherPage';
import Fib from './Fib';

function App() {
	return (
		<Router>
			<Link to="/">Home</Link>
			<br/>
			<Link to="/otherpage">Other Page</Link>
			<div className="App">
				<Route exact path="/" component={Fib}/>
				<Route path="/otherpage" component={OtherPage}/>
			</div>
		</Router>
	);
}

export default App;
