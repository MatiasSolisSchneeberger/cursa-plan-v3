
export interface SubItems {
    id: string
    label: string
    component?: React.ReactNode
}

export interface TabConfig {
    id: string
    label: string
    icon: React.ReactNode
    component?: React.ReactNode
    subItems?: SubItems[]
}
