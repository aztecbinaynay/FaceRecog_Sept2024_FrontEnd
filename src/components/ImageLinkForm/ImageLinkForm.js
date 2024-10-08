import React from "react";
import "./ImageLinkForm.css";

const Navigation = ({onInputChange, onSubmit}) => {
	return (
		<div>
			<p className="f3 white">
				This Magic Brain will detect faces in your pictures. Give it a try{" "}
			</p>
			<div className="center">
				<div className="center form br3 shadow-5">
					<input
						type="text"
						name=""
						id=""
						className="f4 pa2 w-70 center"
						onChange={onInputChange}
					/>
					<button
						className="w-30 grow f4 link ph3 dib 
                white bg-light-purple pointer"
            onClick={onSubmit}
					>
						Detect
					</button>
				</div>
			</div>
		</div>
	);
};

export default Navigation;

// import React from "react";
// import "./ImageLinkForm.css";

// const ImageLinkForm = () => {
// 	return (
// 		<div>
// 			<p className="f3">
// 				{"This Magic Brain will detect faces in your pictures. Give it a try"}
// 			</p>
// 			<div>
// 				<input type="text" name="" id="" className="f4 pa2 w-70 center">
// 					<button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple">
// 						{"Detect"}
// 					</button>
// 				</input>
// 			</div>
// 		</div>
// 	);
// };

// export default ImageLinkForm;
