import React from 'react';
import Top from './components/Top';

class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			employee_data:[],
			survey_data: [],
			assigned_data:[],
			isLoaded:false,
			alldata:false,
			selectedEmployee: "",
			validationError:""
		}
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e,id) {
		console.log(id)
	}


	componentDidMount(){

		fetch('http://localhost:3001/employee')
		.then(res => res.json())
		.then(json => {
			this.setState({
				isLoaded:true,
				employee_data:json,
			})
		})

		fetch('http://localhost:3001/survey')
		.then(res => res.json())
		.then(json => {
			this.setState({
				alldata:true,
				survey_data:json,
			})
		})
	}

	render(){

		var { isLoaded,employee_data } = this.state;
		var { alldata,survey_data} = this.state;
		if (!isLoaded && !alldata) {
			return <div> Loading ... </div>
		}

		else {
			return(
				<div>
					<section className="section">
						<Top />
					</section>
					<section className="section">
						<div className="dropdown" style={{width:"100%",textAlign:"center"}}>
							<div className="dropdown-trigger" style={{width:"100%",textAlign:"center"}}>
								<select value={this.state.selectedEmployee}
									onChange={(e) => this.setState({selectedEmployee: e.target.key,validationError:e.target.key === "" ? "Select the Employee":""})}>
								{this.state.employee_data.map(team => <option key={team.id}>{team.name}</option>)} 
								</select>
							</div>
							<div>
								{this.state.validationError}
							</div>
						</div>
					</section>
					<section className="section">
						<div className="container">
							<div className="App">
								<div className="columns">
									<div className="column">
										<h1><strong>Survey List</strong></h1>
										{survey_data.map(item =>(
												<div key={item.id}>
													{item.name}
													<button id={parseInt(item.id)} className="button is-small" onClick={(e) => this.handleChange(e,item.id)}>Add</button>
												</div>
										))}
									</div>
									<div className="column">
										<h1><strong>Assigned Surveys</strong></h1>
									</div>
								</div>
							</div>
						</div>
					</section>
					<section className="section">
						<div className="box has-text-centered">
							<button className="button">Done</button>
						</div>
					</section>
				</div>
			)

		}
		
	}
}

export default App;
