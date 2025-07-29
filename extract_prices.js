// Скрипт для извлечения всех названий процедур и цен из элементов prices-item
function extractPricesData() {
    // Находим все элементы с классом prices-item
    const pricesItems = document.querySelectorAll('.prices-item');
    
    const allData = [];
    
    pricesItems.forEach((item, index) => {
        // Проверяем, есть ли внутри элемента таблица с tbody
        const tbody = item.querySelector('.table-prices tbody');
        
        if (tbody) {
            // Получаем название категории из prices-item__name
            const categoryName = item.querySelector('.prices-item__name')?.textContent?.trim() || `Категория ${index + 1}`;
            
            console.log(`\n=== ${categoryName} ===`);
            
            // Получаем все строки из tbody
            const rows = tbody.querySelectorAll('tr');
            
            const categoryData = {
                category: categoryName,
                services: []
            };
            
            rows.forEach(row => {
                const cells = row.querySelectorAll('td');
                if (cells.length >= 2) {
                    const serviceName = cells[0].textContent.trim();
                    const price = cells[1].textContent.trim();
                    
                    console.log(`${serviceName} - ${price}`);
                    
                    categoryData.services.push({
                        name: serviceName,
                        price: price
                    });
                }
            });
            
            allData.push(categoryData);
        }
    });
    
    console.log('\n=== СВОДНАЯ ИНФОРМАЦИЯ ===');
    console.log(`Найдено категорий: ${allData.length}`);
    
    let totalServices = 0;
    allData.forEach(category => {
        totalServices += category.services.length;
        console.log(`${category.category}: ${category.services.length} услуг`);
    });
    
    console.log(`Общее количество услуг: ${totalServices}`);
    
    // Возвращаем данные для дальнейшего использования
    return allData;
}

// Запускаем функцию
const pricesData = extractPricesData();

// Дополнительно: функция для поиска по названию услуги
function findService(searchTerm) {
    const results = [];
    pricesData.forEach(category => {
        category.services.forEach(service => {
            if (service.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                results.push({
                    category: category.category,
                    service: service.name,
                    price: service.price
                });
            }
        });
    });
    
    if (results.length > 0) {
        console.log(`\nРезультаты поиска для "${searchTerm}":`);
        results.forEach(result => {
            console.log(`${result.service} (${result.category}) - ${result.price}`);
        });
    } else {
        console.log(`\nУслуга "${searchTerm}" не найдена`);
    }
    
    return results;
}

// Пример использования поиска:
// findService('чистка');
// findService('лицо');

// Создаем итоговый массив только с названием процедуры и ценой
const finalServicesArray = [];

pricesData.forEach(category => {
    category.services.forEach(service => {
        finalServicesArray.push([service.name, service.price]);
    });
});

// Выводим итоговый массив в console.table с заголовками колонок
console.table(finalServicesArray, ['0', '1']);

// Альтернативный способ - объекты с короткими ключами
const finalServicesTable = [];
pricesData.forEach(category => {
    category.services.forEach(service => {
        finalServicesTable.push({
            'Процедура': service.name,
            'Цена': service.price
        });
    });
});

console.log('\n=== ТАБЛИЦА С ОБЪЕКТАМИ ===');
console.table(finalServicesTable);

console.log('\n=== ДОСТУПНЫЕ ПЕРЕМЕННЫЕ ===');
console.log('pricesData - исходный массив с данными по категориям');
console.log('finalServicesArray - массив массивов [название, цена]');
console.log('finalServicesTable - массив объектов {Процедура, Цена}');
console.log('findService("текст") - функция поиска услуги по названию');
console.log('\nПример использования поиска: findService("чистка")');