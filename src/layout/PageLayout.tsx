import React from "react";
import { Link } from "react-router-dom";
import { IconHome } from "@tabler/icons-react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface BreadcrumbItemProps {
	/** Link label. Not strictly required if `isHome` is true. */
	label?: React.ReactNode;
	/** Target to navigate to. */
	url?: string;
	/** Whether this is the home icon. */
	isHome?: boolean;
	/** Forces this item to render as a BreadcrumbPage instead of a link, even if it has an url. */
	isCurrentPage?: boolean;
	/** Optional custom formatting/rendering logic to bypass the default layout (e.g. for a dropdown menu). */
	customRenderer?: () => React.ReactNode;
}

export interface PageLayoutProps {
	/** Array of breadcrumb definitions. */
	breadcrumbs: BreadcrumbItemProps[];
	/** Page content to render below the breadcrumb. */
	children: React.ReactNode;
	/** Section container classes. */
	className?: string;
}

export default function PageLayout({
	breadcrumbs,
	children,
	className,
}: PageLayoutProps) {
	return (
		<section
			className={cn("mx-auto flex max-w-6xl flex-col gap-4", className)}
		>
			<Breadcrumb className="not-prose w-full">
				<BreadcrumbList>
					{breadcrumbs.map((item, index) => {
						const isLast = index === breadcrumbs.length - 1;

						return (
							<React.Fragment key={index}>
								<BreadcrumbItem>
									{item.customRenderer ? (
										item.customRenderer()
									) : item.isHome ? (
										<BreadcrumbLink
											asChild
											className={badgeVariants({
												variant: "outline",
											})}
										>
											<Link to={item.url || "/"}>
												<IconHome className="size-4" />
											</Link>
										</BreadcrumbLink>
									) : item.isCurrentPage ||
									  (isLast && !item.url) ? (
										<BreadcrumbPage>
											{item.label}
										</BreadcrumbPage>
									) : (
										<BreadcrumbLink asChild>
											<Link to={item.url || "#"}>
												{item.label}
											</Link>
										</BreadcrumbLink>
									)}
								</BreadcrumbItem>
								{!isLast && <BreadcrumbSeparator />}
							</React.Fragment>
						);
					})}
				</BreadcrumbList>
			</Breadcrumb>
			{children}
		</section>
	);
}
