import React from "react";
import "./Navigation.css";

const Navigation = ({ onRouteChange, isSignedIn }) => {
	if (isSignedIn) {
		return (
			<nav>
				<p
					onClick={() => onRouteChange("signin")}
					className="link dim white underline pa1 pointer"
				>
					Sign Out
				</p>
			</nav>
		);
	} else {
		return (
			<nav>
				<p
					onClick={() => onRouteChange("signin")}
					className="link dim white underline pa1 pointer"
				>
					Sign In
				</p>
				<p
					onClick={() => onRouteChange("register")}
					className="link dim white underline pa1 pointer"
				>
					Register
				</p>
			</nav>
		);
	}
};

export default Navigation;
