export const range = (max:number,min=1) => {
  const iterator = {
    *[Symbol.iterator](){
      let count:number = min;
      while(count <=max) {
        yield count;
        count = count+1;
      }
    }
  }
  return iterator;
}
