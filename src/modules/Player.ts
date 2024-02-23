export default class Player {
    name: string;
    hp: number;

    constructor(name: string, hp: number) {
        this.name = name;
        this.hp = hp
    }

    greet() {
        return `Hello!  My name is ${this.name}.`
    }

}
