/**
 * Button组件测试
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '../utils'
import { Button } from '../../components/ui'

describe('Button Component', () => {
  it('should render with default props', () => {
    render(<Button>Click me</Button>)
    
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('btn') // 假设有基础样式类
  })
  
  it('should handle click events', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    const button = screen.getByRole('button', { name: /click me/i })
    fireEvent.click(button)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
  
  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled button</Button>)
    
    const button = screen.getByRole('button', { name: /disabled button/i })
    expect(button).toBeDisabled()
  })
  
  it('should not call onClick when disabled', () => {
    const handleClick = vi.fn()
    render(
      <Button disabled onClick={handleClick}>
        Disabled button
      </Button>
    )
    
    const button = screen.getByRole('button', { name: /disabled button/i })
    fireEvent.click(button)
    
    expect(handleClick).not.toHaveBeenCalled()
  })
  
  it('should render different variants', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-primary')
    
    rerender(<Button variant="secondary">Secondary</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-secondary')
    
    rerender(<Button variant="outline">Outline</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-outline')
  })
  
  it('should render different sizes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-sm')
    
    rerender(<Button size="md">Medium</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-md')
    
    rerender(<Button size="lg">Large</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-lg')
  })
  
  it('should render with icons', () => {
    const LeftIcon = () => <span data-testid="left-icon">←</span>
    const RightIcon = () => <span data-testid="right-icon">→</span>
    
    render(
      <Button leftIcon={<LeftIcon />} rightIcon={<RightIcon />}>
        With icons
      </Button>
    )
    
    expect(screen.getByTestId('left-icon')).toBeInTheDocument()
    expect(screen.getByTestId('right-icon')).toBeInTheDocument()
  })
  
  it('should show loading state', () => {
    render(<Button loading>Loading button</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })
  
  it('should be accessible', () => {
    render(
      <Button aria-label="Accessible button" aria-describedby="help-text">
        Button
      </Button>
    )
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label', 'Accessible button')
    expect(button).toHaveAttribute('aria-describedby', 'help-text')
  })
  
  it('should support keyboard navigation', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Keyboard button</Button>)
    
    const button = screen.getByRole('button')
    
    // 测试Enter键
    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' })
    expect(handleClick).toHaveBeenCalledTimes(1)
    
    // 测试Space键
    fireEvent.keyDown(button, { key: ' ', code: 'Space' })
    expect(handleClick).toHaveBeenCalledTimes(2)
  })
  
  it('should apply custom className', () => {
    render(<Button className="custom-class">Custom button</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
    expect(button).toHaveClass('btn') // 应该保留默认类
  })
  
  it('should forward ref correctly', () => {
    const ref = vi.fn()
    render(<Button ref={ref}>Ref button</Button>)
    
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement))
  })
  
  describe('Animation Tests', () => {
    it('should have hover animations', () => {
      render(<Button>Hover button</Button>)
      
      const button = screen.getByRole('button')
      
      // 模拟hover
      fireEvent.mouseEnter(button)
      expect(button).toHaveClass('hover:scale-105') // 假设有hover动画类
      
      fireEvent.mouseLeave(button)
    })
    
    it('should have click animations', () => {
      render(<Button>Click button</Button>)
      
      const button = screen.getByRole('button')
      
      fireEvent.mouseDown(button)
      expect(button).toHaveClass('active:scale-95') // 假设有点击动画类
      
      fireEvent.mouseUp(button)
    })
  })
  
  describe('Performance Tests', () => {
    it('should render quickly', () => {
      const start = performance.now()
      render(<Button>Performance button</Button>)
      const end = performance.now()
      
      expect(end - start).toBeLessThan(50) // 应该在50ms内渲染完成
    })
    
    it('should handle rapid clicks efficiently', () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Rapid click</Button>)
      
      const button = screen.getByRole('button')
      
      // 快速点击100次
      const start = performance.now()
      for (let i = 0; i < 100; i++) {
        fireEvent.click(button)
      }
      const end = performance.now()
      
      expect(handleClick).toHaveBeenCalledTimes(100)
      expect(end - start).toBeLessThan(100) // 应该在100ms内完成
    })
  })
})
