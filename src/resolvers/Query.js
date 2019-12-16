const Datasource = require('../Datasource');    // Helps VSCode

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

/**
 * 
 * @param {Object} root Information provided by the parent resolver.
 * @param {Object} args Arguments passed in by the query.
 * @param {Integer} args.id Required. ID of the mercenary to retrieve.
 * @param {Object} context Resources shared across resolvers (like database connections).
 * @param {Datasource} context.db Database connection.
 */
function mercenary(root, { id }, { db }) {
    return db.from('mercenaries').first('*').where('id', id);
}

/**
 * 
 * @param {Object} root Information provided by the parent resolver.
 * @param {Object} args Arguments passed in by the query.
 * @param {String} args.make Optional. The make of the spacecraft. Filters on exact match.
 * @param {String} args.model Optional. The model of the spacecraft. Filters on exact match.
 * @param {Object} context Resources shared across resolvers (like database connections).
 * @param {Datasource} context.db Database connection.
 */
function ships(root, { make, model }, { db }) {
    let filter = {};
    if (make) filter.make = make;
    if (model) filter.model = model;
    return db.from('ships').select('*').where(filter);
}

module.exports = {
    healthcheck,
    mercenary,
    ships
}