# underline2upper
将大写命名方式转为下划线的驼峰命名方式

# underline2upper
---
    下划线命名方式转为大写命名

```
    pubAccount === underline2upper("pub_account");
    var pubAccount = {
        x_y: 1,
        y_z: 2
    }
    underline2upper(pubAccount)
    输出 {
        xY: 1,
        yZ: 2
    }
```

# upper2underline
---
    将大写转为下划线命名方式
```
    "pub_account" === upper2underline("pubAccount")
   var pubAccount = {
       userName: "王大拿",
       xY: {
           nickName: "wanglihui"
       }
   }
   upper2underline(pubAccount)
   输出:
    {
        user_name: "王大拿",
        x_y: {
            nick_name: "wanglihui"
        }
    }
```