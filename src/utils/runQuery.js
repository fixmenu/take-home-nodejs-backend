import {courseSync, userSync, userTableDrop} from './queryFunctions';

(async () => {
  await userTableDrop();
  await userSync();
  await courseSync();
})();
