import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
	View,
	Panel,
	PanelHeader,
	HorizontalScroll,
	Button,
	Div,
} from "@vkontakte/vkui";
import HorizontalCalendar from "../src";

const TestView = () => {
	const [choosed, setChoosed] = useState(1);
	const [theme, setTheme] = useState("bright_light");

	const changeTheme = () => {
		const schemeAttribute = document.createAttribute("scheme");
		schemeAttribute.value =
			theme === "bright_light" ? "space_gray" : "bright_light";
		document.body.attributes.setNamedItem(schemeAttribute);
		setTheme(schemeAttribute.value);
	};

	return (
		<View activePanel="main">
			<Panel id="main">
				<PanelHeader>VKUI Horizontal Calendar</PanelHeader>
				<HorizontalCalendar
					date={new Date("2021-7-04")}
					choosed={choosed}
					isDarkWeekend={true}
					onClick={({ choosedDay, dayNumber }) => {
						setChoosed(dayNumber);
					}}
					mondayFirst
				/>
				<Div>
					<Button size="l" onClick={changeTheme} stretched>
						{theme === "bright_light"
							? "Темная тема"
							: "Светлая тема"}
					</Button>
				</Div>
			</Panel>
		</View>
	);
};

ReactDOM.render(<TestView />, document.getElementById("root"));
