export default (from: number, object: { type: string, apply?: string }) => {
    let options = [];
    for (let name in object) {
        if (!(object as any)[name]) continue;
        let option = {
            label: name,
            type: (object as any)[name].type,
            apply: (object as any)[name].apply ?? name
        };
        options.push(option);
    }
    return {
        from,
        options,
        validFor: /^[\w$]*$/
    }
}