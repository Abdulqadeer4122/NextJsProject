'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'
type Position = [number, number]

const GRID_SIZE = 20
const CELL_SIZE = 20
const INITIAL_SNAKE: Position[] = [[5, 5]]
const INITIAL_DIRECTION: Direction = 'RIGHT'
const INITIAL_FOOD: Position = [10, 10]
const GAME_SPEED = 100 // milliseconds

export default function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE)
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION)
  const [food, setFood] = useState<Position>(INITIAL_FOOD)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)

  const moveSnake = useCallback(() => {
    const newSnake = [...snake]
    const [headX, headY] = newSnake[0]

    switch (direction) {
      case 'UP':
        newSnake.unshift([headX, (headY - 1 + GRID_SIZE) % GRID_SIZE])
        break
      case 'DOWN':
        newSnake.unshift([headX, (headY + 1) % GRID_SIZE])
        break
      case 'LEFT':
        newSnake.unshift([(headX - 1 + GRID_SIZE) % GRID_SIZE, headY])
        break
      case 'RIGHT':
        newSnake.unshift([(headX + 1) % GRID_SIZE, headY])
        break
    }

    if (newSnake[0][0] === food[0] && newSnake[0][1] === food[1]) {
      setScore(prevScore => prevScore + 1)
      generateFood(newSnake)
    } else {
      newSnake.pop()
    }

    if (checkCollision(newSnake)) {
      setGameOver(true)
    } else {
      setSnake(newSnake)
    }
  }, [snake, direction, food])

  const generateFood = (currentSnake: Position[]) => {
    let newFood: Position
    do {
      newFood = [
        Math.floor(Math.random() * GRID_SIZE),
        Math.floor(Math.random() * GRID_SIZE)
      ]
    } while (currentSnake.some(segment => segment[0] === newFood[0] && segment[1] === newFood[1]))
    setFood(newFood)
  }

  const checkCollision = (snakeToCheck: Position[]): boolean => {
    const [head, ...body] = snakeToCheck
    return body.some(segment => segment[0] === head[0] && segment[1] === head[1])
  }

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowUp':
        setDirection(prevDirection => prevDirection !== 'DOWN' ? 'UP' : prevDirection)
        break
      case 'ArrowDown':
        setDirection(prevDirection => prevDirection !== 'UP' ? 'DOWN' : prevDirection)
        break
      case 'ArrowLeft':
        setDirection(prevDirection => prevDirection !== 'RIGHT' ? 'LEFT' : prevDirection)
        break
      case 'ArrowRight':
        setDirection(prevDirection => prevDirection !== 'LEFT' ? 'RIGHT' : prevDirection)
        break
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])

  useEffect(() => {
    if (!gameOver) {
      const gameLoop = setInterval(moveSnake, GAME_SPEED)
      return () => clearInterval(gameLoop)
    }
  }, [gameOver, moveSnake])

  const resetGame = () => {
    setSnake(INITIAL_SNAKE)
    setDirection(INITIAL_DIRECTION)
    generateFood(INITIAL_SNAKE)
    setGameOver(false)
    setScore(0)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Snake Game</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 text-center">Score: {score}</div>
        <div
          className="bg-secondary border-2 border-primary mx-auto"
          style={{
            width: GRID_SIZE * CELL_SIZE,
            height: GRID_SIZE * CELL_SIZE,
            position: 'relative'
          }}
        >
          {snake.map((segment, index) => (
            <div
              key={index}
              className="bg-primary"
              style={{
                position: 'absolute',
                width: CELL_SIZE,
                height: CELL_SIZE,
                left: segment[0] * CELL_SIZE,
                top: segment[1] * CELL_SIZE
              }}
            />
          ))}
          <div
            className="bg-destructive"
            style={{
              position: 'absolute',
              width: CELL_SIZE,
              height: CELL_SIZE,
              left: food[0] * CELL_SIZE,
              top: food[1] * CELL_SIZE,
              borderRadius: '50%'
            }}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        {gameOver && (
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">Game Over!</h2>
            <Button onClick={resetGame}>Play Again</Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}