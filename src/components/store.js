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
        if (typeof value !== "string" && typeof value !== "number") {
            value = JSON.stringify(value);
        }
        window.localStorage.setItem(key, value)
    },
    remove(key){
        window.localStorage.removeItem(key)
    }
}