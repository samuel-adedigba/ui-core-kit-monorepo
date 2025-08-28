// rollup.config.js
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'
import json from '@rollup/plugin-json'
// import filesize from 'rollup-plugin-filesize';
// import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/index.cjs.js',
            format: 'cjs',
            exports: 'named',
            sourcemap: true,
        },
        { file: 'dist/index.esm.js', format: 'es', sourcemap: true },
    ],
    external: [
        'react',
        'react-dom',
        'tailwindcss',
        'fs',
        'path',
        'os',
        'util',
        'module',
        'crypto',
        // tailwindcss should NOT be external here
        // CSS should be built in, not expected from consumer
    ],
    onwarn(warning, warn) {
        if (
            [
                'CIRCULAR_DEPENDENCY',
                'THIS_IS_UNDEFINED',
                'UNUSED_EXTERNAL_IMPORT',
            ].includes(warning.code)
        )
            return
        warn(warning)
    },
    plugins: [
        peerDepsExternal(),
        resolve({ browser: true, extensions: ['.js', '.ts', '.tsx', '.json'] }),
        commonjs(),
        json(),
        typescript({
            tsconfig: './tsconfig.json',
            declaration: true,
            declarationDir: 'dist/types',
            emitDeclarationOnly: false,
        }),
        postcss({ extract: true, minimize: true }),
        // filesize(),
        // terser()
    ],
}
