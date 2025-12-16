export const GET_CARRERA_QUERY = `
  query GetCarreraCompleta($slug: String!) {
  carrerasCollection(filter: {slug: {eq: $slug}}) {
    edges {
      node {
        id
        nombre
        slug
        emojie
        planes: plan_estudioCollection(first: 5) {
          edges {
            node {
              id
              anio_inicio
              anio_fin
              materias_plan: materia_planCollection(first: 100) {
                edges {
                  node {
                    id
                    anio
                    nro_periodo
                    nro_optativa
                    orientacion: orientaciones {
                      id
                      nombre
                      slug 
                    }
                    periodo: periodo {
                      id
                      nombre: periodo
                    }
                    detalle: materias {
                      id
                      nombre
                      slug
                    }
                    correlativas: correlativasCollection(first: 50) {
                      edges {
                        node {
                          tipo: tipo_requisito
                          condicion
                          porcentaje
                          notas
                          requisito: materias {
                            nombre
                            slug
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`