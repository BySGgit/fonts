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

// Функция для вывода всех услуг в табличном виде
function showAllServicesTable() {
    // Собираем все услуги из всех категорий в один массив
    const allServices = [];
    
    pricesData.forEach(category => {
        category.services.forEach(service => {
            allServices.push({
                'Категория': category.category,
                'Название услуги': service.name,
                'Цена': service.price
            });
        });
    });
    
    if (allServices.length > 0) {
        console.log('\n=== ВСЕ УСЛУГИ В ТАБЛИЧНОМ ВИДЕ ===');
        console.table(allServices);
        
        console.log(`\nВсего услуг: ${allServices.length}`);
    } else {
        console.log('Услуги не найдены');
    }
    
    return allServices;
}

// Функция для вывода услуг конкретной категории в табличном виде
function showCategoryTable(categoryName) {
    const category = pricesData.find(cat => 
        cat.category.toLowerCase().includes(categoryName.toLowerCase())
    );
    
    if (category) {
        const services = category.services.map(service => ({
            'Название услуги': service.name,
            'Цена': service.price
        }));
        
        console.log(`\n=== ${category.category.toUpperCase()} ===`);
        console.table(services);
        console.log(`Услуг в категории: ${services.length}`);
        
        return services;
    } else {
        console.log(`Категория "${categoryName}" не найдена`);
        console.log('Доступные категории:');
        pricesData.forEach(cat => console.log(`- ${cat.category}`));
        return [];
    }
}

// Автоматически показываем таблицу со всеми услугами
showAllServicesTable();

console.log('\n=== ДОСТУПНЫЕ ФУНКЦИИ ===');
console.log('pricesData - массив с данными о всех услугах');
console.log('showAllServicesTable() - показать все услуги в таблице');
console.log('showCategoryTable("название") - показать услуги конкретной категории');
console.log('findService("текст") - поиск услуги по названию');
console.log('\nПримеры использования:');
console.log('showAllServicesTable()');
console.log('showCategoryTable("гидропилинг")');
console.log('findService("чистка")');