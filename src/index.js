import React from "react";
import PropTypes from "prop-types";
import {
	HorizontalScroll,
	getClassName,
	withPlatform,
	Headline,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import "./main.css";

const HorizontalCalendar = ({
	date = new Date(),
	choosed = 1,
	isDarkWeekend = true,
	mondayFirst = false, 
	platform,
	onClick,
}) => {
	const baseClassNames = getClassName("Card", platform);

	const onItemClick = (e) => {
		const choosedDay = e.currentTarget.dataset.day;

		const dayNumber =
			adays.findIndex((day) => day.toString() === choosedDay) + 1;

		onClick && onClick({ choosedDay, dayNumber });
	};

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

	const days = () => {
		const dates = [];

		for (let i = 0; i < 7; i++) {
			const result = new Date(date);
			result.setDate(result.getDate() + i);
			dates.push(result);
		}

		return dates;
	};

	const daysMondayFirst = () => {
		const dates = []
	
		const selected = new Date(date)

		const fromMonday = selected.getDay() ? selected.getDay() - 1 : 6
		const monday = selected.setDate(selected.getDate() - fromMonday)

		for (let i = 0; i < 7; i++) {
			const result = new Date(monday);
			result.setDate(result.getDate() + i);
			dates.push(result);
		}
	
		return dates
	}

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

	const adays = mondayFirst ? daysMondayFirst() : days() 

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
				{adays.map((day, i) => {
					const dayNumber = day.getDay();

					return (
						<div
							key={day.toString()}
							className="day"
							style={{
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
	platform: PropTypes.string,
	onClick: PropTypes.func,
};

export default withPlatform(HorizontalCalendar);
