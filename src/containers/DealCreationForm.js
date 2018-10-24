import React from "react";
import Constants from "../Constants";

export default class DealCreationForm extends React.Component{
	constructor(props){
	  super(props);
	  this.state = {
	  	stepOne: null,
	  	stepTwo: null,
	  	currentStep: "stepOne",
	  }
	}

	componentWillMount(){
		let tempObj = {};
		Constants.steps.map(step => 
			Constants[step].inputFields.map(field => {
				tempObj[step] = {...tempObj[step]} || {};
				tempObj[step][field.id] = {};
				tempObj[step][field.id].config = field;
			})
		);
		this.setState({
			...tempObj
		})
	}

	dealCreationSteps(e){
		e.preventDefault();
		let {currentStep} = this.state;
		let tempObj = {...this.state};
		let condition = true;
		let obj = Object.keys(tempObj[currentStep]).reduce((temp,field) => {
			if(!temp[currentStep][field].value ||	!temp[currentStep][field].value.trim()){
				temp[currentStep][field].warningMessage = "Mandatory Field";
				condition = condition && false;
			}
			else{
			debugger;
				temp[currentStep][field].warningMessage = "";
				condition = condition && true;
			}
			return temp;
		},{...tempObj});
		if(condition){
			obj.currentStep = "stepTwo";
			debugger;
			// document.getElementsByClassName(obj.currentStep)[0].nextElementSibling.classList.remove("activeButton");
			document.getElementsByClassName(obj.currentStep)[0].classList.add("activeButton");
		}

		this.setState({
			...obj
		});
	}

	handleChange(e,currentStep,fieldId){
		let tempObj = {...this.state};
		let currentObj = {...tempObj[currentStep][fieldId]};
		let condition =	currentObj.config.type === "text" &&
			currentObj.config.regex.test(e.target.value) ? true : false;
		if(!e.target.value.trim()){
			tempObj[currentStep][fieldId].warningMessage = "Mandatory Field"
			this.setState({
				...tempObj
			})
		}
		else if(condition){
		// debugger;
			tempObj[currentStep][fieldId].warningMessage = tempObj[currentStep][fieldId].config.condition
			this.setState({
				...tempObj,
			})
		}
		else{
			tempObj[currentStep][fieldId].warningMessage = null;
			tempObj[currentStep][fieldId].value = e.target.value.trim();
			this.setState({
				...tempObj
			})
		}
	}

	render(){
		debugger;
		// console.log(this.state);
		let {currentStep} = this.state;
		let config = Constants[currentStep];
		return(
			<div className="dealCreationContainer">
				<h2 className="dealCreationHead">Deal Creation Form</h2>
				<div className="dealCreationInnerContainer">
					<div className="dealCreationSteps">
						<button className="button stepOne upperCase">step 1</button>
						<button className="button stepTwo upperCase">step 2</button>
					</div>
					<div className="dealCreationForm">
						<form>
							<h3 className="dealCreationTitle upperCase">{config.title}</h3>
							<div className="dealCreationInputFields">
							{
								Constants[currentStep].inputFields.map((field,i) => 
									<div key={i}>
										<label>
										  <span className="inputLabel upperCase">
												{field.title}
											</span>
											{field.mandatory && <span className="mandatorySymbol"> *</span>}
											<br />
										  <input 
										  	type={field.type}
										  	{...(field.type === "date" && {min: field.date.min, max: field.date.max})}
										  	onChange={e => this.handleChange(e,currentStep,field.id)}
										  />
										  <div className="warningMessage">
										  {
										  	this.state[currentStep][field.id].warningMessage
										  }
										  </div>
										</label>
										<br />
									</div>
								)
							}
							</div>
							<div className="dealCreationButtons">
								{
									Constants[currentStep].buttons.map((button,i) =>
										<div key={i}>
											<button className="button activeButton" onClick={e => this.dealCreationSteps(e)}>{button.title}</button>
										</div>
									)
								}
							</div>
						</form>
					</div>
				</div>
			</div>
		)
	}
}