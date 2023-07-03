import Mock from 'mockjs';
import { positions, avatars, admins } from '../common';

const Random = Mock.Random;

Random.extend({
  admin() {
    return this.pick(admins);
  },
  avatar() {
    return this.pick(avatars);
  },
  position() {
    return this.pick(positions);
  }
});
