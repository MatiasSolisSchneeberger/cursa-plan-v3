import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WorkInProgress from "../../components/WorkInProgress";
import { TypographyLead } from "@/components/ui/Typography";

const TIPO_RECURSOS = [
	{
		label: "Parciales",
		slug: "parciales",
		sub_tipo: [
			{
				label: "Teóricos",
				slug: "teoricos",
			},
			{
				label: "Prácticos",
				slug: "practicos",
			},
			{
				label: "Finales",
				slug: "finales",
			},
			{
				label: "Libres",
				slug: "libres",
			},
		],
	},
	{
		label: "Apuntes",
		slug: "apuntes",
	},
	{
		label: "Bibliografía",
		slug: "bibliografia",
	},
	{
		label: "Videos",
		slug: "videos",
	},
	{
		label: "Links",
		slug: "links",
	},
];

function CardRecurso({
	titulo,
	sub_tipo,
}: {
	titulo: string;
	sub_tipo?: { label: string; slug: string }[];
}) {
	if (sub_tipo) {
		return (
			<Tabs defaultValue={sub_tipo[0].slug}>
				<TabsList variant="line">
					{sub_tipo.map((st) => (
						<TabsTrigger key={st.slug} value={st.slug}>
							{st.label}
						</TabsTrigger>
					))}
				</TabsList>
				{sub_tipo.map((st) => (
					<TabsContent key={st.slug} value={st.slug}>
						<CardRecurso titulo={`${titulo} - ${st.label}`} />
					</TabsContent>
				))}
			</Tabs>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>{titulo}</CardTitle>
			</CardHeader>
			<CardContent>
				<WorkInProgress />
			</CardContent>
		</Card>
	);
}

export default function RecursosTab() {
	return (
		<article className="flex flex-col gap-3">
			<TypographyLead>
				Estos recursos son enviados por los alumnos.
			</TypographyLead>
			<Tabs defaultValue={TIPO_RECURSOS[0].slug}>
				<TabsList>
					{TIPO_RECURSOS.map((tipo) => (
						<TabsTrigger key={tipo.slug} value={tipo.slug}>
							{tipo.label}
						</TabsTrigger>
					))}
				</TabsList>
				{TIPO_RECURSOS.map((tipo) => (
					<TabsContent key={tipo.slug} value={tipo.slug}>
						<CardRecurso
							titulo={tipo.label}
							sub_tipo={tipo.sub_tipo}
						/>
					</TabsContent>
				))}
			</Tabs>
		</article>
	);
}
