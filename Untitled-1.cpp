#include <iostream>
#include <cmath> // Для использования sqrt

using namespace std;

// Функция для нахождения гипотенузы и периметра прямоугольного треугольника
void findHypotenuseAndPerimeter(double a, double b) {
    double hypotenuse = sqrt(a * a + b * b);
    double perimeter = a + b + hypotenuse;
    cout << "Гипотенуза: " << hypotenuse << ", Периметр: " << perimeter << endl;
}

// Функция для нахождения площади треугольника по сторонам
void findTriangleArea(double a, double b, double c) {
    double p = (a + b + c) / 2; // Полупериметр
    double area = sqrt(p * (p - a) * (p - b) * (p - c)); // Формула Герона
    cout << "Площадь треугольника: " << area << endl;
}

// Функция для нахождения периметра и площади прямоугольника по координатам противоположных вершин
void findRectangleProperties(double x1, double y1, double x2, double y2) {
    double length = abs(x2 - x1);
    double width = abs(y2 - y1);
    double perimeter = 2 * (length + width);
    double area = length * width;
    cout << "Периметр прямоугольника: " << perimeter << ", Площадь: " << area << endl;
}

// Функция для нахождения периметра и площади квадрата
void findSquareProperties(double side) {
    double perimeter = 4 * side;
    double area = side * side;
    cout << "Периметр квадрата: " << perimeter << ", Площадь: " << area << endl;
}

// Функция для нахождения периметра и площади прямоугольника по сторонам
void findRectanglePropertiesBySides(double length, double width) {
    double perimeter = 2 * (length + width);
    double area = length * width;
    cout << "Периметр прямоугольника: " << perimeter << ", Площадь: " << area << endl;
}

// Функция для нахождения площади равнобедренной трапеции
void findTrapezoidArea(double base1, double base2, double height) {
    double area = ((base1 + base2) / 2) * height;
    cout << "Площадь трапеции: " << area << endl;
}

// Функция для обмена значений переменных A и B
void swapValues(int &A, int &B) {
    int temp = A;
    A = B;
    B = temp;
    cout << "После обмена: A = " << A << ", B = " << B << endl;
}

int main() {
    // Пример использования функций:

    // 1. Найти гипотенузу и периметр треугольника
    findHypotenuseAndPerimeter(3, 4);

    // 2. Найти площадь треугольника
    findTriangleArea(3, 4, 5);

    // 3. Найти периметр и площадь прямоугольника по координатам вершин
    findRectangleProperties(1, 1, 4, 5);

    // 4. Найти периметр и площадь квадрата
    findSquareProperties(5);

    // 5. Найти периметр и площадь прямоугольника по сторонам
    findRectanglePropertiesBySides(4, 6);

    // 6. Найти площадь равнобедренной трапеции
    findTrapezoidArea(3, 5, 4);

    // 7. Поменять значения переменных A и B
    int A = 10, B = 15;
    swapValues(A, B);

    return 0;
}
