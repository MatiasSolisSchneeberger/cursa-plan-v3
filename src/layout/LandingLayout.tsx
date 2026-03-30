import { TypographyH1 } from "@/components/ui/Typography";
import PageLayout from "./PageLayout";

export default function LandingLayout({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<PageLayout
			breadcrumbs={[
				{
					url: "/",
					isHome: true,
				},
				{
					label: title,
					isCurrentPage: true,
				},
			]}
			className=""
		>
			<header className="bg-primary/20 text-primary flex flex-col items-center justify-center gap-4 rounded-2xl px-3 py-10">
				<TypographyH1 className="text-primary mb-0 text-center">
					{title}
				</TypographyH1>
			</header>
			<article className="prose dark:prose-invert text-foreground/80 prose-li:marker:text-primary max-w-5xl">
				{children}
			</article>
		</PageLayout>
	);
}
