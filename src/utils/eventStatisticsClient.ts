import { GeneralEventStatistics } from './../redux/types'

const routes: string | undefined = process.env.REACT_APP_API

export async function getAllEventsCount(): Promise<GeneralEventStatistics> {
  try {
    const response = await fetch(`${routes}/eventStatistics/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return await response.json()
  } catch (error) {
    throw new Error(error.toString())
  }
}
