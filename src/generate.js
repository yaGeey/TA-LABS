export function generateStudent() {
   const names = [
      "Анастасія", "Вікторія", "Марія", "Олена", "Юлія", "Софія", "Анна", "Дарина", "Емілія", "Діана",
      "Катерина", "Валерія", "Аліна", "Єлизавета", "Ксенія", "Наталія", "Поліна", "Христина", "Вероніка", "Ірина",
      "Марта", "Ольга", "Інна", "Тетяна", "Влада", "Аріна", "Лілія", "Евеліна", "Алла", "Руслана",
      "Людмила", "Євгенія", "Віолетта", "Злата", "Майя", "Дарія", "Василиса", "Кіра", "Єва", "Меланія",
      "Ніна", "Лариса", "Агата", "Ярослава", "Віра", "Галина", "Регіна", "Руслана", "Світлана", "Тамара"
    ]
   const surnames = ["Петров", "Іванов", "Сидоров", "Коваленко", "Мельник", "Ковальчук", "Бондаренко", "Ткаченко", "Коваль", "Лисенко", "Шевченко", "Шевцов", "Кравченко", "Марченко", "Романенко", "Кузьменко", "Михайлюк", "Король", "Павлюченко", "Захаренко", "Гриценко", "Онопрієнко", "Литвиненко", "Василенко", "Козак", "Панасюк", "Білецький", "Остапенко", "Третяк", "Кузьмін", "Мазур", "Левченко", "Котляр", "Панченко", "Руденко", "Красніков", "Лис", "Мироненко", "Головко", "Білоус", "Іщенко", "Зайцев", "Купрієнко", "Онопко", "Бондар", "Пархоменко", "Ковалюк", "Кириченко", "Бєлкін", "Федоров"]

   return `${names[Math.floor(Math.random() * names.length)]} ${surnames[Math.floor(Math.random() * surnames.length)]}`
}

export function generateBirthday() {
   const month = Math.floor(Math.random() * 12) + 1;
   const day = Math.floor(Math.random() * 28) + 1;
   const year = Math.floor(Math.random() * 3) + 2004;
   return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
}