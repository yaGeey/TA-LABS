export class HashTable {
   constructor(size) {
      this.size = size;
      this.table = new Array(size);

      this.type = 1; //? 0 - Division hashing, 1 - Multiplicative hashing
      this.C = Math.random(); //? 0 < C < 1
   }


   #hash(key) {
      let hash = 0;
      for (let i = 0; i < key.length; i++) {
         hash += key.charCodeAt(i);
      }
      if (this.type === 0) return hash % this.size; //!! потрібно щоб this.size (M) було в 2^x
      if (this.type === 1) return this.size * ((this.C * hash) % 1);
   }

   add(key, value) {
      const index = this.#hash(key);
      if (!this.table[index]) {
         this.table[index] = [];
      }
      this.table[index].push({ key, value });
   }

   search(key) {
      let index = this.#hash(key)
      if (this.table[index])
         for (let i = 0; i < this.table[index].length; i++)
            if (this.table[index][i].key === key)
               return this.table[index][i].value
   }

   remove(key) {
      let index = this.#hash(key)
      if (this.table[index])
         for (let i = 0; i < this.table[index].length; i++)
            if (this.table[index][i].key === key){
               this.table[index].splice(i, 1)
               return true
            }
      return false
   }

}