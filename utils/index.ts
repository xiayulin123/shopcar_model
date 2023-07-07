import { CarProps, FilterProps } from '@/types'
import { createClient } from 'pexels'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { get } from 'https'

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, fuel, limit } = filters

  const headers = {
    'X-RapidAPI-Key': '30ecbe50bamsh08d7863e79ec92dp129192jsn66265257d0ec',
    'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com',
  }

  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
    { headers: headers }
  )

  const result = await response.json()
  return result
}

export const updateSearchParams = (type: string, value: string) => {
  // Get the current URL search params
  const searchParams = new URLSearchParams(window.location.search)

  // Set the specified search parameter to the given value
  searchParams.set(type, value)

  // Set the specified search parameter to the given value
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`

  return newPathname
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50 // Base rental price per day in dollars
  const mileageFactor = 0.1 // Additional rate per mile driven
  const ageFactor = 0.05 // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor
  const ageRate = (new Date().getFullYear() - year) * ageFactor

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate

  return rentalRatePerDay.toFixed(0)
}

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const { model, year, make } = car
  const queries = `${make}${model}${year}`

  // const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/'
  // const apiUrl = 'https://api.pexels.com/v1/search'

  // const requestConfig: AxiosRequestConfig = {
  //   method: 'get',
  //   url: apiUrl,
  //   headers: {
  //     Authorization: 'MTmyBT5k20rVxOHRn9vgcXDGMpBZzWs8rpNJiVIiT67krzFcJbNBtJ5E',
  //     'X-Requested-With': 'XMLHttpRequest',
  //   },
  //   params: { query: queries, per_page: 1 },
  // }

  // axios(requestConfig)
  //   .then((response) => {
  //     console.log('res:::', response.data)
  //   })
  //   .catch((error) => {
  //     console.error('errror::', error)
  //   })

  const url = new URL('https://cdn.imagin.studio/getimage')
  url.searchParams.append('customer', '')
  // url.searchParams.append(
  //   'Authorization',
  //   'MTmyBT5k20rVxOHRn9vgcXDGMpBZzWs8rpNJiVIiT67krzFcJbNBtJ5E'
  // )
  url.searchParams.append('make', make)
  url.searchParams.append('modelFamily', model.split(' ')[0])
  url.searchParams.append('zoomType', 'fullscreen')
  url.searchParams.append('modelYear', `${year}`)
  // url.searchParams.append('zoomLevel', zoomLevel)
  url.searchParams.append('angle', `${angle}`)
  return `${url}`
}
