import * as React from "react";
import { Item, ItemTitle, ItemDescription } from "./ui/item";
import { Separator } from "./ui/separator";
import type {
	Condicion,
	RequisitoMateria,
	RequisitoPorcentaje,
	RequisitoNota,
} from "../types/db";
import { useSimulador } from "../context/SimuladorContextData";
import { IconCheck, IconLock } from "@tabler/icons-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface ListadoRequisitosProps {
	condiciones: Condicion[];
}

export function ListadoRequisitos({ condiciones }: ListadoRequisitosProps) {
	const materiasRegulares: RequisitoMateria[] = [];
	const materiasAprobadas: RequisitoMateria[] = [];
	const materiasOtros: { condicion: string; materia: RequisitoMateria }[] =
		[];
	const porcentajes: { condicion: string; requisito: RequisitoPorcentaje }[] =
		[];
	const notas: RequisitoNota[] = [];

	condiciones.forEach((cond) => {
		if (cond.tipo === "materia") {
			const condicionRequerida = cond.condicion?.toLowerCase() || "";
			cond.requisitos.forEach((req) => {
				const reqMateria = req as RequisitoMateria;
				if (condicionRequerida === "regular") {
					materiasRegulares.push(reqMateria);
				} else if (condicionRequerida === "aprobado") {
					materiasAprobadas.push(reqMateria);
				} else {
					materiasOtros.push({
						condicion: cond.condicion || "",
						materia: reqMateria,
					});
				}
			});
		} else if (cond.tipo === "porcentaje") {
			cond.requisitos.forEach((req) =>
				porcentajes.push({
					condicion: cond.condicion || "",
					requisito: req as RequisitoPorcentaje,
				}),
			);
		} else if (cond.tipo === "nota") {
			cond.requisitos.forEach((req) => notas.push(req as RequisitoNota));
		}
	});

	const renderSection = (title: string, items: React.ReactNode[]) => {
		if (items.length === 0) return null;
		return (
			<div className="mt-2 flex w-full flex-col gap-2">
				<div className="text-muted-foreground text-xs font-semibold uppercase">
					{title}
				</div>
				{items}
			</div>
		);
	};

	const { getEstado } = useSimulador();

	const isRequirementMet = (
		reqId: number | undefined,
		expectedState: "regular" | "aprobado",
	) => {
		if (!reqId) return false;
		const currentState = getEstado(reqId);
		if (!currentState || currentState === "Sin cursar") return false;
		if (expectedState === "aprobado") {
			return currentState === "Aprobado";
		}
		return currentState === "Regular" || currentState === "Aprobado";
	};

	const RequirementIcon = ({ isMet }: { isMet: boolean }) => {
		if (isMet) {
			return (
				<Tooltip>
					<TooltipTrigger>
						<IconCheck
							className="shrink-0 text-green-500"
							size={16}
						/>
					</TooltipTrigger>
					<TooltipContent>
						<p>Cumplís con el requisito</p>
					</TooltipContent>
				</Tooltip>
			);
		}
		return (
			<Tooltip>
				<TooltipTrigger>
					<IconLock
						className="text-muted-foreground shrink-0"
						size={16}
					/>
				</TooltipTrigger>
				<TooltipContent>
					<p>No cumplís con el requisito</p>
				</TooltipContent>
			</Tooltip>
		);
	};

	const itemsRegulares = materiasRegulares.map((m, i) => {
		const isMet = isRequirementMet(m.id, "regular");
		return (
			<Item key={`reg-${i}`} size="sm" className="bg-muted/30 w-full">
				<RequirementIcon isMet={isMet} />
				<ItemTitle>{m.nombre}</ItemTitle>
			</Item>
		);
	});

	const itemsAprobadas = materiasAprobadas.map((m, i) => {
		const isMet = isRequirementMet(m.id, "aprobado");
		return (
			<Item key={`apr-${i}`} size="sm" className="bg-muted/30 w-full">
				<RequirementIcon isMet={isMet} />
				<ItemTitle>{m.nombre}</ItemTitle>
			</Item>
		);
	});

	const itemsPorcentaje = porcentajes.map((p, i) => (
		<Item key={`porc-${i}`} size="sm" className="bg-muted/30 w-full">
			<div className="flex w-full flex-col gap-1">
				<ItemTitle>{p.requisito.porcentaje}%</ItemTitle>
				{p.condicion && (
					<ItemDescription className="flex-wrap text-start text-xs whitespace-normal capitalize">
						{p.condicion}
					</ItemDescription>
				)}
			</div>
		</Item>
	));

	const itemsNotas = notas.map((n, i) => (
		<Item key={`nota-${i}`} size="sm" className="bg-muted/30 w-full">
			<ItemTitle>Nota mayor o igual a {n.nota}</ItemTitle>
		</Item>
	));

	const itemsOtros = materiasOtros.map((o, i) => {
		const expectedType =
			o.condicion?.toLowerCase() === "aprobado" ? "aprobado" : "regular";
		const isMet = isRequirementMet(o.materia.id, expectedType);
		return (
			<Item key={`otro-${i}`} size="sm" className="bg-muted/30 w-full">
				<RequirementIcon isMet={isMet} />
				<div className="flex w-full flex-col gap-1">
					<ItemTitle>{o.materia.nombre}</ItemTitle>
					<ItemDescription className="flex-wrap text-start text-xs whitespace-normal capitalize">
						{o.condicion}
					</ItemDescription>
				</div>
			</Item>
		);
	});

	const sections = [
		renderSection("Regulares", itemsRegulares),
		renderSection("Aprobadas", itemsAprobadas),
		renderSection("Porcentaje", itemsPorcentaje),
		renderSection("Notas", itemsNotas),
		renderSection("Otros", itemsOtros),
	].filter(Boolean);

	if (sections.length === 0) {
		return (
			<div className="text-muted-foreground py-2 text-center text-sm">
				No tiene requisitos.
			</div>
		);
	}

	return (
		<div className="flex w-full flex-col">
			{sections.map((section, idx) => (
				<React.Fragment key={idx}>
					{section}
					{idx < sections.length - 1 && (
						<Separator className="my-2" />
					)}
				</React.Fragment>
			))}
		</div>
	);
}
