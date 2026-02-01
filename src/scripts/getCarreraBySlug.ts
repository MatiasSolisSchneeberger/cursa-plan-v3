import supabase from '../utils/supabase'; // Tu configuración de supabase

export const getCarreraBySlug = async (slug: string) => {
    const { data, error } = await supabase
        .from('carreras')
        .select(`
            id,
            nombre,
            slug,
            planes:plan_estudio (
                id,
                anio_inicio,
                anio_fin,
                materias_plan:materia_plan (
                    id,
                    anio,
                    nro_periodo,
                    nro_optativa,
                    periodo: tipos_periodo ( id, slug, nombre ),
                    orientacion:tipos_orientaciones ( id, nombre , slug),
                    materia:materias ( id, nombre, slug ),
                    correlativas (
                        tipo_requisito,
                        condicion,
                        porcentaje,
                        notas,
                        requisito_materia:materias!requisito ( nombre, slug )
                )
                )
            )
        `)
        .eq('slug', slug)
        .single();

    if (error) throw error;
    return data;
};