// tslint:disable:no-unsafe-any

// tslint:disable-next-line:no-implicit-dependencies
import { compilePattern } from '@musical-patterns/compiler'
import { PatternSpec, PatternSpecProperty, SettledPatternSpec } from '@musical-patterns/pattern'
import * as path from 'path'

const extractInitialSettledPatternSpec: (spec: PatternSpec) => SettledPatternSpec =
    (spec: PatternSpec): SettledPatternSpec =>
        Object.entries(spec)
            .reduce(
                (
                    initialSettledPatternSpec: SettledPatternSpec,
                    [ key, val ]: [ string, PatternSpecProperty ],
                ) => ({ ...initialSettledPatternSpec, [ key ]: val.initial }),
                {},
            )

describe('snapshot', () => {
    // tslint:disable-next-line:no-unsafe-any no-require-imports
    const { pattern, snapshot } = require('../src/indexForTest')

    if (!pattern) {
        const pathArray: string[] = path.dirname(__dirname)
            .split(path.sep)
        const submoduleCategory: string = pathArray[ pathArray.length - 2 ]

        if (submoduleCategory === 'patterns') {
            it('includes this test', () => {
                fail(`A pattern was not found. Ensure you are exporting the pattern from your 'src/indexForTest.ts'.`)
            })
        }
    }
    else {
        it('stays locked down', async (done: DoneFn) => {
            const { spec, material } = pattern
            const initialSettledPatternSpec: SettledPatternSpec = extractInitialSettledPatternSpec(spec)

            // tslint:disable-next-line:no-unsafe-any
            expect(JSON.stringify(await compilePattern({ material, spec: initialSettledPatternSpec }), undefined, 2))
                .toEqual(JSON.stringify(snapshot, undefined, 2))

            done()
        })
    }
})
