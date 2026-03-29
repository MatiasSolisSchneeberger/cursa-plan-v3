import IconAvatar from "@/components/IconAvatar";
import {
	TypographyH2,
	TypographyP,
} from "@/components/ui/Typography";
import { Avatar, AvatarIcon, AvatarLetter } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContextData";
import { useSimulador } from "@/context/SimuladorContextData";
import { useCarrerasFav } from "@/hooks/useCarrerasFav";
import Cargando from "@/sections/Cargando";
import ResumenTab from "@/sections/profile/ResumenTab";
import CarrerasTab from "@/sections/profile/CarrerasTab";
import PageLayout from "@/layout/PageLayout";
import { IconSettings } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function Profile() {
	const { loading: authLoading, userProfile } = useAuth();
	const { loading: loadingFav } = useCarrerasFav();
	const { loading: loadingSimulador } = useSimulador();

	if (authLoading || loadingFav || loadingSimulador) {
		return <Cargando />;
	}

	const fullName = userProfile?.full_name;
	const userName = userProfile?.username;
	const icon = userProfile?.icon;

	return (
		<PageLayout
			className="flex flex-col gap-4"
			breadcrumbs={[
				{ url: "/", isHome: true },
				{ label: "Perfil", isCurrentPage: true },
			]}
		>

			<Card>
				<CardHeader className="flex gap-4 md:flex-row md:items-center">
					<Avatar size="lg">
						{icon ? (
							<AvatarIcon>
								<IconAvatar icon={icon} />
							</AvatarIcon>
						) : (
							<AvatarLetter>{fullName?.charAt(0)}</AvatarLetter>
						)}
					</Avatar>
					<div className="flex-1">
						<CardTitle>
							<TypographyH2 className="border-b-0 pb-0 text-left">
								{fullName}
							</TypographyH2>
						</CardTitle>
						<CardDescription>
							<TypographyP>@{userName}</TypographyP>
						</CardDescription>
					</div>
				</CardHeader>
				<CardFooter>
					<Button variant={"outline"} asChild>
						<Link to="/config">
							<IconSettings />
							Configuración
						</Link>
					</Button>
				</CardFooter>
			</Card>

			<Tabs defaultValue="resumen" className="w-full">
				<TabsList className="mx-auto grid w-full max-w-2xl grid-cols-2">
					<TabsTrigger value="resumen">Resumen Académico</TabsTrigger>
					<TabsTrigger value="carreras">Mis Carreras</TabsTrigger>
				</TabsList>

				<TabsContent
					value="resumen"
					className="mt-4 flex flex-col gap-4"
				>
					<ResumenTab />
				</TabsContent>

				<TabsContent
					value="carreras"
					className="mt-4 flex flex-col gap-4"
				>
					<CarrerasTab />
				</TabsContent>
			</Tabs>
		</PageLayout>
	);
}
