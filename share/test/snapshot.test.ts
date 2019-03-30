import { compilePattern } from '@musical-patterns/compiler'
import * as path from 'path'

describe('snapshot', () => {
    // tslint:disable-next-line no-require-imports
    const { pattern } = require('../src/indexForTest')
    const snapshot = require('../snapshot')

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
            expect(JSON.parse(JSON.stringify(
                await compilePattern(pattern),
                undefined,
                2,
            )))
                .toEqual(JSON.parse(JSON.stringify(snapshot, undefined, 2)))

            done()
        })
    }
})
