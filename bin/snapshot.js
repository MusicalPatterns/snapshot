const ESCAPE_COMPILER_NODE_MODULES_FOR_PATTERN_FOR_REQIRING = '../../../../'

require(`${ESCAPE_COMPILER_NODE_MODULES_FOR_PATTERN_FOR_REQIRING}test/mockDom`)
const { appendFileSync, existsSync, unlinkSync } = require('fs')
const { compilePattern } = require('@musical-patterns/compiler')

const updateSnapshot = async () => {
    const { pattern } = require(`${ESCAPE_COMPILER_NODE_MODULES_FOR_PATTERN_FOR_REQIRING}src`)
    const snapshot = await compilePattern({ material: pattern.material, spec: pattern.specData.specs.initial })

    const snapshotFile = 'src/snapshot.json'
    existsSync(snapshotFile) && unlinkSync(snapshotFile)
    appendFileSync(snapshotFile, JSON.stringify(snapshot, null, 2))
}

updateSnapshot()
    .then()
    .catch()
