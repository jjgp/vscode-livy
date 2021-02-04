import names from './menagerie';

export function nameFromMenagerie(): string {
    return names[Math.floor(Math.random() * names.length)];
}
