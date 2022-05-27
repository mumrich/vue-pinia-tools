import { App } from "vue";

export function extractFileNameFromPath(
  path: string,
  withExt: boolean = false
): string {
  const response = path.toLowerCase().split("/").slice(-1)[0];

  return withExt ? response : response.replace(/\.[a-zA-Z]+$/, "");
}

export function wildcardImportVueComponents(
  app: App,
  components: Record<string, any>
) {
  for (const path in components) {
    const name = extractFileNameFromPath(path);
    app.component(name, components[path].default);
  }
}
