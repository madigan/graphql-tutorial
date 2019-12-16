module.exports = {
    pilot: ({ pilotId }, args, { db }, info) => {
        return db.from('mercenaries').first('*').where('id', pilotId);
    },
    location: ({ locationId }, args, { db }, info) => {
        return db.from('planets').first('*').where('id', locationId);
    }
}