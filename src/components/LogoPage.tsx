import { IconSchool } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function LogoPage() {
	return (
		<Link
			to="/"
			id="logo"
			className="bg-primary text-primary-foreground dark:bg-primary-600 dark:text-primary-50 relative flex h-min shrink-0 flex-row items-center justify-center gap-2.5 self-stretch overflow-hidden rounded-2xl py-2.5 pr-3 pl-2.5"
		>
			<IconSchool size="22" />
			<span className="font-title text-sm font-bold tracking-wide whitespace-nowrap">
				CursaPlan
			</span>
		</Link>
	);
}
