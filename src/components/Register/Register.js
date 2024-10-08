import React from "react";
import "./Register.css";

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			name: "",
		};
	}

	onNameChange = (event) => {
		this.setState({ name: event.target.value });
	};

	onEmailChange = (event) => {
		this.setState({ email: event.target.value });
	};

	onPasswordChange = (event) => {
		this.setState({ password: event.target.value });
	};

	onSubmitSignIn = () => {
		fetch("http://localhost:8080/register", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: this.state.name,
				email: this.state.email,
				password: this.state.password,
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

	render() {
		return (
			<article className="br3 ba mv4 w-100 w-50-m w-25-l mw5 shadow-7.5 center">
				<main className="pa4 white-80">
					<div className="measure">
						<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
							<legend className="f1 fw6 ph0 mh0">Register</legend>
							<div className="mt3">
								<label
									className="db fw6 lh-copy f6"
									for="name"
									type="text"
									name="name"
									id="name"
								>
									Name
								</label>
								<input
									onChange={this.onNameChange}
									className="pa2 input-reset ba w-100"
									type="email"
									name="email-address"
									id="name"
								/>
							</div>
							<div className="mt3">
								<label className="db fw6 lh-copy f6" for="email-address">
									Email
								</label>
								<input
									onChange={this.onEmailChange}
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
								value="Register"
							/>
						</div>
					</div>
				</main>
			</article>
		);
	}
}

export default Register;
