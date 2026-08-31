import * as migration_20260831_190822 from './20260831_190822';

export const migrations = [
  {
    up: migration_20260831_190822.up,
    down: migration_20260831_190822.down,
    name: '20260831_190822'
  },
];
