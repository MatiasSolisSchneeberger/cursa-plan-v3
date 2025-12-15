query GetCarreraBySlug($slug: String!) {
  carrerasCollection(filter: { slug: { eq: $slug } }) {
    edges {
      node {
        carrera: nombre
        id
        planes: plan_estudioCollection {
          edges {
            node {
              anio_inicio
              anio_fin
              id
              # Aquí obtenemos todas las materias del plan
              # Supabase no las agrupa por orientación/año automáticamente
              # Te devuelve la lista completa con sus etiquetas
              materias_raw: materia_planCollection {
                edges {
                  node {
                    id
                    anio
                    nro_periodo
                    nro_optativa
                    
                    # Datos de la Orientación
                    orientacion: orientaciones {
                      nombre
                      id
                    }
                    
                    # Datos del Periodo
                    info_periodo: periodo {
                      tipo_periodo: periodo
                      id
                    }
                    
                    # Datos de la Materia (Nombre, Slug)
                    detalle_materia: materias {
                      nombre
                      slug
                      id
                      # Si tuvieras créditos en la tabla materias, irían aquí
                    }
                    
                    # Correlativas (Linkeadas a materia_plan segun tu schema)
                    correlativas: correlativasCollection {
                      edges {
                        node {
                          tipo: tipo_requisito
                          condicion
                          porcentaje
                          notas
                          # Materia requisito (FK a tabla materias)
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