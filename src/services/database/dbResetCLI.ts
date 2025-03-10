import { spawn } from 'child_process'
import path from 'path'
import dotenv from 'dotenv'
import fs from 'fs/promises'

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' })

/**
 * Prompts the user for a yes/no question and returns a promise that resolves to true for 'y' or false for 'n'
 * @param question The question to ask the user
 * @returns Promise<boolean> True for 'y', false for 'n'
 */
function promptYesNo(question: string): Promise<boolean> {
  return new Promise((resolve) => {
    process.stdout.write(`${question} (y/n): `)

    // Set stdin to raw mode to capture keystrokes without Enter
    process.stdin.setRawMode(true)
    process.stdin.resume()
    process.stdin.setEncoding('utf8')

    const onData = (data: string) => {
      // Normalize the input to lowercase
      const key = data.toString().toLowerCase()

      // Only accept y or n
      if (key === 'y' || key === 'n') {
        // Echo the key pressed
        process.stdout.write(key + '\n')

        // Clean up stdin
        process.stdin.setRawMode(false)
        process.stdin.pause()
        process.stdin.removeListener('data', onData)

        // Resolve with true for 'y', false for 'n'
        resolve(key === 'y')
      } else if (key === '\u0003') {
        // Handle Ctrl+C
        process.stdout.write('^C\n')
        process.exit(0)
      }
      // Ignore other keys
    }

    process.stdin.on('data', onData)
  })
}

async function databaseResetCLI() {
  try {
    // Check environment
    const isProd =
      process.env.NODE_ENV === 'production' ||
      process.env.VERCEL_ENV === 'production'

    // Check for appropriate database URL based on environment
    if (isProd && !process.env.POSTGRES_URL) {
      console.error(
        '❌ Production database URL (POSTGRES_URL) is not configured',
      )
      process.exit(1)
    }

    if (!isProd && !process.env.POSTGRES_URL_DEVELOPMENT) {
      console.error(
        '❌ Development database URL (POSTGRES_URL_DEVELOPMENT) is not configured',
      )
      process.exit(1)
    }

    // Warn about production database usage
    if (isProd) {
      console.log('⚠️  WARNING: You are about to reset the PRODUCTION database!')
      console.log('⚠️  This action cannot be undone!')
    }

    console.log('🔄 Starting database reset process...')

    // Get the migrations directory path
    const migrationsDir = path.join(
      process.cwd(),
      'src/services/database/migrations',
    )

    // Read all files in the migrations directory
    const files = await fs.readdir(migrationsDir)

    // Delete all files except index.ts
    for (const file of files) {
      if (file !== 'index.ts') {
        await fs.unlink(path.join(migrationsDir, file))
        console.log(`🗑️  Deleted migration file: ${file}`)
      }
    }

    // Reset the content of index.ts
    const indexContent = `export const migrations = [
  // Add migrations here
];
`
    await fs.writeFile(path.join(migrationsDir, 'index.ts'), indexContent)
    console.log('📝 Reset migrations index file')

    // Run migrate:fresh command
    console.log('🔄 Running migrate:fresh...')
    const migrate = spawn('pnpm', ['migrate:fresh'], {
      stdio: ['pipe', 'inherit', 'inherit'],
      env: {
        ...process.env,
      },
    })

    // Automatically answer 'y' to the prompt
    migrate.stdin.write('y\n')
    migrate.stdin.end()

    // Wait for the process to complete
    await new Promise((resolve, reject) => {
      migrate.on('close', (code) => {
        if (code === 0) {
          console.log('✅ Database reset completed successfully')
          resolve(code)
        } else {
          reject(new Error(`❌ migrate:fresh failed with code ${code}`))
        }
      })
    })

    // Prompt user to create a new migration
    const createMigration = await promptYesNo(
      'Do you want to create a new migration?',
    )

    if (!createMigration) {
      console.log('👋 Exiting without creating a migration')
      return
    }

    // Run migrate:create command
    console.log('🔄 Creating new migration...')
    const migrateCreate = spawn('pnpm', ['migrate:create'], {
      stdio: 'inherit',
      env: {
        ...process.env,
      },
    })

    // Wait for the migration creation to complete
    await new Promise((resolve, reject) => {
      migrateCreate.on('close', (code) => {
        if (code === 0) {
          console.log('✅ New migration created successfully')
          resolve(code)
        } else {
          reject(new Error(`❌ migrate:create failed with code ${code}`))
        }
      })
    })

    // Prompt user to run the migration
    const runMigration = await promptYesNo('Do you want to run this migration?')

    if (!runMigration) {
      console.log('👋 Exiting without running the migration')
      return
    }

    // Run migrate command
    console.log('🔄 Running migration...')
    const migrateRun = spawn('pnpm', ['migrate'], {
      stdio: 'inherit',
      env: {
        ...process.env,
      },
    })

    // Wait for the migration to complete
    await new Promise((resolve, reject) => {
      migrateRun.on('close', (code) => {
        if (code === 0) {
          console.log('✅ Migration completed successfully')
          console.log('🎉 All actions completed successfully:')
          console.log('   - Database reset')
          console.log('   - New migration created')
          console.log('   - Migration applied to database')
          resolve(code)
        } else {
          reject(new Error(`❌ migrate failed with code ${code}`))
        }
      })
    })
  } catch (error) {
    console.error('❌ Error during database operations:', error)
    process.exit(1)
  }
}

databaseResetCLI()
