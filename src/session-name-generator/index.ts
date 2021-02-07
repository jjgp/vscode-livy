import * as menagerieJson from './menagerie.json';

export function nameFromMenagerie(): string {
    // TODO: commit script to autogenerate these
    return menagerieJson[Math.floor(Math.random() * menagerieJson.length)];
}
