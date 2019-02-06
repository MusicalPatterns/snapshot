import { compilePattern } from '@musical-patterns/compiler'
import * as path from 'path'

describe('snapshot', () => {
    // tslint:disable-next-line:no-require-imports
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
            console.log('################ ACTUAL')
            console.log(JSON.stringify(
                await compilePattern({ material: pattern.material, spec: pattern.specData.initial }),
                undefined,
                2,
            ))
            console.log('################ EXPECTED')
            console.log(JSON.stringify(snapshot, undefined, 2))
            expect(JSON.stringify(
                await compilePattern({ material: pattern.material, spec: pattern.specData.initial }),
                undefined,
                2,
            ))
                .toEqual(JSON.stringify(snapshot, undefined, 2))

            done()
        })
    }
})
