class UsersController {
    constructor() {
        this.users = [];
    }
    addUser(user) {
        this.users.push(user);
    }
    deleteUserById(id) {
        this.users = this.users.filter(user => user.id!== id);
    }
    getAllUsers() {
        return this.users;
    }
    getUserById(id) {
        return this.users.find(user => user.id === id);
    }
}
exports.UsersController = UsersController;