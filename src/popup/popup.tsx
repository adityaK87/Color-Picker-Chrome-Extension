import React, { useState, useCallback } from "react";
import useEyeDropper from "use-eye-dropper";
import "../assets/tailwind.css";

const Popup = () => {
	const { open, close, isSupported } = useEyeDropper();
	const [color, setColor] = useState("#fff");
	const [colorValue, setColorValue] = useState(null);
	const [error, setError] = useState();

	const gettingCurrentTab = async () => {
		let [tab] = await chrome.tabs.query({
			active: true,
			currentWindow: true,
		});
		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			func: pickColor,
		});
	};

	// useEyeDropper will reject/cleanup the open() promise on unmount,
	// so setState never fires when the component is unmounted.
	const pickColor = useCallback(() => {
		// Using async/await (can be used as a promise as-well)
		const openPicker = async () => {
			try {
				const color = await open();
				console.log(color);
				setColor(color.sRGBHex);
				setColorValue(color.sRGBHex);
			} catch (e) {
				console.log(e);
				// Ensures component is still mounted
				// before calling setState
				if (!e.canceled) setError(e);
			}
		};
		openPicker();
	}, [open]);
	return (
		<div className='h-screen flex flex-col justify-center items-center text-center'>
			<p className='text-lg font-medium text-center'>
				Welcome to my color picker
			</p>
			{isSupported() ? (
				<button
					className='text-lg bg-yellow-300 w-40'
					onClick={pickColor}>
					Pick Color
				</button>
			) : (
				<span>EyeDropper API not supported in this browser</span>
			)}
			<div className='flex flex-row m-4 '>
				<span
					className='w-10 h-10 inline-block'
					style={{ background: color }}></span>
				<span className='text-lg'>{colorValue}</span>
			</div>
			{!!error && <span>{error}</span>}
		</div>
	);
};
export default Popup;
