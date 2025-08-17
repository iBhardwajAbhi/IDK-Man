import { create } from 'zustand'

const useQuizStore = create(set => ({
  quiz: {},
  joinQuiz: quizId => set(state => ({ quiz: { quizId } })),
  resetQuiz: () => set(state => ({ quiz: {} })),
}))

export default useQuizStore
