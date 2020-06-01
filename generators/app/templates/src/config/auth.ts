export const auth = {
  providers: {
    wechat: {
      appId: 'xxxxxx',
      appKey: 'xxxxxx'
    },
    qq: {
      appId: 'xxxxxx',
      appKey: 'xxxxxx'
    }
  },
  roles: {
    all: ['super', 'admin', 'user'],
    default: ['user']
  },

  expires: 60 * 60 *1 //一天
}