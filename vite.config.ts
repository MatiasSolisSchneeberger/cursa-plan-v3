import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        tsconfigPaths(),
        {
            enforce: 'pre',
            ...mdx({
                providerImportSource: "@mdx-js/react",
                remarkPlugins: [
                    remarkFrontmatter, // Lee el YAML (--- title: hola ---)
                    [remarkMdxFrontmatter, { name: 'frontmatter' }] // Lo convierte a una const exportada
                ]
            })
        },
    ],
    assetsInclude: ['**/*.md']
})
