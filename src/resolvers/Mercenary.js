module.exports = {
    home: ({ homePlanetId }, args, { db }, info) => {
        return db.from('planets').first('*').where('id', homePlanetId);
    },
    ships: ({ id }, args, { db }, info) => {
        return db.from('ships').select('*').where('pilotId', id);
    },
    merch: ({ id }, args, { db }, info) => {
        return db.from('merch').select('*').where('mercenaryId', id);
    }
}