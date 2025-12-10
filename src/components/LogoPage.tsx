import {IconSchool} from "@tabler/icons-react"
import {Link} from "react-router-dom"

export default function LogoPage() {
	return (
		<Link
			to="/"
			className="bg-primary-400 text-primary-950 dark:bg-primary-600 dark:text-primary-50 rounded-2xl p-2.5 flex flex-row gap-2.5 items-center justify-center self-stretch shrink-0 relative overflow-hidden w-min h-min"
			id="logo">
			<IconSchool size="22" />
			<p className="relative flex items-center justify-center text-center font-Nunito text-sm leading-4 font-bold tracking-wide">
				CursaPlan
			</p>
		</Link>
	)
}
