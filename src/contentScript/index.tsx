import React from "react";
import "../assets/tailwind.css";
import ContentScripts from "./contentScript";
import { HashRouter as Router } from "react-router-dom";

import { createRoot } from "react-dom/client";

function init() {
	const appContainer = document.createElement("div");
	document.body.appendChild(appContainer);
	if (!appContainer) {
		throw new Error(" can not find AppContainer");
	}
	const root = createRoot(appContainer);
	root.render(<ContentScripts />);
}

init();
