import { create } from 'zustand'

const useScoreStore = create(set => ({
  scores: [],
  updateScores: scores => set(state => ({ scores: scores })),
  resetQuiz: () => set(state => ({ scores: [] })),
}))

export default useScoreStore
