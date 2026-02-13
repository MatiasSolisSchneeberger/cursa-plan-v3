import {
	IconCalendar,
	IconFile,
	IconFilePencil,
	IconHome,
	IconInfoCircleFilled,
	IconQuestionMark,
	IconUsers,
	IconSparkles,
	IconMail,
	IconBrandLinkedin,
	IconBrandGithub,
} from "@tabler/icons-react"

export const INTERNAL_LINKS = [
	{
		label: "Home",
		href: "/",
		icon: <IconHome />,
		category: "main",
	},
	{
		label: "Calendario",
		href: "/calendario",
		icon: <IconCalendar />,
		category: "main",
	},
	{
		label: "Novedades",
		href: "/novedades",
		icon: <IconSparkles />,
		category: "secondary",
	},
	{
		label: "Sobre Nosotros",
		href: "/sobre-nosotros",
		icon: <IconInfoCircleFilled />,
		category: "secondary",
	},
	{
		label: "Preguntas Frecuentes",
		href: "/preguntas-frecuentes",
		icon: <IconQuestionMark />,
		category: "secondary",
	},
	{
		label: "Contacto",
		href: "/contacto",
		icon: <IconUsers />,
		category: "secondary",
	},
	{
		label: "Términos y Condiciones",
		href: "/terminos-y-condiciones",
		icon: <IconFile />,
		category: "legal",
	},
	{
		label: "Política de Privacidad",
		href: "/politica-de-privacidad",
		icon: <IconFilePencil />,
		category: "legal",
	},
]

export const SOCIAL_LINKS = [
	{
		label: "Github",
		href: "https://github.com/MatiasSolisSchneeberger/cursa-plan-v3",
		icon: <IconBrandGithub />,
	},
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/matias-solis-schneeberger-40a6842ab",
		icon: <IconBrandLinkedin />,
	},
	{
		label: "cursaplan@gmail.com",
		href: "mailto:cursaplan@gmail.com",
		icon: <IconMail />,
	},
]

// Helper para obtener links por categoría si es necesario
export const getLinksByCategory = (category: string) => INTERNAL_LINKS.filter((link) => link.category === category)
