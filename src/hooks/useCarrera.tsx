import {useQuery} from "@tanstack/react-query"
import {getCarreraBySlug} from "../scripts/getCarreraBySlug"
import {transformarDatos} from "../scripts/transformData"

export function useCarrera(slug: string | undefined) {
	return useQuery({
		// 1. queryKey: ID único de esta petición.
		// Si 'slug' cambia, TanStack Query vuelve a ejecutar la query.
		queryKey: ["carrera", slug],
		// 2. queryFn: La función que se encarga de obtener los datos.
		queryFn: async () => {
			if (!slug) throw new Error("No se proporcionó un slug")

			const rawData = await getCarreraBySlug(slug)

			if (!rawData) throw new Error("No se encontró la carrera")

			return transformarDatos(rawData)
		},

		// 3. enabled: Indica si la query debe ejecutarse o no.
		// Si 'slug' es undefined, la query no se ejecuta.
		enabled: !!slug,

		// 4. Opcionales:
		// - retry: Indica cuántas veces se debe intentar la petición en caso de error.
		retry: 3,
		// - staleTime: Indica cuánto tiempo (en ms) se considera que los datos son "frescos".
		staleTime: 1000 * 60 * 10, // Los datos se consideran "frescos" durante 10 minutos.
	})
}
