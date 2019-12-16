const knexlib = require('knex');
const fs = require('fs');

const DB_FILE = './data/dev.sqlite';

/**
 * Helper class to manage the data source.
 * Don't judge too harshly- it's for a prototype.
 */
class Datasource {
    constructor() {
        this.knex = null;
    }

    init() {
        this.knex = knexlib({
            client: 'sqlite3',
            connection: {
                filename: DB_FILE
            },
            useNullAsDefault: true
        });
    }

    /**
     * Create the tables if they don't exist. You'd want something more sophisticated for a real migration.
     */
    async migrate() {
        fs.writeFileSync(DB_FILE, "");
        if (!this.knex) throw new Error("Datasource not initialized.");
        if (! await this.knex.schema.hasTable('mercenaries')) {
            await this.knex
                .schema
                .createTable('mercenaries', (table) => {
                    table.increments();
                    table.string('name', 80);
                    table.text('bio');
                    table.string('profilePicture', 255);
                    table.integer('homePlanetId');
                });
            console.info("Created 'mercenaries' table.");
        }
        if (! await this.knex.schema.hasTable('planets')) {
            await this.knex
                .schema
                .createTable('planets', (table) => {
                    table.increments();
                    table.string('name', 80);
                    table.string('type', 10);
                    table.bigInteger('population');
                    table.string('image', 255);

                });
            console.info("Created 'planets' table.");
        }
        if (! await this.knex.schema.hasTable('ships')) {
            await this.knex
                .schema
                .createTable('ships', (table) => {
                    table.increments();
                    table.integer('pilotId');
                    table.string('serialNumber', 80);
                    table.string('name', 80);
                    table.string('make', 80);
                    table.string('model', 80);
                    table.string('threatLevel', 80);
                    table.integer('locationId');
                });
            console.info("Created 'ships' table.");
        }
        if (! await this.knex.schema.hasTable('merch')) {
            await this.knex
                .schema
                .createTable('merch', (table) => {
                    table.increments();
                    table.string('name', 80);
                    table.string('category', 80);
                    table.float('cost');
                    table.integer('mercenaryId');
                    table.string('tags', 255);
                });
            console.info("Created 'merch' table.");
        }

        await this.hydrate();
    }

    async hydrate() {
        await this.knex('planets').insert({
            name: 'Erf',
            type: 'M',
            population: 7530000000,
            image: 'https://placekitten.com/1024/1024'
        });
        await this.knex('planets').insert({
            name: 'Naboo',
            type: 'F',
            population: 2760000000,
            image: 'https://placekitten.com/1024/1024'
        });
        console.info("Inserted planets");

        await this.knex('mercenaries').insert({
            name: "Spiff",
            bio: "Don't let this 6-year-old fool you...",
            profilePicture: "https://vignette.wikia.nocookie.net/candh/images/8/84/Saucer.png/revision/latest?cb=20111204143703",
            homePlanetId: 1
        });
        await this.knex('mercenaries').insert({
            name: "Baby Yoda",
            bio: "He always looked suspicious...",
            profilePicture: "https://placekitten.com/80/80",
            homePlanetId: 1
        });
        await this.knex('mercenaries').insert({
            name: "Mando",
            bio: "You know he's good since he has his own TV series.",
            profilePicture: "https://placekitten.com/80/80",
            homePlanetId: 2
        });
        console.info("Inserted mercenaries.");

        await this.knex('ships').insert({
            pilotId: 1,
            name: 'Spiffcraft',
            serialNumber: 'H0BB-3S',
            make: 'Saucer',
            model: 'V1',
            threatLevel: "SIGNIFICANT",
            locationId: 2
        });
        await this.knex('ships').insert({
            pilotId: 1,
            name: 'Super Spiffcraft',
            serialNumber: 'H0BB-3S-43VA',
            make: 'Super Saucer',
            model: 'V2',
            threatLevel: "HOLY_CATFISH",
            locationId: 1
        });
        await this.knex('ships').insert({
            pilotId: 3,
            name: 'Razor Crest',
            serialNumber: '123-456-0000',
            make: 'Gunship',
            model: 'REDACTED',
            threatLevel: "SIGNIFICANT",
            locationId: 2
        });
        console.info("Inserted ships.");

        await this.knex('merch').insert({
            name: 'Tiger Plushie',
            category: 'Toys',
            cost: 35.99,
            mercenaryId: 1,
            tags: 'plushie,star-wars,space'
        });
        await this.knex('merch').insert({
            name: 'Model Spiffcraft',
            category: 'Toys',
            cost: 54.99,
            mercenaryId: 1,
            tags: 'model,star-wars,space'
        });

        await this.knex('merch').insert({
            name: 'Baby Yoda Plushie',
            category: 'Toys',
            cost: 39.99,
            mercenaryId: 2,
            tags: 'plushie,star-wars,space'
        });

        await this.knex('merch').insert({
            name: 'Model Razor Crest',
            category: 'Toys',
            cost: 15.99,
            mercenaryId: 3,
            tags: 'model,star-wars,space'
        });
        await this.knex('merch').insert({
            name: 'Mando Bobblehead',
            category: 'Toys',
            cost: 24.99,
            mercenaryId: 3,
            tags: 'bobble-head,star-wars,space'
        });
        console.info("Inserted merch.");
    }

    from(tableName) {
        if (!this.knex) throw new Error("Datasource not initialized.");
        return this.knex(tableName);
    }
}

module.exports = Datasource;