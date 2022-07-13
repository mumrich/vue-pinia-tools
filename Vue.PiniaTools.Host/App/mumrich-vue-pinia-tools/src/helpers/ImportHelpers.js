export function extractFileNameFromPath(path, withExt = false) {
    const response = path.toLowerCase().split("/").slice(-1)[0];
    return withExt ? response : response.replace(/\.[a-zA-Z]+$/, "");
}
export function wildcardImportVueComponents(app, components) {
    for (const path in components) {
        const name = extractFileNameFromPath(path);
        app.component(name, components[path].default);
    }
}
//# sourceMappingURL=ImportHelpers.js.map