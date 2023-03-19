// dirty hack to circumvent TS type def issues with node-fetch@2
declare module 'node-fetch' {
  const fetch: Function
  export default fetch
}