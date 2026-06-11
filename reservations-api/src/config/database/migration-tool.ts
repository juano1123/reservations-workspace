import { PreconditionFailedException } from '@nestjs/common';
import { exec } from 'child_process';

if (process.argv[2] == null || process.argv[2] == '') {
  throw new PreconditionFailedException('empty migration name');
}
const command = `pnpm build && pnpm typeorm migration:generate -d ./dist/config/database/data.source.js src/database/migrations/${process.argv[2]}`;
(() =>
  exec(command, (error, stdout, stderr) => {
    if (error !== null) {
      console.error(stderr);
    }
    console.log(stdout);
  }))();
