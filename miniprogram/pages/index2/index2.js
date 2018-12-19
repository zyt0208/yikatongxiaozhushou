//index.js
const app = getApp()

Page({

  data: {//初始化数据
    userInfo: {},
    StudentNumber: '',
  },

  res: function (e) {
    const db = wx.cloud.database()//定义db
    const _ = db.command
    var that = this
    
     db.collection('student_number').where({
       StudentNumber: e.detail.value,
        
     })
      .get({
        success: res => {
          that.setData({
            queryResult: JSON.stringify(res.data, null, 2)//搜索成功后得到的数组
          })
          console.log('[数据库] [查询记录] 成功: ', res.data)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })//提示搜索失败
          console.error('[数据库] [查询记录] 失败：', err)
        }
      })
  },

  onLoad: function () {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

  },

})
