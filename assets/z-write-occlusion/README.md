# 采用Z-Write的方法绘制被遮挡的角色

原理：绘制两个pass

- pass 1： 将 Z-write 关闭掉，Depth Func 选择为 greater。这样被遮挡的物体就可以绘制了
- pass 2： 正常绘制角色

遮挡部分绘制为红色。

![](snapshot/01.gif)
