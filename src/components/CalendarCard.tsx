// src/components/CalendarCard.tsx
import {useState, useMemo} from "react"
import {IconChevronLeft, IconChevronRight} from "@tabler/icons-react"
import CalendarDay, {type CalendarColor} from "./CalendarDay"
import Card from "./Card"
import CardHeader from "./CardHeader"
import CardBody from "./CardBody"
import ButtonIcon from "./ButtonIcon"
import {cn} from "../utils/cn"
import CardFooter from "./CardFooter"
import CardInfoList from "./CardInfoList"
import MenuGroup from "./MenuGroup"
import MenuItem from "./MenuItem"
import Chip from "./Chip"
import ToolTip from "./ToolTip"

// --- TIPOS NUEVOS Y MÁS LIMPIOS ---
export interface CalendarEvent {
	id?: string
	title: string
	start: Date
	end?: Date // Opcional. Si no existe, es evento de un día.
	color?: CalendarColor
	note?: string
	period?: string
	eventType?: string
	isSuspended?: boolean
}

interface CalendarCardProps {
	month?: Date
	events?: CalendarEvent[]
	className?: string
	onMonthChange?: (date: Date) => void
	hasNavigation?: boolean
}

export default function CalendarCard({
	month = new Date(),
	events = [],
	className,
	onMonthChange,
	hasNavigation = true,
}: CalendarCardProps) {
	const [currentMonth, setCurrentMonth] = useState(month)

	// Sincronizar estado si cambia la prop
	// (Opcional, depende si quieres control total desde fuera o interno)
	/* useEffect(() => setCurrentMonth(month), [month]) */

	// --- CÁLCULOS DE FECHA ---
	const year = currentMonth.getFullYear()
	const mesIndex = currentMonth.getMonth()

	// Primer día de la semana del mes (0 = Domingo, 1 = Lunes...)
	const firstDayOfWeek = new Date(year, mesIndex, 1).getDay()
	const daysInMonth = new Date(year, mesIndex + 1, 0).getDate()

	// --- OPTIMIZACIÓN DE EVENTOS (LOOKUP) ---
	// Pre-calculamos qué pasa en cada día para no iterar el array events X veces.
	// Usamos useMemo para que solo corra si cambian los eventos o el mes.
	const daysData = useMemo(() => {
		const map = new Map<
			number,
			{
				isSelected: boolean
				isRangeStart: boolean
				isRangeEnd: boolean
				isRangeMiddle: boolean
				color: CalendarColor
				title: string
			}
		>()

		events.forEach((event) => {
			const eventStart = new Date(event.start)
			const eventEnd = event.end ? new Date(event.end) : eventStart // Si no hay fin, el fin es el inicio

			// Filtro rápido: Si el evento no toca este mes, lo ignoramos.
			// (Lógica simplificada, verifica solapamiento de rangos)
			const monthStart = new Date(year, mesIndex, 1)
			const monthEnd = new Date(year, mesIndex, daysInMonth)

			if (eventEnd < monthStart || eventStart > monthEnd) return

			// Normalizamos las fechas para iterar solo días
			// Clamping: Si el evento empieza antes del mes, pintamos desde el día 1
			const startDay = eventStart < monthStart ? 1 : eventStart.getDate()
			const endDay = eventEnd > monthEnd ? daysInMonth : eventEnd.getDate()

			// Verificamos si realmente cae en este mes y año
			const isStartInMonth = eventStart.getMonth() === mesIndex && eventStart.getFullYear() === year
			const isEndInMonth = eventEnd.getMonth() === mesIndex && eventEnd.getFullYear() === year

			for (let d = startDay; d <= endDay; d++) {
				const isStart = isStartInMonth && d === eventStart.getDate()
				const isEnd = isEndInMonth && d === eventEnd.getDate()

				// Si es un solo día
				const isSingleDay = isStart && isEnd

				// Prioridad de renderizado: El último evento sobreescribe (puedes cambiar lógica para arrays)
				map.set(d, {
					isSelected: isSingleDay, // Solo es "selected" si es un punto único
					isRangeStart: isStart && !isSingleDay,
					isRangeEnd: isEnd && !isSingleDay,
					isRangeMiddle: !isStart && !isEnd,
					color: event.color || "primary",
					title: event.title,
				})
			}
		})
		return map
	}, [events, year, mesIndex, daysInMonth])

	// --- AGRUPAR EVENTOS POR TIPO PARA EL CARD FOOTER ---
	const groupedEvents = useMemo(() => {
		const monthStart = new Date(year, mesIndex, 1)
		const monthEnd = new Date(year, mesIndex, daysInMonth)

		// Filtramos eventos del mes
		const monthEvents = events.filter((event) => {
			const eventStart = new Date(event.start)
			const eventEnd = event.end ? new Date(event.end) : eventStart
			return eventEnd >= monthStart && eventStart <= monthEnd
		})

		// Agrupamos por eventType
		const groups: Record<string, CalendarEvent[]> = {}
		monthEvents.forEach((event) => {
			const type = event.eventType || "Eventos"
			if (!groups[type]) groups[type] = []
			groups[type].push(event)
		})

		return groups
	}, [events, year, mesIndex, daysInMonth])

	// --- HANDLERS ---
	const handlePrev = () => {
		const newDate = new Date(year, mesIndex - 1, 1)
		setCurrentMonth(newDate)
		onMonthChange?.(newDate)
	}
	const handleNext = () => {
		const newDate = new Date(year, mesIndex + 1, 1)
		setCurrentMonth(newDate)
		onMonthChange?.(newDate)
	}

	const weekDays = ["D", "L", "M", "M", "J", "V", "S"]

	return (
		<Card
			className={cn(
				"w-full max-w-sm h-fit *:border-b-2 *:border-background-300 *:dark:border-background-700 *:first:border-0 *:last:border-0",
				className,
			)}>
			<CardHeader color="primary" className="capitalize">
				{hasNavigation && (
					<ButtonIcon variant="flat" onClick={handlePrev}>
						<IconChevronLeft size={20} />
					</ButtonIcon>
				)}

				{hasNavigation ?
					currentMonth.toLocaleString("es-AR", {month: "long", year: "numeric"})
				:	currentMonth.toLocaleString("es-AR", {month: "long"})}

				{hasNavigation && (
					<ButtonIcon variant="flat" onClick={handleNext}>
						<IconChevronRight size={20} />
					</ButtonIcon>
				)}
			</CardHeader>

			<CardBody className="pb-2">
				{/* Cabecera de días */}
				<div className="grid grid-cols-7 mb-2 text-center">
					{weekDays.map((d, i) => (
						<span key={d + i} className="text-xs font-bold text-text-500 uppercase">
							{d}
						</span>
					))}
				</div>

				{/* Grilla */}
				<div className={cn("grid grid-cols-7 gap-y-1")}>
					{/* Espaciadores iniciales */}
					{Array.from({length: firstDayOfWeek}).map((_, i) => (
						<div key={`empty-${i}`} />
					))}

					{/* Días */}
					{Array.from({length: daysInMonth}).map((_, i) => {
						const dayNum = i + 1
						const data = daysData.get(dayNum)
						const isToday =
							new Date().getDate() === dayNum &&
							new Date().getMonth() === mesIndex &&
							new Date(2026, mesIndex, dayNum).getFullYear() === year

						return (
							<CalendarDay
								key={dayNum}
								title={data?.title}
								day={dayNum}
								isToday={isToday}
								isSelected={data?.isSelected}
								isRangeStart={data?.isRangeStart}
								isRangeEnd={data?.isRangeEnd}
								isRangeMiddle={data?.isRangeMiddle}
								color={data?.color}
							/>
						)
					})}
				</div>
			</CardBody>
			{Object.keys(groupedEvents).length > 0 && (
				<CardFooter>
					<CardInfoList title="Mas Info">
						{Object.entries(groupedEvents).map(([type, events]) => (
							<MenuGroup key={type} title={type}>
								{events.map((event) => {
									const formatDate = (d: Date) => d.toLocaleString("es-AR", {day: "2-digit", month: "2-digit"})
									const isSameDay = !event.end || event.start.getTime() === event.end.getTime()
									const dateString =
										isSameDay ? formatDate(event.start) : `${formatDate(event.start)} - ${formatDate(event.end!)}`

									return (
										<MenuItem
											key={event.id}
											textHelp={event.isSuspended ? "Con suspensión de clases" : event.note}
											chip={
												event.note ?
													<ToolTip tooltip={event.note}>
														<Chip color="danger">*</Chip>
													</ToolTip>
												:	undefined
											}>
											<span className="text-primary-600 font-bold dark:text-primary-400">{dateString}</span> |{" "}
											{event.title}
										</MenuItem>
									)
								})}
							</MenuGroup>
						))}
					</CardInfoList>
				</CardFooter>
			)}
		</Card>
	)
}
