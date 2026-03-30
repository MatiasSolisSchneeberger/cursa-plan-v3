import { useEffect } from "react"

export const usePageTitle = (title: string, suffix: boolean = true) => {
    useEffect(() => {
        document.title = suffix ? `${title} - CursaPlan` : title
        return () => {
            document.title = "CursaPlan"
        }
    }, [suffix, title])
}
