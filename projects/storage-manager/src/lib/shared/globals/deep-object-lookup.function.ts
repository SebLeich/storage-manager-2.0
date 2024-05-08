export function deepObjectLookup(obj: any, path: string) {
    const paths = path.split('.');
    let current = obj;

    for (let i = 0; i < paths.length; ++i) {
        if (typeof current[paths[i]] === 'undefined') {
            return undefined;
        } else {
            current = current[paths[i]];
        }
    }

    return current;
}