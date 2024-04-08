import { useState, useRef, useEffect } from 'react'
import { generateBirthday, generateStudent } from './generate'
import './App.css'
import Popup from './Popup/Popup'

import { HashTable } from './HashTable'
import { LinearProbing } from './LAB 6/LinearProbing'
import { QuadraticProbing } from './LAB 6/QuadraticProbing'

function App() {
  const size = 20
  const [ready, setReady] = useState(false)
  const [showAddPopup, setShowAddPopup] = useState(false)
  const [showSearchPopup, setShowSearchPopup] = useState(false)
  const [showRemovePopup, setShowRemovePopup] = useState(false)

  const table = new QuadraticProbing(size);
  // const [hashTable, setHashTable] = useState(new HashTable(size))
  const [hashTable, setHashTable] = useState(table)
  const [students, setStudents] = useState([])
  const timeDiv = useRef(null)
  const processBut = useRef(null)

  useEffect(init, [])

  function init() {
    setStudents([])
    for (let i = 1; i < 15; i++) {
      setStudents(s => [...s, {student: generateStudent(), birthday: generateBirthday()}]);
    }
  }

  
  function process() {
    if (ready) { // reset
      // init();
      setHashTable(table);
      timeDiv.current.style.visibility = 'hidden';
      setReady(false);
    }
    else { // hash
      const t0 = performance.now();

      students.forEach((item) => {
        hashTable.add(item.birthday, item.student)
      });
      console.table(hashTable.table)
      console.log(hashTable.table)
      
      timeDiv.current.style.visibility = 'visible';
      timeDiv.current.innerHTML = `${performance.now() - t0} ms`;
      setReady(true);
    }
  }

  //* ADD
  function addStudent() {
    const studentInput = document.getElementById('inputName');
    const dateInput = document.getElementById('inputDate');

    const student = studentInput.value;
    const date = dateInput.value;

    setStudents(s => [...s, {student: student, birthday: date}]);
    studentInput.value = '';
    dateInput.value = '';
  }

  //* SEARCH
  function search() {
    const date = document.getElementById('inputSearch').value;
    console.error(typeof(date))
    const index = hashTable.search(date);
    if (index) {
      console.warn('FOUND', index, date)
      alert(`${index} - ${date}`);
    }
    else alert('Елемент не знайдено!');
  }

  //* REMOVE
  function remove() {
    const date = document.getElementById('inputRemove').value;

    const index = hashTable.search(date);
    const deleted = hashTable.remove(date);
    if (deleted) {
      alert(`${index} видалена з хеш-таблиці!`);
      console.warn('DELETED', index, date)
    }
    else alert('Елемент не знайдено!');
  }

  return (
    <div className="main">

      <div className="output">
        <section>
          <div id="theory"> {students.map((item, index) => {
            return <p key={index}>{item.student}</p>
          })}</div>
        </section>
        <section>
          <div id="practice" style={{visibility: !ready ? 'visible' : 'hidden'}}>
            {students.map((item, index) => {
            return <p key={index}>{item.birthday}</p>
          })}</div>
          <div className='result' style={{visibility: ready ? 'visible' : 'hidden'}}>Хешовано!</div>
        </section>
      </div>

      <div className="add-section">
        <button className={ready ? 'inactive' : null} onClick={()=>setShowAddPopup(true)}>Додати</button>
        <button className={!ready ? 'inactive' : null} onClick={()=>setShowSearchPopup(true)}>Знайти</button>
        <button className={!ready ? 'inactive' : null} onClick={()=>setShowRemovePopup(true)}>Видалити</button>
      </div>

      <button ref={processBut} id='process' onClick={process}> {ready ? 'Відновити' : 'Хешувати ДН'} </button>

      <div ref={timeDiv} style={{visibility: ready ? 'visible' : 'hidden'}} id="time">0</div>

      {showAddPopup && <Popup onClose={()=>setShowAddPopup(false)} successTitle={'Додати'} title={'Впишіть студентку та її день народження'}
      onSuccess={addStudent}>
        <>
          <input type="text" id="inputName" placeholder="Ім'я та фамілія"/>
          <input type="date" id="inputDate" placeholder="Дата народження"/>
        </>
      </Popup>}

      {showSearchPopup && <Popup onClose={()=>setShowSearchPopup(false)} successTitle={'Знайти'} title={'Знайти значення за ключом в таблиці'}
      onSuccess={search}>
          <input type="date" id="inputSearch" placeholder="Введіть дату народження"/>
      </Popup>}

      {showRemovePopup && <Popup onClose={()=>setShowRemovePopup(false)} successTitle={'Видалити'} title={'Видалити значення за ключом в таблиці'}
      onSuccess={remove}>
          <input type="date" id="inputRemove" placeholder="Введіть дату народження"/>
      </Popup>}

   </div>
  )
}

export default App
