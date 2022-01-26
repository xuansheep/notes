#!/bin/bash

#这里替换为你自己的执行程序(jar包)存放路径
APP_PATH=/root/server/project/notes

#代码仓库目录
REPO_PATH=/root/server/repo/notes


#输出带颜色文字
warn() {
    echo -e "\033[33m"$1"  \033[0m"
}
error(){
        echo -e "\033[31m"$1"  \033[0m"
}
success(){
        echo -e "\033[32m"$1"  \033[0m"
}


#使用说明，用来提示输入参数
usage() {
    echo "Usage: sh notes.sh [deploy]"
    exit 1
}


#更新代码
pull() {
    cd $REPO_PATH
    success "|---> git pull..."
    git pull
}


# 编译打包
package() {
    cd $REPO_PATH
    success "|---> install..."
    npm install
    success "|---> run build..."
    npm run build
    cp -rf $REPO_PATH/webroot $APP_PATH
    success "|---> deploy finished"
}


#发布
deploy() {
    pull
    package
}


#更新sh
update() {
    pull
    cp -f $REPO_PATH/shell/* /root/shell
}


#根据输入参数，选择执行对应方法，不输入则执行使用说明
case "$1" in
   "deploy")
     deploy
     ;;
   "update")
     update
     ;;
   *)
     usage
     ;;
esac