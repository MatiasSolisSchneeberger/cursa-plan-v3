export interface CarrerasFav {
    id: number;
    plan: {
        anio_inicio: number;
        carrera: {
            nombre: string;
            slug: string;
            icon: string;
        };
    }
}