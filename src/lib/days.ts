type Day = {
	day: number;
	title: string;
};

export const days: Day[] = [
	{
		day: 1,
		title: "Naughty or Nice"
	},
	{
		day: 2,
		title: "Merry Munch-o-Meter"
	},
	{
		day: 3,
		title: "Jingle Bell Balancer"
	},
	{
		day: 4,
		title: "Heart of Christmas"
	},
	{
		day: 5,
		title: "Present Progress"
	},
	{
		day: 6,
		title: "Mistletoe Metronome"
	},
	{
		day: 7,
		title: "Morse Mischief"
	},
	{
		day: 8,
		title: "Santa's Mysterious Deck of Doubles"
	},
	{
		day: 9,
		title: "Santa's Final Countdown"
	},
	{
		day: 10,
		title: "Pop-up! Spreading the holiday cheer"
	},
	{
		day: 11,
		title: "Tinsel Transformers"
	},
	{
		day: 12,
		title: "Greetings & Salutations"
	},
	{
		day: 13,
		title: "Jingle Bell Balancer 2.0"
	},
	{
		day: 14,
		title: "Snowfall Symphony"
	}
];

export const dayNumbers = days.map((d) => d.day);