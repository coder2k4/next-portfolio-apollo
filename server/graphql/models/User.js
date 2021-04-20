class User {
    constructor(model) {
        this.Model = model
    }

    signUp(input) {

        if (input.password !== input.passwordConfirmation) {
            throw new Error('Password must be the same as confirmation password!');
        }

        return this.Model.create(input)

    }

    signIn () {
        return 'sign in'
    }



    signOut() {
        return 'sign out'
    }
}


module.exports = User