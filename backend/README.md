# Сайт проекта #

Сайт построен на базе фраймфорка Yii2 с использованием advanced шаблона

## Файловая структура сайта ##

* backend - все что связано с управлением сайта и его администрированием
* common - общая конфигурация для зоны управления и самого сайта
* console - приложения для консоли
* environments - конфигурация и версия для разработки приложения
* frontend - все что связано с внешним видом сайта
* test - тесты сайта при исползовании codeception
* vendor - сам фраймворк yii2, а так же внешние пакеты
* web - директория, на которую должен быть настроен вебсервер

## Сборка документации ##

1. Зайти в директорию site (cd site)
2. Собрать документацию (vendor/bin/apidoc api ./ ../doc/api), документация в html формате будет доступна в папке