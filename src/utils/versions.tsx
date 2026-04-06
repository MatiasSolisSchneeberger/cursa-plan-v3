import VM3 from "@/sections/news/v3";

export interface VERSIONS {
	version: string;
	title: string;
	date: string;
	content: React.ReactNode;
	footer?: React.ReactNode;
}

export const VERSIONS: VERSIONS[] = [
	{
		version: "3.3",
		title: "Un gran cambio visual",
		date: "2026-4-1",
		content: <VM3 />,
	},
];
