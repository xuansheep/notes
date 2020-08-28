export default {
    user: {
        signUp: '/api/user/signUp', // 注册接口
        signIn: '/api/user/signIn', // 登录
        signOut: '/api/user/signOut', // 退出
    },
    category: {
        list: '/api/category/list',
        delete: '/api/category/delete',
        save: '/api/category/save',
    },
    mark: {
        save: '/api/mark/save',
        listIndex: '/api/mark/list/index',
        delete: '/api/mark/delete',
    },
    file: {
        import: '/api/file/import/chrome',
    },
    note: {
        save: '/api/note/save',
        list: '/api/note/list',
        detail: '/api/note/detail',
        delete: '/api/note/delete',
        listViewMost: '/api/note/list/viewMost',
        listNewest: '/api/note/list/newest',
    },
    chat: {
        send: '/api/chat/send',
    },
    door: {
        open: '/api/door/open',
    },
    nga: {
        subject: {
            list: '/api/nga/subjectList',
            detail: '/api/nga/subjectDetail'
        },
        reply: {
            list: '/api/nga/replyList'
        },
        section: {
            list: '/api/nga/sectionList'
        }
    },
    search: {
        subject: {
            list: '/api/search/subjectList',
        },
    }
}