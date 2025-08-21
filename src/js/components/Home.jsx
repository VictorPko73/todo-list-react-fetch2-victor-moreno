import React from "react";
import TodoList from "./todolist";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	return (
		<div className="container">
			<div className="row">
				<div className="list col-sm-6 justify-content-center mx-auto">
					
					<TodoList />
				</div>
			</div>


		</div>
	);
};

export default Home;