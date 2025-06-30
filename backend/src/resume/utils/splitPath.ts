export function splitPath(path: string): string[] {
  return path.replace(/\[(["']?)([^\]"']+)\1\]/g, '.[$2]').split('.');
}