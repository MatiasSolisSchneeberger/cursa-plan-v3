# Base de datos

## Caracteristicas de la facultad

Esta es una descripcion que noté al haber leído todas las resoluciones de todos los planes de estudio vigentes de las carreras de la facultad.

La facutlad tiene: 
- Carreras. Cada carrera tiene: 
    - Planes. Cada plan tiene: 
        - Orientaciones. (Solo Lic. Biología) Cada orientacion tiene:
            - "Niveles". Cada nivel tiene, (hay la posibilidad de un titulo intermedio al terminar esto):
                - Años. Cada año tiene:
                    - Periodos. Cada periodo tiene:
                        - El numero de periodos. (1er y 2do cuatrimestre, 1er 2do y 3er trimestre):
                            - Materias. Cada materia tiene:
                                - Requisitos para cursar y otros para rendir (podes cursar y no rendir, pero no podes rendir sin haber tenido la posibilidad de cursar) los tipos de requisitos son:
                                  - Materia: tener en codicion de regular o aprobada la materia.
                                  - Porcentaje: tener un porcentaje minimo de algún requisito especifico. Ej: "50% de asignaturas de Ciclo Superior aprobadas (léase 3 asignaturas); Acreditación del Trabajo de Campo". 
                                  - Cantidad de materias en cierta condicion "5 espacios curriculares".
                                  - Poco claras: Ej: "Módulo 1 del Taller Integrador" o "Según resolución".
                                  - Van cambiando con los años y ya depende especificamente de la materia. (casi siempre se aplica a materias Optativas que van cambiando con los años)

## Problema que tengo a la hora de trabajar.

Quiero hacer un simulador de avances de materias para que el usuario pueda ver como se va con su plan de estudio. 

- como voy guardando el progreso? 
- como verifico que el usuario cumple con los requisitos para cursar y rendir una materia?
- El gran problema de las materias con requisitos que no sean materias o no son porcentajes de la carrera total (y son porcentajes de ciertas materias)
- siento que no es escalable

## Posibles soluciones que se me ocurren pero no sé como ejecutarlas

- habia visto un video que en la aplicacion que estaba desarrollando un YouTuber todas las propiedades de las notas (una especie de Notion) trataban todo como etiquetas, ya sea el autor de la nota, la fecha (entre otras), y el resto de etiquetas que el usuario quería agregar.

- darlo vuelta al problema, comenzar desde las materias y ahí ir poniendo a que año, carrera, periodo etc... pertenece. Contras: no tengo control de los ciclos de la carrera, ciclo basico,  orientado etc...el cual puede tener titulo intermedio.
- Preguntar como hacen en mi facultad para gestionar todo esto. (no me van a dar bola, creo que ni ellos saben como hacer, lo haran manual todo eso)

---

quisiera por lo menos las materias que tengan requisitos que son otras materias poderlo hacer, y no tomar en cuenta el resto y solo avisar al usuario que tenga cuidado con los otros requisitos.

