export const isPromise = (candidate: any) => {
    if (typeof candidate === 'object' && typeof candidate.then === 'function') {
        return true;
    }

    return false;
}