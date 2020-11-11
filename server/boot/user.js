module.exports = function(app) {
    delete app.models.User.validations.email;
    delete app.models.User.validations.username;
    // delete app.models.User.validations.realm;
};