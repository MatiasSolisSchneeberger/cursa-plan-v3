import { cn } from "@/utils/cn";

export default function Menu({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<ul
			className={cn(
				"bg-background-100 outline-background-300 dark:bg-background-900 dark:outline-background-700 flex min-w-xs flex-col gap-2 rounded-3xl py-2 shadow-2xl outline-2",
				className,
			)}
		>
			{children}
		</ul>
	);
}
