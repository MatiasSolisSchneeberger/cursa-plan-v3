import { MDXProvider } from "@mdx-js/react";
import { mdxComponents } from "@/components/mdxComponents";
import Card from "@/components/Card";
import CardHeader from "@/components/CardHeader";
import CardBody from "@/components/CardBody";

// Importar todos los MDX con eager: true para tenerlos disponibles ya
const updatesModules = import.meta.glob("./markdown/actualizaciones/*.mdx", {
	eager: true,
});

interface UpdateModule {
	default: React.ComponentType;
	frontmatter: {
		title: string;
		date: string;
		[key: string]: any;
	};
}

export default function Novedad() {
	// Procesar los módulos
	const updates = Object.values(updatesModules)
		.map((mod) => mod as UpdateModule)
		.sort((a, b) => {
			return (
				new Date(b.frontmatter.date).getTime() -
				new Date(a.frontmatter.date).getTime()
			);
		})
		.slice(0, 5);

	return (
		<section className="mx-auto flex max-w-5xl flex-col gap-6 py-6">
			<MDXProvider components={mdxComponents}>
				{updates.map((update, index) => {
					const Content = update.default;
					return (
						<Card key={index}>
							<CardHeader color="primary">
								<div className="flex flex-col">
									<span>{update.frontmatter.title}</span>
									<span className="text-sm font-normal opacity-80">
										{update.frontmatter.date}
									</span>
								</div>
							</CardHeader>
							<CardBody className="px-4">
								<Content />
							</CardBody>
						</Card>
					);
				})}
			</MDXProvider>
		</section>
	);
}
