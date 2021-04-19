exports.portfolioQueries = {
    hello: () => {
        return 'Hello World!'
    },
    portfolio: (root, {id}, ctx) => {
        return ctx.models.Portfolio.getById(id);
    },
    portfolios: (root, args, ctx) => {
        return ctx.models.Portfolio.getAll();
    }
}

exports.portfolioMutations = {
    createPortfolio: async (root, {input}, ctx) => {
        return await ctx.models.Portfolio.create(input);
    },
    updatePortfolio: (root, {id, input}, ctx) => {
        return ctx.models.Portfolio.findAndUpdate(id, input);
    },
    deletePortfolio: async (root, {id} , ctx) => {
        const deletedPortfolio = await ctx.models.Portfolio.findAndDelete(id);
        return deletedPortfolio._id;
    }
}

exports.userMutations = {
    signIn: (root, args, ctx) => {
        return ctx.models.User.signIn();
    },
    signUp: (root, args, ctx) => {
        return ctx.models.User.signUp();
    },
    signOut: (root, args, ctx) => {
        return ctx.models.User.signOut();
    }
}
