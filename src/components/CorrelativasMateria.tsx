// src/components/CorrelativasMateria.tsx
import CardInfoList from "./CardInfoList"
import MenuGroup from "./MenuGroup"
import MenuItem from "./MenuItem"

interface Props {
	correlativas: any[]
}

export default function CorrelativasMateria({correlativas}: Props) {
	// Si no hay datos, no mostramos nada o un mensaje discreto
	if (!correlativas || correlativas.length === 0) {
		return <div className="texto-title text-text-600 dark:text-text-400 text-center">No tiene correlativas</div>
	}

	// Filtramos en memoria (equivalente a tus WHERE en el SQL)
	const paraCursar = correlativas.filter((c) => c.tipo_requisito === "cursar")
	const paraRendir = correlativas.filter((c) => c.tipo_requisito === "rendir")

	return (
		<div className="flex flex-col sm:flex-row gap-3 mt-3">
			{/* Grupo: Para Cursar */}
			{paraCursar.length > 0 && (
				<CardInfoList title="Para Cursar" color="info">
					<ListaPorCondicion items={paraCursar} />
				</CardInfoList>
			)}

			{/* Grupo: Para Rendir */}
			{paraRendir.length > 0 && (
				<CardInfoList title="Para Rendir" color="warning">
					<ListaPorCondicion items={paraRendir} />
				</CardInfoList>
			)}
		</div>
	)
}

// Subcomponente para renderizar Regular vs Aprobado
function ListaPorCondicion({items}: {items: any[]}) {
	const regulares = items.filter((c) => c.condicion === "regular")
	const aprobadas = items.filter((c) => c.condicion === "aprobado")

	return (
		<>
			{regulares.length > 0 && (
				<MenuGroup title="Requiere Regular">
					{regulares.map((c) => (
						<MenuItem key={c.id}>
							{c.requisito_materia?.nombre || "Materia desconocida"}
							{c.porcentaje && <span className="text-xs ml-2 opacity-70">({c.porcentaje}%)</span>}
						</MenuItem>
					))}
				</MenuGroup>
			)}

			{aprobadas.length > 0 && (
				<MenuGroup title="Requiere Aprobada">
					{aprobadas.map((c) => (
						<MenuItem key={c.id}>{c.requisito_materia?.nombre || "Materia desconocida"}</MenuItem>
					))}
				</MenuGroup>
			)}
		</>
	)
}
