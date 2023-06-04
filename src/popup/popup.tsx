import React from "react";
import { createRoot } from "react-dom/client";
import "../assets/tailwind.css";

const popup = (
	<div>
		<h1 className='text-5xl text-green-500'> Radhe Radhe</h1>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
			cupiditate fugiat voluptatum aperiam possimus adipisci praesentium
			incidunt eum quaerat fuga sed quia impedit recusandae assumenda
			pariatur debitis est, explicabo veniam.
		</p>
	</div>
);

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(popup);
