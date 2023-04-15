// @ts-check
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
import { nanoid } from 'nanoid';
import { TestEnvironment } from 'jest-environment-node';
import { fileURLToPath } from 'url';

// fix for 'How to fix "__dirname is not defined in ES module scope"'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prismaBinary = path.join(
    __dirname,
    '..',
    'node_modules',
    '.bin',
    'prisma'
);

class PrismaTestEnvironment extends TestEnvironment {
    /** @type {import('@jest/types').Config.ProjectConfig} */

    constructor(config, _context) {
        super(config, _context);

        this.dbName = `test_${nanoid()}.db`;
        process.env.DATABASE_URL = `file:${this.dbName}`;
        this.global.process.env.DATABASE_URL = `file:${this.dbName}`;
        this.dbPath = path.join(__dirname, this.dbName);
    }

    async setup() {
        execSync(`${prismaBinary} db push`);
        execSync(`${prismaBinary} db seed`);
        console.log(`Created test database ${this.dbName}`);
        return super.setup();
    }

    async teardown() {
        try {
            await fs.promises.unlink(this.dbPath);
        } catch (error) {
            // doesn't matter as the environment is torn down
        }
    }
}

export default PrismaTestEnvironment;
