import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import LandingLayout from "@/layout/LandingLayout";
import { VERSIONS } from "@/utils/versions";

function Novedad({
	isLast,
	title,
	version,
	date,
	content,
	footer,
}: VERSIONS & { isLast: boolean }) {
	return (
		<div className="relative flex gap-8 pb-12 last:pb-0">
			{/* Timeline Line */}
			{!isLast && (
				<div className="bg-primary/20 absolute top-5 bottom-0 left-[15px] w-[2px]" />
			)}

			{/* Timeline Dot */}
			<div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
				<div className="bg-primary h-2.5 w-2.5 rounded-full" />
				<div className="bg-primary/25 absolute h-5 w-5 animate-pulse rounded-full" />
				<div className="bg-primary/10 absolute h-8 w-8 animate-pulse rounded-full" />
			</div>

			{/* Content */}
			<Card className="w-full">
				<CardHeader>
					<CardTitle className="not-prose">{title}</CardTitle>
					<CardAction>
						<Badge>{version}</Badge>
					</CardAction>
					<CardDescription>
						<Badge variant={"outline"}>
							{new Date(date).toLocaleDateString("es-AR", {
								year: "numeric",
								month: "2-digit",
								day: "2-digit",
							})}
						</Badge>
					</CardDescription>
				</CardHeader>
				<CardContent>{content}</CardContent>
				{footer && <CardFooter>{footer}</CardFooter>}
			</Card>
		</div>
	);
}

export default function Novedades() {
	return (
		<LandingLayout title="Novedades">
			<div className="container mx-auto max-w-4xl px-6 py-16">
				<div className="flex flex-col">
					{VERSIONS.map(
						({ version, title, date, content }, index, arr) => (
							<Novedad
								version={version}
								title={title}
								date={date}
								content={content}
								key={index}
								isLast={index === arr.length - 1}
							/>
						),
					)}
				</div>
			</div>
		</LandingLayout>
	);
}
