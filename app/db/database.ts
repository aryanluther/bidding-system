import {env} from '@/env';
import * as schema from "./schema";
import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import exp from 'constants';

declare global {
    var databse: PostgresJsDatabase<typeof schema> | undefined;

}

let databse: PostgresJsDatabase<typeof schema>;
let pg : ReturnType<typeof postgres>;

if (env.NODE_ENV === 'production') {
    pg = postgres(env.DATABASE_URL);
    databse = drizzle(pg, {schema});
} else {
    if(!global.databse) {
        pg = postgres(env.DATABASE_URL);
        global.databse = drizzle(pg, {schema});
    }
    databse = global.databse;
}
export {databse, pg};