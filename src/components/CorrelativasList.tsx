import { IconLetterA, IconLetterR } from "@tabler/icons-react";
import CardInfoList from "./CardInfoList";
import { estados } from "@/utils/materiaConstants";
import { useSimulador } from "@/context/SimuladorContextData";
import Chip from "./Chip";
import MenuItem from "./MenuItem";
import MenuGroup from "./MenuGroup";
import type { GrupoCorrelativa } from "@/types/db";

interface Props {
	correlativas?: GrupoCorrelativa[];
}

export default function CorrelativasList({ correlativas }: Props) {
	const { getEstado } = useSimulador();

	const getConfig = (estado: string) =>
		estados.find((e) => e.texto === estado);

	if (!correlativas || correlativas.length === 0) return null;

	return (
		<div className="flex flex-col gap-2">
			{correlativas.map((grupo) => (
				<CardInfoList
					key={grupo.tipo}
					color="secondary"
					className=""
					title={`Para ${grupo.tipo}`}
				>
					{grupo.condiciones.map((cond, i) => (
						<MenuGroup
							key={i}
							title={
								cond.tipo === "materia"
									? cond.condicion
										? cond.condicion
												.charAt(0)
												.toUpperCase() +
											cond.condicion.slice(1)
										: "Requisito"
									: cond.tipo.charAt(0).toUpperCase() +
										cond.tipo.slice(1)
							}
							className={
								cond.condicion === "regular"
									? "[&>span]:text-warning-500"
									: cond.condicion === "aprobado"
										? "[&>span]:text-success-500"
										: cond.condicion === "optativo"
											? "[&>span]:text-info-500"
											: ""
							}
						>
							{cond.requisitos.map((req, j) => {
								let chipEstado = null;
								let isSatisfied = false;

								// Lógica para mostrar estado del requisito
								if ("id" in req && req.id) {
									const est = getEstado(req.id); // El context busca en ambos campos
									if (est && est !== "Sin cursar") {
										const conf = getConfig(est);

										// Lógica de jerarquía: Regular < Aprobado
										const condicionRequerida =
											cond.condicion?.toLowerCase();
										if (condicionRequerida) {
											if (
												condicionRequerida === "regular"
											) {
												if (
													est === "Regular" ||
													est === "Aprobado"
												) {
													isSatisfied = true;
												}
											} else if (
												condicionRequerida ===
												"aprobado"
											) {
												if (est === "Aprobado") {
													isSatisfied = true;
												}
											}
										}

										if (conf) {
											chipEstado = (
												<Chip
													color={conf.color}
													selected={isSatisfied}
													className="pointer-events-none ml-2 h-5 min-h-0 px-2 py-0 text-[10px]"
												>
													{conf.texto}
												</Chip>
											);
										}
									}
								}

								return (
									<MenuItem
										key={j}
										chip={chipEstado}
										iconLeft={
											cond.condicion === "regular" ? (
												<IconLetterR size={20} />
											) : cond.condicion ===
											  "aprobado" ? (
												<IconLetterA size={20} />
											) : null
										}
									>
										{"nombre" in req
											? req.nombre
											: "porcentaje" in req
												? `${req.porcentaje}%`
												: "nota" in req
													? `Nota: ${req.nota}`
													: ""}
									</MenuItem>
								);
							})}
						</MenuGroup>
					))}
				</CardInfoList>
			))}
		</div>
	);
}
