export default function ButtonGroup({children}: {children: React.ReactNode}) {
	return (
		<section className="flex flex-row items-center justify-center self-stretch shrink-0 relative lg:overflow-visible h-min *:rounded-none *:first:rounded-l-xl *:last:rounded-r-xl *:not-disabled:hover:rounded-none *:first:not-disabled:hover:rounded-l-2xl *:last:not-disabled:hover:rounded-r-2xl">
			{children}
		</section>
	)
}
