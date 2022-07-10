import { mock, Random } from 'mockjs'
const user = mock({
  'user|10': [
    {
      id: (Math.random() * 1000).toFixed(0),
      name: () => Random.name(),
      realName: '真实姓名',
      cellphone: 123456789,
      enable: 1,
      departmentId: 2,
      roleId: 3,
      createAt: '2021-05-02 14:03',
      updateAt: '2021-05-02 14:03',
    },
  ],
})

export default user
