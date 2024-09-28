import React from "react";
import "./Rank.css";

const Rank = ({userName, userScore}) => {
	return (
		<div>
			<div className="white f3">{`${userName}, your current rank is`}</div>
			<div className="white f1">{`${userScore}`}</div>
		</div>
	);
};

export default Rank;
