declare module '*.mdx' {
    import { ComponentType } from 'react'

    // El componente por defecto
    let MDXComponent: ComponentType<any>
    export default MDXComponent

    // Los datos del frontmatter
    export const frontmatter: Record<string, any>
}