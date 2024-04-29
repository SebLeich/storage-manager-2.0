export default function <T>(set: T[], key: keyof T): { [key: string]: T[] } {
    return set.reduce(function (rv, entry: T) {
        (rv[(entry as any)[key]] = rv[(entry as any)[key]] || []).push(entry);
        return rv;
    }, {} as { [key: string]: T[] });
};