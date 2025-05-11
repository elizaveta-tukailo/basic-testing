// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => {
  const originalModule = jest.requireActual<typeof import('lodash')>('lodash');

  return {
    __esModule: true,
    ...originalModule,
    throttle: jest.fn((fn) => fn),
  };
});

const characters = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
  },
  {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
  },
  {
    id: 3,
    name: 'Summer Smith',
    status: 'Alive',
  },
];

describe('throttledGetDataFromApi', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  beforeEach(() => {
    mockedAxios.create = jest.fn(() => mockedAxios);
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: characters }),
    );
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('api/characters');
    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi('/api/characters');
    expect(mockedAxios.get).toHaveBeenCalledWith('/api/characters');
  });

  test('should return response data', async () => {
    mockedAxios.get.mockResolvedValueOnce(characters);
    const res = await throttledGetDataFromApi('/api/characters');
    expect(res).toEqual(characters);
  });
});
