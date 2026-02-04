import {useEffect, useState} from "react"
import {useParams, useNavigate} from "react-router-dom" // 1. Importa useNavigate
import {RenderMarkdown} from "../components/RenderMarkdown"

function MarkdownPage() {
	const {filename} = useParams()
	const [markdownContent, setMarkdownContent] = useState("")
	const navigate = useNavigate() // 2. Inicializa el hook

	useEffect(() => {
		fetch(`/markdown/${filename}.md`)
			.then((response) => {
				// 3. Verificación estricta
				// Si no es OK (200) O si el contenido parece ser HTML (error de SPA), es un 404
				const isHtml = response.headers.get("content-type")?.includes("text/html")

				if (!response.ok || isHtml) {
					throw new Error("Document not found")
				}
				return response.text()
			})
			.then((text) => setMarkdownContent(text))
			.catch(() => {
				// 4. Redirección correcta usando el hook
				navigate("/404", {replace: true})
			})

		return () => setMarkdownContent("")
	}, [filename, navigate])

	// Renderizado condicional para evitar parpadeos
	if (!markdownContent) return null // O un <Loading />

	return (
		<section className="flex flex-col gap-4 py-6 max-w-4xl mx-auto">
			<RenderMarkdown content={markdownContent} />
		</section>
	)
}

export default MarkdownPage
