//index.js
const app = getApp()

Page({
  
  data: {//初始化数据
    userInfo: {},
    StudentNumber:'',
  },

  res: function (e) {
    const db = wx.cloud.database()//定义db

    db.collection('student_number').add({//增加记录的函数

      data: {
        StudentNumber: e.detail.value,//输入学号
       
      },

      success: res => {// 在返回结果中会包含新创建的记录的 _id
        this.setData({
          StudentNumber: e.detail.value,
         
        })
        wx.showToast({
          title: '新增记录成功',//提示，下同
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)//控制台显示，下同
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }

    })

  },



  onLoad: function() {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    
  },

})
