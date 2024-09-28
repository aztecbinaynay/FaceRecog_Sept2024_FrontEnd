import "./App.css";
import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation.js";
import Logo from "./components/Logo/Logo.js";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.js";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition.js";
import Rank from "./components/Rank/Rank.js";
import Signin from "./components/Signin/Signin.js";
import Register from "./components/Register/Register.js";
import ParticlesBg from "particles-bg";
const Clarifai = require("clarifai");

const app = new Clarifai.App({
	apiKey: "e94b1660d9324eed85b54a57006a82ef",
});

class App extends Component {
	constructor() {
		super();
		this.state = {
			input: "",
			imageUrl: "",
			box: {},
			route: "signin",
			isSignedIn: false,
			user: {
				id: "",
				name: "",
				email: "",
				score: 0,
				joined: "",
			},
		};
	}

	loadUser = (data) => {
		this.setState({
			user: {
				id: data.id,
				name: data.name,
				email: data.email,
				score: data.score,
				joined: data.joined,
			},
		});
	};

	displayFaceBox = (boxdata) => {
		console.log(boxdata);
		this.setState({ box: boxdata });
	};

	onInputChange = (event) => {
		this.setState({ input: event.target.value });
	};

	onSubmit = () => {
		// console.log("click");
		// console.log(this.state.input);
		this.setState({ imageURL: this.state.input });
		// console.log("this is the score", this.state.user.score);
		fetch("http://localhost:8080/image", {
			method: "put",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				id: this.state.user.id
			}),
		})
			.then((response) => response.json())
			.then((ScoreUser) => {
				this.setState((prevState) => ({
					user: {
						...prevState.user,
						score: ScoreUser["score"],
					},
				}));
			});
	};

	onRouteChange = (route) => {
		if (route === "signin") {
			this.setState({ isSignedIn: false });
		} else if (route === "home") {
			this.setState({ isSignedIn: true });
		}
		this.setState({ route: route });
	};

	calculateFaceLocation = (data) => {
		const clarifaiFace =
			data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById("inputimage");
		const width = Number(image.width);
		const height = Number(image.height);
		console.log(width, height);
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - clarifaiFace.right_col * width,
			bottomRow: height - clarifaiFace.bottom_row * height,
		};
	};

	render() {
		return (
			<div className="App">
				<ParticlesBg
					className="particles"
					bg={true}
					type="cobweb"
					num={100}
					color="#ff0000"
				/>
				<Navigation
					isSignedIn={this.state.isSignedIn}
					onRouteChange={this.onRouteChange}
				/>
				{this.state.route === "home" ? (
					<>
						<Logo />
						<Rank
							userName={this.state.user.name}
							userScore={this.state.user.score}
						/>
						<ImageLinkForm
							onInputChange={this.onInputChange}
							onSubmit={this.onSubmit}
						/>
						<FaceRecognition
							box={this.state.box}
							imageURL={this.state.imageURL}
						/>
					</>
				) : this.state.route === "signin" ? (
					<Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
				) : (
					<Register
						onRouteChange={this.onRouteChange}
						loadUser={this.loadUser}
					/>
				)}
			</div>
		);
	}
}

export default App;
