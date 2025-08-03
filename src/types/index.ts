/** Намеренное использование типа `any`, там где он действительно нужен */
export type TAny = any; // eslint-disable-line @typescript-eslint/no-explicit-any

/**
 * Тип представляет функцию, которая принимает любое количество аргументов
 * и возвращает значение любого типа. Используется для методов, перехватчиков,
 * переопределений и расширений, для которых мы не знаем точных типов.
 */
export type TAnyFunction = (...args: TAny[]) => TAny;

export interface IAccountProps {
  id: number
  label?: { text: string }[];
  type: string
  login: string
  password: string | null
}
