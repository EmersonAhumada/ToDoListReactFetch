import React from "react";
import { useState, useEffect } from "react";

//create your first component
const Home = () => {
	const [input, setInput] = useState([]);
	const [data, setData] = useState(" ");

	function getTodos() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/emerson")
			.then(response => response.json())
			.then(result => setInput(result))
			.catch(error => console.log("Error has ocurred", error));
	}

	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	var raw = JSON.stringify(input);

	var requestOptions = {
		method: "PUT",
		headers: myHeaders,
		body: raw,
		redirect: "follow"
	};

	fetch(
		"https://assets.breatheco.de/apis/fake/todos/user/emerson",
		requestOptions
	)
		.then(response => response.text())
		.then(result => console.log(result))
		.catch(error => console.log("error", error));

	function addTodos() {
		setInput([...input, { label: data, done: false }]);
		console.log(input);
	}
	function deleteTodos(item) {
		const listaNueva = input.filter(key => key !== item);
		setInput(listaNueva);
		console.log(listaNueva);
	}

	useEffect(() => {
		getTodos();
	}, []);

	return (
		<div id="wrapper" className="text-center bg-white container my-3 mt-5">
			<h1>ToDo List</h1>
			<div>
				<input
					type="text"
					placeholder="what needs to be done?"
					onChange={e => {
						setData(e.target.value);
					}}
					onKeyDown={e => {
						if (e.key === "Enter" && data != " ") {
							addTodos();
						}
					}}
					value={data}
				/>

				<div>
					<ul className="list-group">
						{input.map((item, index) => {
							return (
								<li className="list-group-item" key={index}>
									{item.label}
									<a
										onClick={() => {
											deleteTodos(item);
										}}>
										<i className="fas fa-trash"></i>
									</a>
								</li>
							);
						})}
					</ul>
				</div>
				<p className="text-center">{input.length} Items Left</p>
			</div>
		</div>
	);
};

export default Home;
