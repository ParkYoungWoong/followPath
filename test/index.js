import FollowPath from '../src/';

const fp = new FollowPath({
  svg: '#svg',
  object: '#object',
  pathSelector: '#path',
  pathString: false,
  isIndicators: true
})

console.log(fp.initPath)