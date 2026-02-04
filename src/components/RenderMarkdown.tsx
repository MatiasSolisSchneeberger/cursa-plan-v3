import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export const RenderMarkdown = ({content}: {content: string}) => {
	return (
		<ReactMarkdown
			remarkPlugins={[remarkGfm]}
			components={{
				h1: ({children}) => (
					<h1 className="text-text-950 dark:text-text-50 texto-display text-center mb-6">{children}</h1>
				),
				h2: ({children}) => (
					<h2 className="text-text-900 dark:text-text-100 texto-headline text-center my-4 text-balance">{children}</h2>
				),
				h3: ({children}) => <h3 className="text-text-800 dark:text-text-200 texto-title my-3">{children}</h3>,
				p: ({children}) => (
					<p className="text-text-700 dark:text-text-300 texto-body mb-4 leading-relaxed text-pretty">{children}</p>
				),
				ul: ({children}) => (
					<ul className="list-disc list-inside space-y-1 mb-4 ml-4 text-text-700 dark:text-text-300 texto-body">
						{children}
					</ul>
				),
				ol: ({children}) => (
					<ol className="list-decimal list-inside space-y-1 mb-4 ml-4 text-text-700 dark:text-text-300 texto-body">
						{children}
					</ol>
				),
				li: ({children}) => <li className="pl-2 marker:text-primary-500">{children}</li>,
				blockquote: ({children}) => (
					<blockquote className="relative w-full rounded-md p-4 shadow-sm my-6 bg-primary-200 dark:bg-primary-800 border-l-4 texto-label border-primary-600 text-primary-700 dark:text-primary-300">
						{children}
					</blockquote>
				),
				a: ({children, href}) => {
					const isExternal = href?.startsWith("http")
					return (
						<a
							href={href}
							target={isExternal ? "_blank" : "_self"}
							rel={isExternal ? "noopener noreferrer" : undefined}
							className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 underline underline-offset-2 transition-colors font-semibold">
							{children}
						</a>
					)
				},
				hr: () => <hr className="my-8 border-t border-text-200 dark:border-text-800" />,
				strong: ({children}) => <strong className="font-bold text-text-900 dark:text-text-100">{children}</strong>,
				em: ({children}) => <em className="italic text-text-800 dark:text-text-200">{children}</em>,
				img: ({src, alt}) => (
					<img
						src={src}
						alt={alt}
						className="rounded-lg shadow-md max-w-full h-auto mx-auto my-6 border border-text-200 dark:border-text-800"
					/>
				),
				code: ({children, className}) => {
					// Check if it's an inline code block (no className usually) or a block code block (handled by pre? actually react-markdown puts block code in pre > code)
					// If it's inline, we want a small badge style.
					// If it's inside a pre (which we handle separately), we might want to let the pre handle the container.
					// However, react-markdown renders ``` as <pre><code>...</code></pre>.
					// So `code` component receives the content.
					const isBlock = className?.includes("language-")
					return (
						<code
							className={`${
								className || ""
							} ${isBlock ? "bg-transparent text-inherit" : "bg-background-200 dark:bg-background-800 rounded px-1.5 py-0.5 font-mono text-sm text-text-800 dark:text-text-200 border border-text-200 dark:border-text-700"}`}>
							{children}
						</code>
					)
				},
				pre: ({children}) => (
					<pre className="bg-background-950 text-text-50 p-4 rounded-lg overflow-x-auto my-6 font-mono text-sm shadow-inner border border-text-800 custom-scrollbar">
						{children}
					</pre>
				),
				table: ({children}) => (
					<div className="overflow-x-auto my-6 rounded-lg border border-text-200 dark:border-text-800 shadow-sm">
						<table className="min-w-full divide-y divide-text-200 dark:divide-text-800 bg-white dark:bg-background-950">
							{children}
						</table>
					</div>
				),
				thead: ({children}) => <thead className="bg-background-100 dark:bg-background-900">{children}</thead>,
				tbody: ({children}) => <tbody className="divide-y divide-text-200 dark:divide-text-800">{children}</tbody>,
				tr: ({children}) => (
					<tr className="hover:bg-background-50 dark:hover:bg-background-900/50 transition-colors">{children}</tr>
				),
				th: ({children}) => (
					<th className="px-6 py-3 text-left text-xs font-medium text-text-500 dark:text-text-400 uppercase tracking-wider">
						{children}
					</th>
				),
				td: ({children}) => (
					<td className="px-6 py-4 whitespace-nowrap text-sm text-text-700 dark:text-text-300">{children}</td>
				),
			}}>
			{content}
		</ReactMarkdown>
	)
}
