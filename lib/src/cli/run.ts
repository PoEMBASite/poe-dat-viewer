#!/usr/bin/env node

import * as loaders from './bundle-loaders.js'
import { exportFiles } from './export-files.js'
import { exportTables } from './export-tables.js'
import type { ExportConfig } from './ExportConfig.js'
import * as fs from 'fs/promises'
import * as path from 'path'

;(async function main () {
  // Parse command line arguments for -c config file option
  const args = process.argv.slice(2)
  const configIndex = args.indexOf('-c')
  const configFile = configIndex !== -1 && configIndex + 1 < args.length 
    ? args[configIndex + 1]
    : 'config.json'
  const configPath = path.join(process.cwd(), configFile)

  const config: ExportConfig = JSON.parse(
    await fs.readFile(configPath, { encoding: 'utf-8' }))

  let loader: loaders.FileLoader
  if (config.patch) {
    loader = await loaders.FileLoader.create(
      await loaders.CdnBundleLoader.create(path.join(process.cwd(), '/.cache'), config.patch))
  } else if (config.steam) {
    loader = await loaders.FileLoader.create(
      new loaders.SteamBundleLoader(config.steam))
  } else {
    console.error('Should specify either "patch" or "steam" in config.json.')
    process.exit(1)
  }

  await exportFiles(config, path.join(process.cwd(), 'files'), loader)
  await exportTables(config, path.join(process.cwd(), 'tables'), loader)
})()
