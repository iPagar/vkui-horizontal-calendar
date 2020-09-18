import React, { useState } from "react";
import PropTypes from "prop-types";
import {
	HorizontalScroll,
	getClassName,
	usePlatform,
	Headline,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

const itemStyle = {
	flexShrink: 0,
	height: 29,
	width: 29,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	clipPath: "circle()",
};

const days = (date = new Date()) => {
	const dates = [];

	for (var i = 0; i < 7; i++) {
		const result = new Date(date);
		result.setDate(result.getDate() + i);
		dates.push(result);
	}

	return dates;
};

const getNameOfDay = (day) => {
	switch (day) {
		case 0:
			return "Вс";
		case 1:
			return "Пн";
		case 2:
			return "Вт";
		case 3:
			return "Ср";
		case 4:
			return "Чт";
		case 5:
			return "Пт";
		case 6:
			return "Сб";
		default:
			throw new RangeError({ message: "day" });
	}
};

const HorizontalCalendar = ({
	date,
	choosed = 1,
	isDarkWeekend = true,
	onClick,
}) => {
	const platform = usePlatform();
	const baseClassNames = getClassName("Card", platform);

	const onItemClick = (e) => {
		const choosedDay = e.currentTarget.dataset.day;

		const dayNumber =
			days(date).findIndex((day) => day.toString() === choosedDay) + 1;

		onClick && onClick({ choosedDay, dayNumber });
	};

	return (
		<HorizontalScroll
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<div
				style={{
					display: "flex",
				}}
			>
				{days(date).map((day, i) => {
					const dayNumber = day.getDay();

					return (
						<div
							key={day.toString()}
							style={{
								padding: 12,
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								color:
									isDarkWeekend &&
									(dayNumber === 0 || dayNumber === 6)
										? "var(--text_secondary)"
										: "var(--text_primary)",
							}}
							onClick={onItemClick}
							data-day={day}
						>
							<div
								style={{
									...itemStyle,
									backgroundColor:
										choosed - 1 === i
											? "var(--cell_button_foreground)"
											: "var(--content_tint_background)",
									color:
										choosed - 1 === i
											? "var(--background_light)"
											: isDarkWeekend &&
											  (dayNumber === 0 ||
													dayNumber === 6)
											? "var(--text_secondary)"
											: "var(--text_primary)",
								}}
								className={baseClassNames}
							>
								<Headline weight="medium">
									{day.getDate()}
								</Headline>
							</div>
							<div>{getNameOfDay(dayNumber)}</div>
						</div>
					);
				})}
			</div>
		</HorizontalScroll>
	);
};

HorizontalCalendar.propTypes = {
	date: PropTypes.instanceOf(Date),
	isDarkWeekend: PropTypes.bool,
	choosed: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7]),
	onClick: PropTypes.func,
};

export default HorizontalCalendar;
