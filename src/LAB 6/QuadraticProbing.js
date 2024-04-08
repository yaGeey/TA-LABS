export class QuadraticProbing {
   constructor(size) {
      this.size = size;
      this.table = new Array(size);

      this.count = 0;
   }

   #checkSize() { // на вікі пишеться чого треба, ну за швидкості
      if (this.count > this.size * 0.5){
         console.warn(`TABLE EXPANDED | Size: ${this.size} -> ${this.size * 2}`)
         this.size *= 2;
         const oldTable = this.table;
         this.table = new Array(this.size);
         this.count = 0;
         for (let i = 0; i < oldTable.length; i++)
            if (oldTable[i])
               this.add(oldTable[i].key, oldTable[i].value)
      }
   }

   #hash(key) {
      let hash = 0;
      for (let i = 0; i < key.length; i++) {
         hash += key.charCodeAt(i);
      }
      return hash % this.size; //!! потрібно щоб this.size (M) було в 2^x
   }

   add(key, value) {
      let index = this.#hash(key);
      let i = 0;
      while (this.table[index]) {
         i++;
         index = (this.#hash(key) + i * i) % this.size;
      }
      this.table[index] = ({ key, value });
      this.count++;

      this.#checkSize()
   }

   search(key) {
      let index = this.#hash(key)
      let i = 0;
      while (this.table[index] && this.table[index].key !== key) {
         i++;
         index = (this.#hash(key) + i * i) % this.size;
      }
      return this.table[index] ? this.table[index].value : false;
   }

   remove(key) {

      // find
      let index = this.#hash(key)
      let i = 0;
      while (this.table[index] && this.table[index].key !== key) {
         i++;
         index = (this.#hash(key) + i * i) % this.size;
      }
      // if (!this.table[index]) return false;

      // delete
      delete this.table[index];
      console.log('DELETED')
      console.table(this.table)

      // filling the gap with next last element
      let replaceIndex = index;
      while (this.table[replaceIndex + 1]) 
         replaceIndex = (replaceIndex + 1) % this.size;

      if (replaceIndex === index) return true;
      [this.table[index], this.table[replaceIndex]] = [this.table[replaceIndex], this.table[index]]
      delete this.table[replaceIndex];

      console.log('REPLACED')
      console.table(this.table)
      
      return true;
   }

}