export default{
    fetch(key){
        return JSON.parse(window.localStorage.getItem(key)||'')
    },
    save(key,value){
        window.localStorage.setItem(key,JSON.stringify(value))
    },
    remove(key){
        window.localStorage.removeItem(key)
    }
}