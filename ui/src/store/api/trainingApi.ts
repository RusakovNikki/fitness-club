import { ETrainings } from '../../enums/training';
import { ITraining } from '../../interfaces/training';
import { commonApi } from './commonApi';

export const trainingApi = commonApi.injectEndpoints({
  endpoints: (builder) => ({
    getGroupTrainings: builder.query<ITraining[], string>({
      query: (token) => ({
        url: `v1/trainings/group`,
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: ['updateTrainings'],
    }),
    createNewTraining: builder.mutation<
      ITraining,
      { trainingName: string; trainerId: number; date: Date; token: string }
    >({
      query: ({ token, trainerId, trainingName, date }) => ({
        // url: `v1/trainings?trainingName=${trainingName}&trainerId=${trainerId}`,
        url: `v1/trainings`,
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: {
          date,
          type: ETrainings.GROUP,
          name: trainingName,
          trainer: {
            id: trainerId,
          },
        },
      }),
      invalidatesTags: ['updateTrainings'],
    }),
    deleteTraining: builder.mutation<
      void,
      { trainingId: number; token: string }
    >({
      query: ({ token, trainingId }) => ({
        url: `v1/trainings/${trainingId}`,
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ['updateTrainings'],
    }),
    getTrainingsByUserId: builder.query<
      ITraining[],
      { token: string; userId: number }
    >({
      query: ({ token, userId }) => ({
        url: `v1/trainings/user/${userId}`,
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: ['updateTrainings'],
    }),
    getTrainingsByTrainerId: builder.query<
      ITraining[],
      { token: string; trainerId: number }
    >({
      query: ({ token, trainerId }) => ({
        url: `v1/trainings/trainer/${trainerId}`,
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: ['updateTrainings'],
    }),
  }),
});

export const {
  useGetGroupTrainingsQuery,
  useLazyGetGroupTrainingsQuery,
  useCreateNewTrainingMutation,
  useDeleteTrainingMutation,
  useGetTrainingsByUserIdQuery,
  useLazyGetTrainingsByUserIdQuery,
  useGetTrainingsByTrainerIdQuery,
  useLazyGetTrainingsByTrainerIdQuery,
} = trainingApi;
