import React from "react";
import Tabs from "./tabs";

import { createRoot } from "react-dom/client";

function init() {
	const appContainer = document.createElement("div");
	document.body.appendChild(appContainer);
	if (!appContainer) {
		throw new Error(" can not find AppContainer");
	}
	const root = createRoot(appContainer);
	root.render(<Tabs />);
}

init();
