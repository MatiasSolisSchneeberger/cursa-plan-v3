import {useParams, useNavigate} from "react-router-dom"
import {useState, useEffect, Suspense} from "react" // Quitamos lazy, usaremos import manual
import {IconLoader2} from "@tabler/icons-react"
import {MDXProvider} from "@mdx-js/react"
import {mdxComponents} from "../components/mdxComponents"
import CardHeader from "../components/CardHeader"
import Card from "../components/Card"
import CardBody from "../components/CardBody"

const mdxModules = import.meta.glob("./markdown/*.mdx")

export default function MdxPage() {
	const {filename} = useParams()
	const navigate = useNavigate()

	const [MdxContent, setMdxContent] = useState<React.ComponentType | null>(null)
	// Estado para guardar la metadata (título, fecha, etc.)
	const [metadata, setMetadata] = useState<Record<string, any> | null>(null)

	useEffect(() => {
		const path = `./markdown/${filename}.mdx`
		const loader = mdxModules[path]

		if (!loader) {
			navigate("/404", {replace: true})
			return
		}

		// Cargamos el módulo manualmente para sacar los datos
		loader().then((mod: any) => {
			// mod.default es el Componente MDX
			setMdxContent(() => mod.default)

			// mod.frontmatter son tus datos YAML
			setMetadata(mod.frontmatter)
		})

		return () => {
			setMdxContent(null)
			setMetadata(null)
		}
	}, [filename, navigate])

	if (!MdxContent)
		return (
			<div className="p-10 flex justify-center">
				<IconLoader2 className="animate-spin" />
			</div>
		)

	return (
		<section className="py-6 max-w-5xl mx-auto">
			<Card>
				{/* Ejemplo: Usar el título del frontmatter */}
				{metadata?.title && (
					<CardHeader color="primary" className="font-primary text-4xl leading-13 font-extrabold">
						{metadata.title}
					</CardHeader>
				)}
				<CardBody className="px-4">
					<Suspense fallback={<div>Cargando...</div>}>
						<MDXProvider components={mdxComponents}>
							<MdxContent />
						</MDXProvider>
					</Suspense>
				</CardBody>
			</Card>
		</section>
	)
}
