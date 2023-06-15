import React, { useEffect } from "react";
import "../assets/tailwind.css";

const handleInput = (e) => {
	e.preventDefault();
	const name = e.target[0].value;
	chrome.storage.sync.set({ name }, () => {
		console.log(`Name is set to ${name}`);
	});
};

const Popup = () => {
	useEffect(() => {
		chrome.storage.sync.get(["name"], (res) => {
			console.log(res.name);
		});
	}, []);
	return (
		<div className='h-screen'>
			<form
				className=' flex justify-center item-center  py-44'
				onSubmit={handleInput}>
				{/* <div className='mb-4'> */}
				<input
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					id='username'
					name='name'
					type='text'
					placeholder='Username'
				/>
				{/* </div> */}

				{/* <div className='flex items-center justify-between'> */}
				<button
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
					type='submit'>
					Submit
				</button>
				{/* </div> */}
			</form>
		</div>
	);
};

export default Popup;
