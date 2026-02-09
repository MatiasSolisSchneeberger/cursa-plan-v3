import WorkInProgress from "../../components/WorkInProgress"

export default function Cursos() {
	return (
		<section className="flex flex-col gap-3">
			<WorkInProgress
				moreDescription={`Esta seccion se listaran todas tus materias. Filtradas por "Cursando", "Regulares" y "Aprobadas".`}
			/>
		</section>
	)
}
