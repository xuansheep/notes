export default {
    user: {
        signUp: '/user/signUp', // 注册接口
        signIn: '/user/signIn', // 登录
        signOut: '/user/signOut', // 退出
    },
    category: {
        list: '/category/list',
        delete: '/category/delete',
        save: '/category/save',
    },
    mark: {
        save: '/mark/save',
        listIndex: '/mark/list/index',
        delete: '/mark/delete',
    },
    file: {
        import: '/file/import/chrome',
    },
    note: {
        save: '/note/save',
        list: '/note/list',
        detail: '/note/detail'
    },
    nga: {
        subject: {
            list: '/nga/subjectList'
        },
        reply: {
            list: '/nga/replyList'
        }
    }
}