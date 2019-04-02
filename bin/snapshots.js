const ESCAPE_COMPILER_NODE_MODULES_FOR_PATTERN_FOR_REQIRING = '../../../../'

require(`${ESCAPE_COMPILER_NODE_MODULES_FOR_PATTERN_FOR_REQIRING}test/mockDom`)
const { appendFileSync, existsSync, unlinkSync } = require('fs')
const { compilePattern } = require('@musical-patterns/compiler')

const updateSnapshots = async () => {
    const { pattern } = require(`${ESCAPE_COMPILER_NODE_MODULES_FOR_PATTERN_FOR_REQIRING}src`)

    const { voices: initialVoices } = await compilePattern(pattern)
    const snapshots = {
        initial: initialVoices
    }
    if (pattern.spec.presets) {
        await Promise.all(Object.entries(pattern.spec.presets).map(async ([ presetName, preset ]) => {
            const { voices } = await compilePattern({ material: pattern.material, specs: preset.specs })
            snapshots[ presetName ] = voices
        }))
    }

    const snapshotsFile = 'snapshots.json'
    existsSync(snapshotsFile) && unlinkSync(snapshotsFile)
    appendFileSync(snapshotsFile, JSON.stringify(snapshots, null, 2))
}

updateSnapshots()
    .then()
    .catch()
