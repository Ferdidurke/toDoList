    • Пользователь должен иметь возможность создавать задачи.
    • Пользователь должен иметь возможность помечать задачи как выполненные.
    • Пользователь должен иметь возможность удалять задачи. (Не удалять! Помечать их как удаленные и не показывать)
    • Приложение должно состоять из двух колонок слева невыполненные справа выполненные.
    • Приложение должно иметь секцию (под колонками) раскрываемую, скрываемую с удаленными задачами. (accordion) с плавной анимацией.
    • При удалении задачи из секции с удаленными задачами удалять задачу навсегда. Показывать окно confirmation. Для подтверждения удаления. После чего задача должна удаляться через 0.3 секунды. Анимация плавного затухания.
    • Приложение должно сохранять и загружать данные из localstorage. Что бы при рефреше страницы не терять изменения.
    • При наведении на задачу показывать (title) полный текст задачи.
    • Если текст задачи длинный сокращать по длине контейнера. Пример: Длинный текст зада...
    • При клике на задачу должна быть возможность ее редактирования. По умолчанию спан, по фокусу, клику инпут.
    • Каждая задача должна иметь дату создания, дедлайн и дату удаления.
    • Задача которая лежит в списке невыполненых и ее дедлайн просрочен должна быть красной, если до конца дедлайна меньше часа, должна быть желтой. Задачи в остальных списках не меняют цвет.
    • Задачи должны сортироваться по дедлайну. (asc, desc)
    • Удаленные задачи должны сортироваться по дате удаления.
    • Каждое действие должно логироваться. Пример: task id = 1 moved to done at 23:59
    • Функция экспорта задач в json и скачивание файла.
    • Функция экспорта логов в json и скачивание файла.
    • Функция импорта задач из json.
    • Задачу можно выполнить как кликом по чекбоксу так и перетаскиванием в список выполненных.
    • Должна быть возможность навигации по задачам стрелками.
    • Должна быть возможность управления задачами с клавиатуры. Пример: задача в фокусе
    • при нажатии “e” редактирование задачи
    • при нажатии “shift” + “->” перенос задачи в список справа и наоборот
    • при нажатии del удаление задачи.
