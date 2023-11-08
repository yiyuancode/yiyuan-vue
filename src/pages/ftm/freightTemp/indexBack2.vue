<template>
  <div>
    <canvas
      ref="canvas"
      :style="{
      width: '300px',
      height: '300px',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      margin: 'auto'
    }">
    </canvas>
    <div @click="start"> 转动</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        context: null,
        canvas: null,
        size: 10,
        canBeClick: true,
        awards: [
          {level: '特等奖', name: '我的亲笔签名', color: '#576c0a'},
          {level: '未中奖', name: '未中奖', color: '#ad4411'},
          {level: '一等奖', name: '玛莎拉蒂超级经典限量跑车', color: '#43ed04'},
          {level: '未中奖', name: '未中奖', color: '#d5ed1d'},
          {level: '二等奖', name: '辣条一包', color: '#32acc6'},
          {level: '未中奖', name: '未中奖', color: '#e06510'},
        ]

      };
    },
    mounted() {
      this.canvas = this.$refs.canvas
      this.context = this.canvas.getContext('2d')
      // 设置canvas的宽高
      this.canvas.width = 300
      this.canvas.height = 300

      // 保存当前画布的状态,使用restore调用后,保证了当前
      // 绘制不受之前绘制的影响
      this.context.save()
      // 新建一个路径,画笔的位置回到默认的坐标(0,0)的位置
      // 保证了当前的绘制不会影响到之前的绘制
      this.context.beginPath()
      // 设置填充转盘用的颜色,fill是填充而不是绘制.
      this.context.fillStyle = '#FD6961'
      // 绘制一个圆,有六个参数,分别表示:圆心的x坐标,圆心的
      // y坐标,圆的半径,开始绘制的角度,结束的角度,绘制方向
      // (false表示顺时针)
      this.context.arc(150, 150, 150, 0, Math.PI * 2, false)
      // 将我们设置的颜色填充到圆中,这里不用closePath是因
      // 为closePath对fill无效.
      this.context.fill()
      // 将画布的状态恢复到我们上一次save()时的状态
      this.context.restore()

      this.render()
      //绘制奖品区域
      // this.drawPrizeBlock()
      // this.drawButton();
      // this.drawArrow();
      // this.startRotate();
      // // 创建turntable对象,并将canvas元素和context传入
      // const turntable = new Turntable({canvas: canvas, context: context})

    },

    methods: {
      // modify
      //初始化
      render() {
        // this.drawPanel()
        this.drawPrizeBlock()
        this.drawButton()
        this.drawArrow()
        // this.canvas.addEventListener('mousedown', e => {
        //   // 只要抽奖没有结束，就不让再次抽奖
        //   if (!this.canBeClick) return
        //   this.canBeClick = false
        //   let loc = this.windowToCanvas(canvas, e)
        //   context.beginPath()
        //   context.arc(150, 150, 30, 0, Math.PI * 2, false)
        //   if (context.isPointInPath(loc.x, loc.y)) {
        //     // 每次点击抽奖，我们都将初始化角度重置
        //     this.startRadian = 0
        //     // distance是我们计算出的将指定奖品旋转到指针处需要旋转的角度距离，distanceToStop下面会又说明
        //     const distance = this.distanceToStop()
        //     this.rotatePanel(distance)
        //   }
        // })


        // this.startRotate();
      },
      start() {
        console.log("123start")
        for (let i=0; i<this.size;i++){
          // this.context.closePath();
          this.context.translate(100,100)
          this.context.rotate(60 * Math.PI / 180);
        }

      },
      drawPrizeBlock() {
        const context = this.context
        // 第一个奖品色块开始绘制时开始的弧度及结束的弧度,因为我们这里
        // 暂时固定设置为6个奖品,所以以6为基数
        let startRadian = 0, RadianGap = Math.PI * 2 / this.size,
          endRadian = startRadian + RadianGap
        for (let i = 0; i < this.size; i++) {
          context.save()
          context.beginPath()
          // 为了区分不同的色块,我们使用随机生成的颜色作为色块的填充色
          context.fillStyle = '#' + Math.floor(Math.random() * 16777215).toString(16)
          // 这里需要使用moveTo方法将初始位置定位在圆点处,这样绘制的圆
          // 弧都会以圆点作为闭合点,下面有使用moveTo和不使用moveTo的对比图
          context.moveTo(150, 150)
          // 画圆弧时,每次都会自动调用moveTo,将画笔移动到圆弧的起点,半
          // 径我们设置的比转盘稍小一点
          context.arc(150, 150, 140, startRadian, endRadian, false)
          // 每个奖品色块绘制完后,下个奖品的弧度会递增
          startRadian += RadianGap
          endRadian += RadianGap
          context.fill()
          context.restore()
        }
      },
      // add
// 绘制按钮，以及按钮上start的文字，这里没有新的点，不再赘述
      drawButton() {
        const context = this.context
        context.save()
        context.beginPath()
        context.fillStyle = '#FF0000'
        context.arc(150, 150, 30, 0, Math.PI * 2, false)
        context.fill()
        context.restore()

        context.save()
        context.beginPath()
        context.fillStyle = '#FFF'
        context.font = '16px Arial'
        context.translate(150, 150)
        context.fillText('Start', -context.measureText('Start').width / 2, 8)
        context.restore()
      },
// add
// 绘制箭头，用来指向我们抽中的奖品
      drawArrow() {
        const context = this.context
        context.save()
        context.beginPath()
        context.fillStyle = '#FF0000'
        context.moveTo(140, 125)
        context.lineTo(150, 100)
        context.lineTo(160, 125)
        context.closePath()
        context.fill()
        context.restore()
      },
      // add
// 这个方法是为了将canvas再window中的坐标点转化为canvas中的坐标点
      windowToCanvas(canvas, e) {
        // getBoundingClientRect这个方法返回html元素的大小及其相对于视口的位置
        const canvasPostion = canvas.getBoundingClientRect(), x = e.clientX, y = e.clientY
        return {
          x: x - canvasPostion.left,
          y: y - canvasPostion.top
        }
      },

      // modify
      startRotate() {
        const canvas = this.canvas
        const context = this.context
        const canvasStyle = canvas.getAttribute('style');
        // this.render()
        canvas.addEventListener('mousedown', e => {
          // 只要抽奖没有结束，就不让再次抽奖
          if (!this.canBeClick) return
          this.canBeClick = false
          let loc = this.windowToCanvas(canvas, e)
          context.beginPath()
          context.arc(150, 150, 30, 0, Math.PI * 2, false)
          if (context.isPointInPath(loc.x, loc.y)) {
            // 每次点击抽奖，我们都将初始化角度重置
            this.startRadian = 0
            // distance是我们计算出的将指定奖品旋转到指针处需要旋转的角度距离，distanceToStop下面会又说明
            const distance = this.distanceToStop()
            this.rotatePanel(distance)
          }
        })
        canvas.addEventListener('mousemove', e => {
          let loc = this.windowToCanvas(canvas, e)
          context.beginPath()
          context.arc(150, 150, 30, 0, Math.PI * 2, false)
          if (context.isPointInPath(loc.x, loc.y)) {
            canvas.setAttribute('style', `cursor: pointer;${canvasStyle}`)
          } else {
            canvas.setAttribute('style', canvasStyle)
          }
        })
      },
// modify
      rotatePanel(distance) {
        // 我们这里用一个很简单的缓动函数来计算每次绘制需要改变的角度，这样可以达到一个转盘从块到慢的渐变的过程
        let changeRadian = (distance - this.startRadian) / 10
        this.startRadian += changeRadian
        // 当最后我们的目标距离与startRadian之间的差距低于0.05时，我们就默认奖品抽完了，可以继续抽下一个了。
        if (distance - this.startRadian <= 0.05) {
          this.canBeClick = true;
          return
        }
        this.render()
        window.requestAnimationFrame(this.rotatePanel.bind(this, distance))
      },
// add
      distanceToStop() {
        // middleDegrees为奖品块的中间角度（我们最终停留都是以中间角度进行计算的）距离初始的startRadian的距离，distance就是当前奖品跑到指针位置要转动的距离。
        let middleDegrees = 0, distance = 0
        // 映射出每个奖品的middleDegrees
        const awardsToDegreesList = this.awards.map((data, index) => {
          let awardRadian = (Math.PI * 2) / this.awards.length
          return awardRadian * index + (awardRadian * (index + 1) - awardRadian * index) / 2
        });
        // 随机生成一个索引值，来表示我们此次抽奖应该中的奖品
        const currentPrizeIndex = Math.floor(Math.random() * this.awards.length)
        console.log('当前奖品应该中的奖品是：' + this.awards[currentPrizeIndex].name)
        middleDegrees = awardsToDegreesList[currentPrizeIndex];
        // 因为指针是垂直向上的，相当坐标系的Math.PI/2,所以我们这里要进行判断来移动角度
        distance = Math.PI * 3 / 2 - middleDegrees
        distance = distance > 0 ? distance : Math.PI * 2 + distance
        // 这里额外加上后面的值，是为了让转盘多转动几圈，看上去更像是在抽奖
        return distance + Math.PI * 10;
      }


    }
  };
</script>

<style>
  .pointer {
    position: absolute;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 20px solid #000000;
    top: calc(50% - 20px);
    left: calc(50% - 10px);
  }
</style>
