import { mock, Random } from 'mockjs'
const info = mock({
  name: () => Random.name(),
  age: 18,
})

export default info
