import React from "react";
import "./SignIn.css";

class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signInEmail: "",
			signInPassword: "",
		};
	}

	onEmailChange = (event) => {
		this.setState({ signInEmail: event.target.value });
	};

	onPasswordChange = (event) => {
		this.setState({ signInPassword: event.target.value });
	};

	onSubmitSignIn = () => {
		fetch("http://localhost:8080/signin", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword,
			}),
		})
			.then((response) => response.json())
			.then((user) => {
				if (user.id) {
					this.props.loadUser(user);
					this.props.onRouteChange("home");
				}
			});
	};

	onEnterPress = (event) => {
		if (event.keyCode === 13) {
			this.onSubmitSignIn();
		}
	};

	render() {
		return (
			<article className="br3 ba mv4 w-100 w-50-m w-25-l mw5 shadow-7.5 center">
				<main className="pa4 white-80">
					<div className="measure">
						<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
							<legend className="f1 fw6 ph0 mh0">Sign In</legend>
							<div className="mt3">
								<label className="db fw6 lh-copy f6" for="email-address">
									Email
								</label>
								<input
									onChange={this.onEmailChange}
									onKeyDown={this.onEnterPress}
									className="pa2 input-reset ba w-100"
									type="email"
									name="email-address"
									id="email-address"
								/>
							</div>
							<div className="mv3">
								<label className="db fw6 lh-copy f6" for="password">
									Password
								</label>
								<input
									onChange={this.onPasswordChange}
									onKeyDown={this.onEnterPress}
									className="pa2 input-reset ba w-100"
									type="password"
									name="password"
									id="password"								
								/>
							</div>
						</fieldset>
						<div className="">
							<input
								onClick={this.onSubmitSignIn}
								className="b ph3 pv2 input-reset ba b--white grow dim pointer f6 dib"
								type="submit"
								value="Sign in"
							/>
						</div>
						<div className="lh-copy mt3">
							<p
								onClick={() => this.props.onRouteChange("register")}
								className="f6 link dim white db pointer"
							>
								Register
							</p>
						</div>
					</div>
				</main>
			</article>
		);
	}
}

export default SignIn;
