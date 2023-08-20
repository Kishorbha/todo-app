export default function queryString(obj: Record<string, any>) {
  return Object.keys(obj)
    .map((k) => `${k}=${obj[k]}`)
    .join('&')
}
