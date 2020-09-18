### VKUI Horizontal Calendar

Отображает даты на неделю вперед

# Установка

`npm i vkui-horizontal-calendar`

# Скриншоты

![](https://i.ibb.co/x16YNF1/2020-09-18-033055.png)
![](https://i.ibb.co/fGmw5P6/2020-09-18-033112.png)

# Использование

    <HorizontalCalendar
    	date={new Date("2020-9-17")}
    	choosed={choosed}
    	onClick={({ choosedDay, dayNumber }) => {
    		setChoosed(dayNumber);
    	}}
    />

# Атрибуты

date - дата(по умолчанию будет отображаться сегодняшний день и далее)
choosed - выбранный день по порядку[1 - 7]
isDarkWeekend - затемнение выходных(по умолчанию включено)
onClick({choosedDay, dayNumber}) - choosedDay - выбранная дата, dayNumber - порядковый номер выбранной даты
