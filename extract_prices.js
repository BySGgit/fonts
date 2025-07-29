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

// Тестируем работу console.table в вашем браузере
console.log('=== ТЕСТ console.table ===');
console.log('Тест 1 - простой массив:');
console.table(["apples", "oranges", "bananas"]);

console.log('Тест 2 - массив объектов:');
console.table([
    {name: "apple", color: "red", type: "fruit"}, 
    {name: "orange", color: "orange", type: "fruit"}
]);

console.log('Тест 3 - объект с ключами:');
console.table({
    apple: {color: "red", size: "medium"},
    orange: {color: "orange", size: "large"}
});

// Создаем итоговый массив для наших данных
const finalServicesTable = [];

pricesData.forEach(category => {
    category.services.forEach(service => {
        finalServicesTable.push({
            procedure: service.name,
            price: service.price,
            service: category.category
        });
    });
});

console.log('\n=== НАШИ ДАННЫЕ (с дубликатами) ===');
console.log('Всего процедур найдено:', finalServicesTable.length);

// Фильтруем дубликаты по названию процедуры
const uniqueServicesTable = [];
const seenProcedures = new Set();

finalServicesTable.forEach(service => {
    if (!seenProcedures.has(service.procedure)) {
        seenProcedures.add(service.procedure);
        uniqueServicesTable.push(service);
    }
});

console.log('\n=== УНИКАЛЬНЫЕ ДАННЫЕ (без дубликатов) ===');
console.log('Было процедур:', finalServicesTable.length);
console.log('Стало уникальных:', uniqueServicesTable.length);
console.log('Удалено дубликатов:', finalServicesTable.length - uniqueServicesTable.length);

// Выводим таблицу без дубликатов
console.table(uniqueServicesTable);

// Дополнительно выводим уникальные процедуры обычным способом
console.log('\n=== СПИСОК УНИКАЛЬНЫХ ПРОЦЕДУР ===');
uniqueServicesTable.forEach((item, index) => {
    console.log(`${index + 1}. ${item.procedure} - ${item.price} (${item.service})`);
});

console.log('\n=== ДОСТУПНЫЕ ПЕРЕМЕННЫЕ ===');
console.log('pricesData - исходный массив с данными по категориям');
console.log('finalServicesTable - массив всех процедур {procedure, price, service}');
console.log('uniqueServicesTable - массив уникальных процедур {procedure, price, service}');
console.log('findService("текст") - функция поиска услуги по названию');
console.log('\nПример использования поиска: findService("чистка")');

// Показываем пример структуры данных
console.log('\n=== ПРИМЕР СТРУКТУРЫ ДАННЫХ ===');
if (uniqueServicesTable.length > 0) {
    console.log('Пример записи:', uniqueServicesTable[0]);
}

// Если console.table не работает, используйте это:
console.log('\n=== АЛЬТЕРНАТИВНЫЙ ВЫВОД ===');
console.log('Если таблица не отображается:');
console.log('finalServicesTable содержит:', finalServicesTable.length, 'элементов');
console.log('uniqueServicesTable содержит:', uniqueServicesTable.length, 'уникальных элементов');