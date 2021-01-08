export default{
    fetch(key){
        let result;
        try {
            result = JSON.parse(window.localStorage.getItem(key) || '')
        } catch (e) {
        }
        return result;
    },
    save(key,value){
        window.localStorage.setItem(key,JSON.stringify(value))
    },
    remove(key){
        window.localStorage.removeItem(key)
    }
}