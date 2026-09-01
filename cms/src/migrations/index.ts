import * as migration_20260831_190822 from './20260831_190822';
import * as migration_20260901_073000 from './20260901_073000';

export const migrations = [
  {
    up: migration_20260831_190822.up,
    down: migration_20260831_190822.down,
    name: '20260831_190822'
  },
  {
    up: migration_20260901_073000.up,
    down: migration_20260901_073000.down,
    name: '20260901_073000'
  },
];
