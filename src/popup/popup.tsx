import React, { useState, useCallback } from "react";
import useEyeDropper from "use-eye-dropper";
import "../assets/tailwind.css";
import { TbClipboardCopy } from "react-icons/tb";

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
				chrome.storage.local.set({ color: color.sRGBHex }, () => {
					console.log("color has been stored in the storage");
				});
				setColor(color.sRGBHex);
				setColorValue(color.sRGBHex);
			} catch (e) {
				console.log(e);
				// Ensures component is still mounted
				// before calling setState
				if (e.canceled) setError(e); //if user cancelled the selection of the color then it will be triggered
			}
		};
		openPicker();
	}, [open]);

	function handleCopyColor() {
		navigator.clipboard.writeText(colorValue);
	}
	return (
		<div className='h-screen flex flex-col justify-center items-center text-center'>
			<p className='text-xl  font-medium text-center my-2'>
				Welcome to my color picker
			</p>
			{isSupported() ? (
				<button
					className='text-lg font-semibold text-white-500 w-40 rounded-md bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 '
					onClick={pickColor}>
					Pick Color
				</button>
			) : (
				<span>EyeDropper API not supported in this browser</span>
			)}
			<div className='flex flex-row m-4 '>
				{colorValue === null || undefined ? (
					<span className='text-lg font-semibold '>
						Please select a Color.
					</span>
				) : (
					<>
						<span
							className='flex justify-center items-center w-10 h-10 inline-block border-2 border-solid border-black'
							style={{ background: color }}></span>
						<span className='text-lg mx-2 flex justify-center items-center'>
							{colorValue}
						</span>
						<button
							type='submit'
							className='flex bg-slate-300 justify-center items-center rounded-sm bg-slate-200 w-10 h-10 mx-12 border-2 border-solid divide-black-400 hover:bg-white active:bg-white-700'
							onClick={handleCopyColor}>
							<span className='text-lg'>
								<TbClipboardCopy />
							</span>
						</button>
					</>
				)}
			</div>
			{!!error && <span>{error}</span>}
		</div>
	);
};
export default Popup;
