/*import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";*/
import { TypographyH1 } from "@/components/ui/Typography";
import { badgeVariants } from "@/components/ui/badge";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import CarrerasFav from "@/sections/CarrerasFav";
import ListadoCarreras from "@/sections/ListadoCarreras";
import { IconHome } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function Carreras() {
	return (
		<section className="flex flex-col gap-6">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink
							asChild
							className={badgeVariants({ variant: "outline" })}
						>
							<Link to="/">
								<IconHome className="size-4" />
							</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Carreras</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<TypographyH1 className="text-primary">Carreras</TypographyH1>

			<CarrerasFav />
			<ListadoCarreras />
		</section>
	);
}
