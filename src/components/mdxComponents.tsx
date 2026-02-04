import Alert from "./Alert"
import Chip from "./Chip"
import {IconAlertCircle, IconCheck} from "@tabler/icons-react"

// Definimos el objeto con el mapeo de etiquetas -> componentes
export const mdxComponents = {
	// --- Títulos ---
	h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h2
			className="text-text-900 dark:text-text-100 texto-headline pb-1 border-b-2 border-background-300 dark:border-background-700 mb-4 text-balance"
			{...props}
		/>
	),
	h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h3
			className="text-text-800 dark:text-text-200 texto-title mt-6 mb-3 pb-1 border-b-2 border-background-300 dark:border-background-700 "
			{...props}
		/>
	),

	// --- Texto y Listas ---
	p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
		<p className="text-text-800 dark:text-text-200 texto-body mb-4 leading-relaxed text-pretty" {...props} />
	),
	ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
		<ul className="list-disc list-inside space-y-1 mb-4 ml-4 text-text-800 dark:text-text-200 texto-body" {...props} />
	),
	ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
		<ol
			className="list-decimal list-inside space-y-1 mb-4 ml-4 text-text-800 dark:text-text-200 texto-body"
			{...props}
		/>
	),
	li: (props: React.HTMLAttributes<HTMLLIElement>) => (
		<li className="pl-1 marker:text-primary-600 dark:marker:text-primary-400" {...props} />
	),

	// --- Elementos Especiales ---
	blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
		<blockquote
			className="border-l-4 border-primary-500 pl-4 py-1 my-6 italic bg-background-50 dark:bg-background-900/50 rounded-r text-text-600 dark:text-text-400"
			{...props}
		/>
	),
	code: (props: React.HTMLAttributes<HTMLElement>) => (
		<code
			className="bg-background-200 dark:bg-background-800 rounded px-1.5 py-0.5 font-mono text-sm text-text-800 dark:text-text-200 border border-text-200 dark:border-text-700"
			{...props}
		/>
	),
	pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
		<pre
			className="bg-background-950 text-text-50 p-4 rounded-lg overflow-x-auto my-6 font-mono text-sm shadow-inner border border-text-800 custom-scrollbar"
			{...props}
		/>
	),

	// --- Tablas ---
	table: (props: React.HTMLAttributes<HTMLTableElement>) => (
		<div className="overflow-x-auto my-6 rounded-lg border border-text-200 dark:border-text-800 shadow-sm">
			<table
				className="min-w-full divide-y divide-text-200 dark:divide-text-800 bg-white dark:bg-background-950"
				{...props}
			/>
		</div>
	),
	thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
		<thead className="bg-background-100 dark:bg-background-900" {...props} />
	),
	tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
		<tbody className="divide-y divide-text-200 dark:divide-text-800" {...props} />
	),
	tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
		<tr className="hover:bg-background-50 dark:hover:bg-background-900/50 transition-colors" {...props} />
	),
	th: (props: React.HTMLAttributes<HTMLTableHeaderCellElement>) => (
		<th className="px-6 py-3 text-left text-xs font-bold text-text-500 uppercase tracking-wider" {...props} />
	),
	td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
		<td className="px-6 py-4 whitespace-nowrap text-sm text-text-700 dark:text-text-300" {...props} />
	),
	a: (props: React.HTMLAttributes<HTMLAnchorElement>) => (
		<a
			className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 underline underline-offset-2 transition-colors font-medium"
			{...props}
		/>
	),
	hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
		<hr className="my-6 border-background-300 dark:border-background-700" {...props} />
	),

	// Componentes personalizados
	Alert: Alert,
	Chip: Chip,
	IconAlertCircle: IconAlertCircle,
	IconCheck: IconCheck,
}
