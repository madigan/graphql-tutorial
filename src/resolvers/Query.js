/**
 * 
 * @param {Object} root Information provided by the parent resolver.
 * @param {Object} args Arguments passed in by the query.
 * @param {Object} context Resources shared across resolvers (like database connections).
 * @param {Object} info Metadata about the query.
 */
function healthcheck(root, args, context, info) {
    return "Running!"
}

module.exports = {
    healthcheck
}