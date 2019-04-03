import { compilePattern } from '@musical-patterns/compiler'
import { Preset } from '@musical-patterns/pattern'
import { ObjectOf } from '@musical-patterns/utilities'
import * as path from 'path'

describe('snapshots', () => {
    // tslint:disable-next-line no-require-imports
    const { pattern } = require('../src/indexForTest')

    const presetsSnapshotTests: (presets: ObjectOf<Preset>) => Promise<void[]> =
        async (presets: ObjectOf<Preset>): Promise<void[]> =>
            Promise.all(Object.entries(presets)
                .map(async ([ presetName, preset ]: [ string, Preset ]) => {
                    it(`${presetName} preset stays locked down`, async (done: DoneFn) => {
                        expect(JSON.parse(JSON.stringify(
                            await compilePattern({ material: pattern.material, specs: preset.specs }),
                            undefined,
                            2,
                        )))
                            .toEqual(JSON.parse(JSON.stringify(
                                // tslint:disable-next-line no-require-imports no-reaching-imports
                                require(`../snapshots/${presetName}`),
                                undefined,
                                2,
                            )))

                        done()
                    })
                }),
            )

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
        it('initial stays locked down', async (done: DoneFn) => {
            expect(JSON.parse(JSON.stringify(
                await compilePattern(pattern),
                undefined,
                2,
            )))
                .toEqual(JSON.parse(JSON.stringify(
                    // tslint:disable-next-line no-require-imports no-reaching-imports
                    require('../snapshots/initial'),
                    undefined,
                    2,
                )))

            done()
        })

        if (pattern.spec.presets) {
            presetsSnapshotTests(pattern.spec.presets)
                .then()
                .catch()
        }
    }
})
