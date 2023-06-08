import React from "react";
import Tabs from "./tabs";
import { HashRouter as Router } from "react-router-dom";

import { createRoot } from "react-dom/client";

function init() {
	const appContainer = document.createElement("div");
	document.body.appendChild(appContainer);
	if (!appContainer) {
		throw new Error(" can not find AppContainer");
	}
	const root = createRoot(appContainer);
	root.render(
		<Router>
			<Tabs />
		</Router>
	);
}

init();
