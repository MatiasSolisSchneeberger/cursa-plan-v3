import type { ReactNode } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";
import { DropdownContext } from "@/components/Dropdown";

interface MenuItemInterface {
	children: ReactNode;
	iconLeft?: ReactNode;
	iconRight?: ReactNode;
	avatar?: ReactNode;
	chip?: ReactNode;
	button?: ReactNode;
	switchComponent?: ReactNode;
	textHelp?: string;
	tooltip?: ReactNode;
	href?: string;
	onClick?: () => void;
	className?: string;
	canHover?: boolean;
	isActive?: boolean;
}

const content = ({
	children,
	iconLeft,
	iconRight,
	avatar,
	chip,
	button,
	switchComponent,
	textHelp,
	tooltip,
}: MenuItemInterface) => (
	<>
		{iconLeft && (
			<span className="flex shrink-0 items-center pl-1">{iconLeft}</span>
		)}
		{avatar && (
			<span className="flex h-min shrink-0 items-center px-1">
				{avatar}
			</span>
		)}
		<div className="texto-label flex w-full flex-col pr-4 pl-2">
			<span>{children}</span>
			<span className="text-text-700 dark:text-text-300">{textHelp}</span>
		</div>

		{chip && (
			<span className="flex shrink-0 items-center pr-2">{chip}</span>
		)}
		{button && (
			<span className="flex shrink-0 items-center pr-2">{button}</span>
		)}
		{tooltip && (
			<span className="flex shrink-0 items-center pr-2">{tooltip}</span>
		)}
		{switchComponent && (
			<span className="flex shrink-0 items-center pr-2">
				{switchComponent}
			</span>
		)}
		{iconRight && (
			<span className="flex shrink-0 items-center pr-1">{iconRight}</span>
		)}
	</>
);
export default function MenuItem({
	children,
	iconLeft,
	iconRight,
	avatar,
	chip,
	button,
	switchComponent,
	href,
	textHelp,
	tooltip,
	className,
	canHover,
	isActive,
	onClick,
}: MenuItemInterface) {
	const dropdown = useContext(DropdownContext);

	const handleOnClick = () => {
		if (onClick) onClick();
		if (dropdown?.shouldCloseOnSelect) {
			dropdown.close();
		}
	};

	const activeClass = isActive
		? "bg-primary-100 hover:bg-primary-50 dark:bg-primary-900 dark:hover:bg-primary-800 font-bold text-primary-800 dark:text-primary-200"
		: "";
	return (
		<>
			{href ? (
				<Link
					to={href}
					onClick={() => {
						window.scrollTo({ top: 0, behavior: "smooth" });
						handleOnClick();
					}}
					className={cn(
						`text-text-900 dark:text-text-100 hover:bg-background-50 dark:hover:bg-background-950 relative flex h-min min-h-12 w-full flex-1 flex-row items-center rounded-xl px-2 py-1 transition-all ease-in-out hover:cursor-pointer hover:shadow-sm`,
						className,
						activeClass,
					)}
				>
					{content({
						children,
						iconLeft,
						iconRight,
						avatar,
						chip,
						button,
						switchComponent,
						textHelp,
						tooltip,
					})}
				</Link>
			) : (
				<li
					onClick={handleOnClick}
					className={cn(
						`text-text-900 dark:text-text-100 relative flex h-min min-h-12 w-full flex-1 flex-row items-center rounded-xl px-2 py-1 ${
							canHover
								? "hover:bg-background-50 dark:hover:bg-background-950 transition-all ease-in-out hover:cursor-pointer hover:shadow-sm"
								: ""
						} ${className} ${activeClass}`,
					)}
				>
					{content({
						children,
						iconLeft,
						iconRight,
						avatar,
						chip,
						button,
						switchComponent,
						textHelp,
						tooltip,
					})}
				</li>
			)}
		</>
	);
}
