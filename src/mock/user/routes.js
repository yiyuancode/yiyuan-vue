import Mock from 'mockjs';

Mock.mock(`/routes`, 'get', () => {
  let result = {};
  result.code = 0;
  result.data = [
    {
      router: 'root',
      children: [
        {
          router: 'dashboard',
          icon : 'dashboard',
          children: [{
            router : 'workplace',
          }]
        },
      ]
    }
  ];
  return result;
});
