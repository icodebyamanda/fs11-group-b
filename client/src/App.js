import "./App.css";
import { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import AddResource from "./components/AddResource";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ResourcesDashboard from "./components/ResourcesDashboard";
import LogOut from "./components/LogOut";
import LoginButton from "./components/LoginButton";
import GroupB from "./components/Groupb";

function App() {
	let [signedIn, setSignedIn] = useState(localStorage.getItem("token"));
	// const [subtopic, setSubtopic] = useState({});

	const handleLogin = () => {
		setSignedIn(localStorage.getItem("token"));
		setSignedIn(true);
	};

	// const sentSubtopic = (subtopic) => {
	// 	setSubtopic(subtopic);
	// };

	return (
		<Router>
			<div className="App">
				<div className="text-end">
					<LoginButton />
					<LogOut />
				</div>
				<h1 align="center">GROUP B</h1>
				<nav align="center">
					<Link to="/register" className="text-dark ms-3 me-1">
						Sign Up
					</Link>
					{/* <Link to="/login" className="text-dark ms-3 me-1">
						Sign In
					</Link> */}
					{/* <Link to="/dashboard" className="text-dark ms-3 me-1">
						Your Dashboard
					</Link>
					<Link to="/myprofile" className="text-dark ms-3 me-1">
						Your Profile
					</Link> */}
				</nav>
				<Switch>
					<Route path="/register">
						<Register />
					</Route>
					<Route path="/login">
						<Login handleLogin={handleLogin} />
					</Route>
					<Route path="/groupb">
						<GroupB />
					</Route>
					{/* <Route path="/profile">
						<Profile />
					</Route>
					<Route path="/resource">
						<AddResource />
					</Route>
					<Route path="/dashboard">
						<Dashboard onUpdateSubtopic={sentSubtopic} />
					</Route>
					<Route path="/myprofile">
						<Profile />
					</Route>
					<Route path="/resources">
						<ResourcesDashboard subtopic={subtopic} />
					</Route>
					<Route path="/login">
						<LogOut />
					</Route> */}
				</Switch>
			</div>
		</Router>
	);
}

export default App;
