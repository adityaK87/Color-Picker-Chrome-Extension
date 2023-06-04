import React from "react";
import { createRoot } from "react-dom/client";

const popup = <h1> Radhe Radhe</h1>;

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(popup);
