import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Данные для всех классов
const gradesContent = [
    {
        number: 1,
        title: "1 Класс: Основи",
        materials: [
            { title: "Цифри", content: "Вчимо цифри від 0 до 9." },
            { title: "Додавання", content: "2 + 2 = 4. Це база." }
        ],
        test: {
            title: "Тест для малюків",
            questions: [
                { text: "2 + 2 = ?", correct: "4", options: "3,4,5" },
                { text: "5 - 1 = ?", correct: "4", options: "4,6,3" }
            ]
        }
    },
    {
        number: 2,
        title: "2 Класс: Таблиця множення",
        materials: [
            { title: "Множення на 2", content: "2 * 2 = 4, 2 * 3 = 6." },
            { title: "Час", content: "У годині 60 хвилин." }
        ],
        test: {
            title: "Перевірка множення",
            questions: [
                { text: "2 * 5 = ?", correct: "10", options: "7,10,12" },
                { text: "60 - 10 = ?", correct: "50", options: "40,50,70" }
            ]
        }
    },
    {
        number: 3,
        title: "3 Класс: Ділення",
        materials: [
            { title: "Ділення з остачею", content: "7 поділити на 2 буде 3 і 1 в остачі." },
            { title: "Сотні", content: "Вчимося рахувати до 1000." }
        ],
        test: {
            title: "Тест на ділення",
            questions: [
                { text: "21 : 7 = ?", correct: "3", options: "3,4,7" },
                { text: "100 + 200 = ?", correct: "300", options: "200,300,400" }
            ]
        }
    },
    {
        number: 4,
        title: "4 Класс: Дроби",
        materials: [
            { title: "Що таке дріб", content: "1/2 - це половина." },
            { title: "Площа", content: "S = a * b" }
        ],
        test: {
            title: "Випускний 4 класу",
            questions: [
                { text: "1/2 + 1/2 = ?", correct: "1", options: "1,2,0.5" },
                { text: "Площа квадрата 5см?", correct: "25", options: "20,25,10" }
            ]
        }
    },
    {
        number: 5,
        title: "5 Класс: Десяткові дроби",
        materials: [
            { title: "Десяткові дроби", content: "0.5 + 0.5 = 1.0" },
            { title: "Відсотки", content: "1% - це одна сота частина." }
        ],
        test: {
            title: "Тест 5 клас",
            questions: [
                { text: "0.1 + 0.2 = ?", correct: "0.3", options: "0.3,3,0.03" },
                { text: "50% від 100", correct: "50", options: "10,50,25" }
            ]
        }
    },
    {
        number: 6,
        title: "6 Класс: Пропорції",
        materials: [
            { title: "Пропорція", content: "a : b = c : d" },
            { title: "Від'ємні числа", content: "Мінус на мінус дає плюс." }
        ],
        test: {
            title: "Тест 6 клас",
            questions: [
                { text: "-5 + (-2) = ?", correct: "-7", options: "-7,-3,7" },
                { text: "-2 * (-3) = ?", correct: "6", options: "-6,6,5" }
            ]
        }
    },
    {
        number: 7,
        title: "7 Класс: Алгебра (Початок)",
        materials: [
            { title: "Формули скороченого множення", content: "(a+b)^2 = a^2 + 2ab + b^2" },
            { title: "Лінійні рівняння", content: "2x + 4 = 10 -> 2x = 6 -> x = 3" }
        ],
        test: {
            title: "Алгебра та Геометрія",
            questions: [
                { text: "(x+2)^2 розкрити дужки", correct: "x^2+4x+4", options: "x^2+4,x^2+4x+4,x^2+2x+4" },
                { text: "Сума кутів трикутника", correct: "180", options: "90,180,360" }
            ]
        }
    },
    {
        number: 8,
        title: "8 Класс: Квадратні корені",
        materials: [
            { title: "Теорема Піфагора", content: "c^2 = a^2 + b^2" },
            { title: "Квадратні рівняння", content: "D = b^2 - 4ac" }
        ],
        test: {
            title: "Тест 8 клас",
            questions: [
                { text: "Корінь з 49?", correct: "7", options: "6,7,8" },
                { text: "Гіпотенуза, якщо катети 3 і 4?", correct: "5", options: "5,6,7" }
            ]
        }
    },
    {
        number: 9,
        title: "9 Класс: ДПА (Підготовка)",
        materials: [
            { title: "Арифметична прогресія", content: "an = a1 + d(n-1)" },
            { title: "Вектори", content: "Вектор має довжину і напрямок." }
        ],
        test: {
            title: "ДПА Математика",
            questions: [
                { text: "Наступне число: 2, 4, 6, ...", correct: "8", options: "7,8,10" },
                { text: "sin(30°)", correct: "0.5", options: "0.5,1,0" }
            ]
        }
    },
    {
        number: 10,
        title: "10 Класс: Тригонометрія",
        materials: [
            { title: "Тригонометричне коло", content: "sin^2 + cos^2 = 1" },
            { title: "Похідна (вступ)", content: "Похідна показує швидкість зміни функції." }
        ],
        test: {
            title: "Тест 10 клас",
            questions: [
                { text: "cos(0°)", correct: "1", options: "0,1,-1" },
                { text: "Тангенс 45°", correct: "1", options: "0,1,sqrt(3)" }
            ]
        }
    },
    {
        number: 11,
        title: "11 Класс: Інтеграли та ЗНО",
        materials: [
            { title: "Інтеграли", content: "Інтеграл - це площа під графіком." },
            { title: "Логарифми", content: "log2(8) = 3, тому що 2 в 3 степені = 8." }
        ],
        test: {
            title: "ЗНО Математика",
            questions: [
                { text: "log10(100) = ?", correct: "2", options: "2,10,100" },
                { text: "Похідна від x^2", correct: "2x", options: "x,2x,x^2" },
                { text: "Об'єм куба зі стороною 3", correct: "27", options: "9,18,27" }
            ]
        }
    }
];

async function main() {
    console.log('Починаємо очистку бази...')
    // Очищаємо таблиці у правильному порядку (спочатку дочірні)
    await prisma.result.deleteMany()
    await prisma.question.deleteMany()
    await prisma.test.deleteMany()
    await prisma.material.deleteMany()
    await prisma.grade.deleteMany()
    console.log('База очищена.')

    console.log('Записуємо дані для 1-11 класів...')

    for (const data of gradesContent) {
        // 1. Створюємо клас
        const grade = await prisma.grade.create({
            data: {
                number: data.number
            }
        })

        // 2. Додаємо матеріали
        for (const m of data.materials) {
            await prisma.material.create({
                data: {
                    title: m.title,
                    content: m.content,
                    gradeId: grade.id
                }
            })
        }

        // 3. Створюємо тест
        const test = await prisma.test.create({
            data: {
                title: data.test.title,
                gradeId: grade.id
            }
        })

        // 4. Додаємо питання до тесту
        for (const q of data.test.questions) {
            await prisma.question.create({
                data: {
                    text: q.text,
                    correctAnswer: q.correct,
                    options: q.options,
                    testId: test.id
                }
            })
        }

        // 5. Додаємо пару фейкових результатів для краси
        await prisma.result.createMany({
            data: [
                { userName: `Учень ${data.number}-А`, score: 100, testId: test.id },
                { userName: `Гість`, score: 60, testId: test.id }
            ]
        })
    }

    console.log('✅ Всі дані успішно записані (1-11 класи)!')
}

main()
    .then(async () => await prisma.$disconnect())
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })