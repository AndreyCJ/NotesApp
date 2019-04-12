-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Апр 12 2019 г., 20:01
-- Версия сервера: 10.1.38-MariaDB
-- Версия PHP: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `todolist`
--

-- --------------------------------------------------------

--
-- Структура таблицы `todo`
--

CREATE TABLE `todo` (
  `id` int(11) NOT NULL,
  `todoTitle` varchar(200) NOT NULL,
  `todoDescription` text NOT NULL,
  `done` tinyint(1) DEFAULT '0',
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `todo`
--

INSERT INTO `todo` (`id`, `todoTitle`, `todoDescription`, `done`, `image`) VALUES
(213, '', 'test', 1, ''),
(215, '', 'Test2', 0, ''),
(216, '', 'Test 3', 0, ''),
(217, 'test123', 'test4', 1, ''),
(218, '', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et nisl sit amet lectus tristique ornare sit amet ut elit. Morbi sollicitudin tortor ac urna dictum ultrices. Curabitur ullamcorper ex ut sem euismod feugiat. Aenean tincidunt auctor venenatis. Pellentesque tempor, arcu ut ultricies dapibus, purus tortor luctus elit, bibendum pellentesque lectus tellus quis dolor. Nulla mollis varius vestibulum. Phasellus finibus nunc nulla, vitae blandit ipsum blandit eget.', 0, ''),
(219, '', 'asdasd113', 0, ''),
(220, '', 'test5', 0, ''),
(222, '', 'test8', 1, ''),
(223, '', 'test99', 1, ''),
(226, 'Продукты', 'Купить картошку, лук', 1, ''),
(227, 'Домашнее задание', 'Тест124', 0, ''),
(228, '123456789101112', 'asdas', 0, ''),
(229, '', 'NewTest - Simple Notes', 1, ''),
(230, 'Full test', 'New Testss', 1, ''),
(231, 'Заголовок', 'фывфыв', 1, ''),
(232, 'Header', 'Test12345', 1, '');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `todo`
--
ALTER TABLE `todo`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `todo`
--
ALTER TABLE `todo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=233;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
