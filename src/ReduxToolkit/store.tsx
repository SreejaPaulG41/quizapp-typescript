import { configureStore } from '@reduxjs/toolkit'
import genreRender from './questionTopicCardSlice';
import genreBasedQuestions from './questionSortSlice';
import answerStoreHandler from './givenAnswerListSlice';

export const store = configureStore({
  reducer: {
    genreRender: genreRender,
    genreBasedQuestions: genreBasedQuestions,
    answerStoreHandler: answerStoreHandler,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch