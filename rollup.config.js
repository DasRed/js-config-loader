import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import clear from "rollup-plugin-clear";
import {terser} from "rollup-plugin-terser";

const babelOptionsES5 = {
    runtimeHelpers:  false,
    externalHelpers: false,
    babelrc:         false,
    presets:         [
        [
            "@babel/env",
            {
                targets: {
                    ie:      '11',
                    edge:    '17',
                    firefox: '60',
                    chrome:  '71',
                    safari:  '11.1',
                },
            }
        ]
    ],
    plugins:         [
        ["@babel/plugin-proposal-class-properties", {loose: true}],
        ["@babel/plugin-proposal-private-property-in-object", {loose: true}],
        ["@babel/plugin-proposal-private-methods", {loose: true}],
    ]
};

const babelOptionsES2018 = {
    runtimeHelpers:  false,
    externalHelpers: false,
    babelrc:         false,
    plugins:         [
        ["@babel/plugin-proposal-class-properties", {loose: true}],
        ["@babel/plugin-proposal-private-property-in-object", {loose: true}],
        ["@babel/plugin-proposal-private-methods", {loose: true}],
    ]
};

// https://rollupjs.org/guide/en#big-list-of-options
export default [
    // ES2015 Minified
    {
        input:   './src/index.js',
        output:  {
            file:      './dist/loader.min.js',
            format:    'umd',
            name:      'ConfigLoader',
            compact:   true,
            sourcemap: true,
        },
        plugins: [
            resolve(),
            clear({targets: ['./dist']}),
            babel(babelOptionsES5),
            terser(),
        ]
    },
    // ES2015 None-Minified
    {
        input:   './src/index.js',
        output:  {
            file:      './dist/loader.js',
            format:    'umd',
            name:      'ConfigLoader',
            compact:   false,
            sourcemap: true,
        },
        plugins: [
            resolve(),
            babel(babelOptionsES5),
        ]
    },
    // ES Modules Minified
    {
        input:   './src/index.js',
        output:  {
            file:      './dist/loader.esm.min.js',
            format:    'esm',
            compact:   true,
            sourcemap: true,
        },
        plugins: [
            resolve(),
            babel(babelOptionsES2018),
            terser(),
        ]
    },
    // ES Modules None-Minified
    {
        input:   './src/index.js',
        output:  {
            file:      './dist/loader.esm.js',
            format:    'esm',
            compact:   false,
            sourcemap: true,
        },
        plugins: [
            resolve(),
            babel(babelOptionsES2018),
        ]
    },
];
