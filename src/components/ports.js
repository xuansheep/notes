export default {
    user: {
        signUp: '/api/user/signUp', // 注册接口
        signIn: '/api/user/signIn', // 登录
        signOut: '/api/user/signOut', // 退出
    },
    dataDict: {
        list: '/api/dataDict/list' // 数据字典
    },
    category: {
        list: '/api/category/list',
        delete: '/api/category/delete',
        save: '/api/category/save',
        upgradeSort: '/api/category/upgradeSort'
    },
    mark: {
        save: '/api/mark/save',
        listIndex: '/api/mark/list/index',
        delete: '/api/mark/delete',
    },
    file: {
        import: '/api/file/import/chrome',
        upload: '/api/file/upload',
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
            detail: '/api/nga/subjectDetail',
            favorite: '/api/nga/subject/favorite',
            cancelFavorite: '/api/nga/subject/cancelFavorite'
        },
        reply: {
            list: '/api/nga/replyList'
        },
        section: {
            list: '/api/nga/sectionList'
        },
        user: {
            detail: '/api/nga/userDetail',
            subjectNum: '/api/nga/userSubjectNum',
            replyNum: '/api/nga/userReplyNum',
            replyList: '/api/nga/userReplyList'
        },
        stat: {
            postNum: '/api/nga/stat/postNum',
            topTerms: '/api/search/topTerms'
        }
    },
    search: {
        subject: {
            list: '/api/search/subjectList',
        },
    },
    lottery: {
        option: {
            list: '/api/lottery/option/list'
        },
        rand: '/api/lottery/rand'
    },
    person: {
        save: '/api/person/save',
        update: '/api/person/update',
        list: '/api/person/list',
        detail: '/api/person/detail',
        hide: '/api/person/hide',
        show: '/api/person/show',
        birthday: '/api/person/birthday',
    },
    release: {
        group: {
            save: '/api/release/group/save',
            list: '/api/release/group/list',
            detail: '/api/release/group/detail',
            delete: '/api/release/group/delete'
        },
        save: '/api/release/save',
        list: '/api/release/list',
        delete: '/api/release/delete'
    },
    serverMonitor: {
        save: '/api/serverMonitor/save',
        list: '/api/serverMonitor/list',
        detail: '/api/serverMonitor/detail',
        delete: '/api/serverMonitor/delete'
    },
    webSocket: {
        serverMonitor: '/webSocket/serverMonitor'
    }
}