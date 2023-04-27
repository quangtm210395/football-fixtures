
export class HttpArrayResponse<T> {
  items: Array<T>;

  withItems(items: T[]) {
    this.items = items;
    return this;
  }
}
