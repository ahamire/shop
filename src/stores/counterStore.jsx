import {action, makeAutoObservable, makeObservable, observable} from 'mobx';
class counterStore{
    count = 0
    constructor(){
        makeAutoObservable(this)
    }
    increment() {
        this.count = this.count+1
        console.log(this.count)
    }
    decrement() {
        this.count-=1
    }
};
export default new counterStore;