import os
""" 
Este script crea la estructura de carpetas para los planes de estudio. Para luego guardar ahí los archivos PDF de los planes de estudio.
"""
# Estructura de carpetas, carrera con sus respectivos planes de estudio
structure = {
    "bioquimica": [2009, 2025],
    "ingenieria-en-agrimensura": [2010],
    "ingenieria-electrica": [2012],
    "ingenieria-en-electronica": [2014, 2026],
    "licenciatura-en-ciencias-biologicas": [2014],
    "licenciatura-en-ciencias-fisicas": [2019],
    "licenciatura-en-ciencias-quimicas": [2022],
    "licenciatura-en-matematica": [2022],
    "licenciatura-en-sistemas-de-informacion": [2009, 2025],
    "profesorado-en-biologia": [2001],
    "profesorado-en-fisica": [2003],
    "profesorado-en-matematica": [2002],
    "profesorado-en-ciencias-quimicas-y-del-ambiente": [2016]
}

# Ruta base para la creación de carpetas
base_path = os.path.join("public", "docs")

def create_structure():
    # Crear directorio base si no existe
    if not os.path.exists(base_path):
        os.makedirs(base_path)
        print(f"Created base directory: {base_path}")

    for slug, years in structure.items():
        for year in years:
            # Construir la ruta: public/docs/[slug]/[year]
            year_path = os.path.join(base_path, slug, "plan-" + str(year))
            
            # Subdirectorios a crear
            subdirs = ["modificaciones", "programas"]
            
            # Crear el directorio del año
            os.makedirs(year_path, exist_ok=True)
            print(f"Created directory: {year_path}")
            
            # Crear subdirectorios
            for subdir in subdirs:
                subdir_path = os.path.join(year_path, subdir)
                os.makedirs(subdir_path, exist_ok=True)
                print(f"Created directory: {subdir_path}")

if __name__ == "__main__":
    create_structure()
