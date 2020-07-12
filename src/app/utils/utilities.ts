export class Utilities {
    static hasSpaceOrUnderscore(str: string) {
        if ( str.includes('_') ) {
            str = str.split('_')[0];
        } else if ( str.includes(' ') ) {
            str = str.split(' ')[0];
        }
        return str;
    }

    static hasSpecialCharacters(str: string): boolean {
        const regex = /[!$%^&*()+|~=`{}[:;<>?,@#\]0-9]/g;

        if ( str.match(regex) ) {
            return true;
        }
        return false;
    }

    static removeSpecialCharacters(str: string) {
        if ( str.indexOf(' ') ) {
            str = String(str).split(' ').join('_');
        }
        return str.replace(/[^a-z]/gi, '').toLowerCase();
    }

    static capitalizeFirstLetter(str) {
        str = str.split(' ');
        for ( let n = 0; n < str.length; n++ ) {
            str[n] = str[n][0].toUpperCase() + str[n].substr(1);
        }
        return str.join(' ');
    }
}