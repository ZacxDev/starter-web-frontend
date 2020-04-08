export default class {
  async getGreeting(): Promise<{ greeting: string }> {
    return fetch('http://localhost:4001/random-greeting').then(res => res.json())
  }
}
