# windows上使用hyper-v搭建centos7

## 第一步 安装centos7的镜像

centos7镜像地址：https://mirrors.aliyun.com/centos/7/isos/x86_64/

![](https://z1.ax1x.com/2023/11/20/piUJxyR.md.jpg)

这里我们选择这个centos7，minimal-2009的



## 第二步 启用windows的虚拟化功能

> 注意：如果之前启用过hyper-v，这一步可以跳过

我们在搜索栏输入控制面板，打开控制面板，找到程序和功能



![](https://pic.imgdb.cn/item/655acc69c458853aef735b03.jpg)

然后点击启用或关闭windows功能，找到hyper-v，把勾给打上，然后点击确定，这个时候会提示让你重启电脑生效，我们重启电脑

![](https://z1.ax1x.com/2023/11/20/piUYNmq.md.jpg)





## 第三步 创建虚拟机

这里我们在搜索栏里面输入hyper-V，会出现一个hyper-V管理器

![](https://pic.imgdb.cn/item/655acc7bc458853aef7389b7.jpg)

然后我们打开Hyper-V 管理器，选择快速创建，然后点击本地安装源，把虚拟机运行到Windows的选项关掉，然后更改安装源，然后点击创建

![](https://z1.ax1x.com/2023/11/20/piUtrUf.md.jpg)

创建成功之后，我们进行连接

![](https://z1.ax1x.com/2023/11/20/piUtOM9.md.jpg)

然后点击启动

![](https://z1.ax1x.com/2023/11/20/piUtjq1.md.jpg)



然后我们选择install centosos7，直接回车，出现下面这个界面就代表已经成功了

![](https://z1.ax1x.com/2023/11/20/piUNui8.md.jpg)

我们按照这个指引继续安装，

- 选择语言，中文-简体中文

![](https://pic.imgdb.cn/item/655acb48c458853aef6fd1b5.jpg)

- 选择安装位置，选择设备，点击完成

然后我们可以设置root密码，也可以创建用户，然后等待安装完成就ok

![](https://pic.imgdb.cn/item/655acb69c458853aef7034bb.jpg)

安装完成之后，我们点击重启，出现下面这个窗口，就代表centos7安装完成了，它这里提示让我们输入登录的用户，

我们输入root，然后再输入我们刚才配置的root密码	

![](https://pic.imgdb.cn/item/655acba1c458853aef70c56c.jpg)

我们随机测试一个命令，ok，centos7就已经跑通了

![](https://pic.imgdb.cn/item/655acc19c458853aef7215c6.jpg)
