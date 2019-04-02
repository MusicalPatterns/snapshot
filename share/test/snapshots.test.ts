import { compilePattern } from '@musical-patterns/compiler'
import { Preset } from '@musical-patterns/pattern'
import { Voice } from '@musical-patterns/performer'
import { ObjectOf } from '@musical-patterns/utilities'
import * as path from 'path'

describe('snapshots', () => {
    // tslint:disable-next-line no-require-imports
    const { pattern } = require('../src/indexForTest')
    // tslint:disable-next-line no-require-imports
    const snapshots: ObjectOf<Voice[]> = require('../snapshots')

    const presetsSnapshotTests: (presets: ObjectOf<Preset>) => Promise<void[]> =
        async (presets: ObjectOf<Preset>): Promise<void[]> =>
            Promise.all(Object.entries(presets)
                .map(async ([ presetName, preset ]: [ string, Preset ]) => {
                    it('initial stays locked down', async (done: DoneFn) => {
                        const { voices } = await compilePattern({ material: pattern.material, specs: preset.specs })
                        expect(JSON.parse(JSON.stringify(
                            voices,
                            undefined,
                            2,
                        )))
                            .toEqual(JSON.parse(JSON.stringify(snapshots[ presetName ], undefined, 2)))

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
            const { voices } = await compilePattern(pattern)
            expect(JSON.parse(JSON.stringify(
                voices,
                undefined,
                2,
            )))
                .toEqual(JSON.parse(JSON.stringify(snapshots.initial, undefined, 2)))

            done()
        })

        if (pattern.spec.presets) {
            presetsSnapshotTests(pattern.spec.presets)
                .then()
                .catch()
        }
    }
})
