### заказчик-рекрутер
Ирина Хасанова +7 926 116-51-87

#### Задача
Неоплачиваемое тестовое задание.

### Решение
Реализация: https://vue3fi.karasev.ru

Код: https://github.com/vodish/vue3-fi

Фронт: vue3 ts -- https://github.com/vodish/vue3-fi/tree/master/dist

Бек: php  -- https://github.com/vodish/vue3-fi/tree/master/backend

База: mysql  -- https://github.com/vodish/vue3-fi/tree/master/mysql

Затраченное время: неделя
- изучение тз
- макетирование
- архитектура: бд, фронт, бек
- реализация фронта
- реализация бека
- деплой
- отчет

##### ТЗ
Стек: PHP 8+, JavaScript, MySQL, браузер Google Chrome.

Материал - некий продукт, который имеет уникальный номер, название, описание, единицу измерения, стоимость за единицу измерения и присваемое свойство: верх, середина, низ. Плюсом будет возможность добавить изображение к материалу.
Изделие - некое составное изделие, состоящее из доступных материалов. Изделие состоит из 3 частей: верх, середина, низ. И для каждой части необходимо присвоить 1 или несколько материалов с соответствующим свойством (верх, середина, низ). Плюсом будет возможность добавить изображение к изделию. Стоимость изделия устанавливается вручную, количество возможных конфигураций стоимости зависит от количества материалов, добавленных для части верх и части середина. Например, для верха изделия назначено 2 материала со свойством верх, для середины изделия назначено 3 материала со свойством середина и таким образом мы получаем 6 цен для конкретного изделия. Диапазон стоимости: от минимальной цены до максимальной.
Какой необходимо получить результат: cоздать страницу, с двумя вкладками и БД MySQL для хранения данных.
1 вкладка: список изделий и кнопка добавить изделие. В списке изделий у каждого изделия должны быть: уникальный номер, название, описание, диапазон стоимости, кнопки редактировать изделие, удалить изделие. Необязательно, но плюсом будет изображение изделия.
2 вкладка: список материалов и кнопка добавить материал. В списке материалов у каждого материала должны быть: уникальный номер, название материала, описание, стоимость, ед. измерения, свойство материала (верх, середина, низ), кнопки редактировать материал, удалить материал. При удалении материала материал не удаляется из БД, а помечается как архивный. Необязательно, но плюсом будет изображение материала.
Внешний вид на усмотрение кандидата. Верстка под размер экрана 1920х1080. Плюсом будет корректное отображение на мобильных устройствах.
Результат предоставить в виде файла с расширением PHP (внутри HTML код, стили и JavaScript) и файл для экспорта в MySQL БД в формате SQL.
Указать время, потраченное на выполнение задания.