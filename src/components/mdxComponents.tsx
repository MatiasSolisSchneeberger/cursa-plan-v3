import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { IconAlertCircle, IconCheck } from "@tabler/icons-react";

// Definimos el objeto con el mapeo de etiquetas -> componentes
export const mdxComponents = {
	// --- Títulos ---
	h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h2
			className="text-text-900 dark:text-text-100 texto-headline border-background-300 dark:border-background-700 mb-4 border-b-2 pb-1 text-balance"
			{...props}
		/>
	),
	h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h3
			className="text-text-800 dark:text-text-200 texto-title border-background-300 dark:border-background-700 mt-6 mb-3 border-b-2 pb-1"
			{...props}
		/>
	),

	// --- Texto y Listas ---
	p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
		<p
			className="text-text-800 dark:text-text-200 texto-body mb-4 leading-relaxed text-pretty"
			{...props}
		/>
	),
	ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
		<ul
			className="text-text-800 dark:text-text-200 texto-body mb-4 ml-4 list-inside list-disc space-y-1"
			{...props}
		/>
	),
	ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
		<ol
			className="text-text-800 dark:text-text-200 texto-body mb-4 ml-4 list-inside list-decimal space-y-1"
			{...props}
		/>
	),
	li: (props: React.HTMLAttributes<HTMLLIElement>) => (
		<li
			className="marker:text-primary-600 dark:marker:text-primary-400 pl-1"
			{...props}
		/>
	),

	// --- Elementos Especiales ---
	blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
		<blockquote
			className="border-primary-500 bg-background-50 dark:bg-background-900/50 text-text-600 dark:text-text-400 my-6 rounded-r border-l-4 py-1 pl-4 italic"
			{...props}
		/>
	),
	code: (props: React.HTMLAttributes<HTMLElement>) => (
		<code
			className="bg-background-200 dark:bg-background-800 text-text-800 dark:text-text-200 border-text-200 dark:border-text-700 rounded border px-1.5 py-0.5 font-mono text-sm"
			{...props}
		/>
	),
	pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
		<pre
			className="bg-background-950 text-text-50 border-text-800 custom-scrollbar my-6 overflow-x-auto rounded-lg border p-4 font-mono text-sm shadow-inner"
			{...props}
		/>
	),

	// --- Tablas ---
	table: (props: React.HTMLAttributes<HTMLTableElement>) => (
		<div className="border-text-200 dark:border-text-800 my-6 overflow-x-auto rounded-lg border shadow-sm">
			<table
				className="divide-text-200 dark:divide-text-800 dark:bg-background-950 min-w-full divide-y bg-white"
				{...props}
			/>
		</div>
	),
	thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
		<thead
			className="bg-background-100 dark:bg-background-900"
			{...props}
		/>
	),
	tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
		<tbody
			className="divide-text-200 dark:divide-text-800 divide-y"
			{...props}
		/>
	),
	tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
		<tr
			className="hover:bg-background-50 dark:hover:bg-background-900/50 transition-colors"
			{...props}
		/>
	),
	th: (props: React.HTMLAttributes<HTMLTableHeaderCellElement>) => (
		<th
			className="text-text-500 px-6 py-3 text-left text-xs font-bold tracking-wider uppercase"
			{...props}
		/>
	),
	td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
		<td
			className="text-text-700 dark:text-text-300 px-6 py-4 text-sm whitespace-nowrap"
			{...props}
		/>
	),
	a: (props: React.HTMLAttributes<HTMLAnchorElement>) => (
		<a
			className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium underline underline-offset-2 transition-colors"
			{...props}
		/>
	),
	hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
		<hr
			className="border-background-300 dark:border-background-700 my-6"
			{...props}
		/>
	),

	// Componentes personalizados
	Alert: Alert,
	Chip: Badge,
	IconAlertCircle: IconAlertCircle,
	IconCheck: IconCheck,
};
