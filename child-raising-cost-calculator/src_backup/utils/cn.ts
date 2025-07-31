import { clsx, type ClassValue } from 'clsx'

/**
 * 合并CSS类名的工具函数
 * 基于clsx库，提供条件类名合并功能
 * 
 * @param inputs - 类名输入，可以是字符串、对象、数组等
 * @returns 合并后的类名字符串
 * 
 * @example
 * cn('base-class', { 'active': isActive }, ['extra', 'classes'])
 * // 输出: 'base-class active extra classes' (如果isActive为true)
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}
