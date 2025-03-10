import * as migration_20250306_082746 from './20250306_082746';
import * as migration_20250306_100918 from './20250306_100918';
import * as migration_20250307_085954 from './20250307_085954';

export const migrations = [
  {
    up: migration_20250306_082746.up,
    down: migration_20250306_082746.down,
    name: '20250306_082746',
  },
  {
    up: migration_20250306_100918.up,
    down: migration_20250306_100918.down,
    name: '20250306_100918',
  },
  {
    up: migration_20250307_085954.up,
    down: migration_20250307_085954.down,
    name: '20250307_085954'
  },
];
