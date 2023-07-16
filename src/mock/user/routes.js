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
          icon: 'dashboard',
          children: [{
            router: 'workplace',
          }]
        },
        {
          icon: "security-scan",
          router: "sys",
          children: [{
            router: "tenant",
            children: [{
              router: "tenantList"
            }, {
              router: "tenantPackage"
            }]
          },
          {
            router: "user"
          }, {
            router: "role"
          },
          {
            router: "menu"
          }]
        }
      ]
    }
  ];
  return result;
});
