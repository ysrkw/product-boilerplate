import { Outlet, useNavigation } from 'react-router-dom'

import { Loader } from './loading'

export function RootLayout() {
  const navigation = useNavigation()

  const isLoading =
    navigation.state === 'loading' || navigation.state === 'submitting'

  return (
    <>
      {isLoading ?? <Loader />}
      <Outlet />
    </>
  )
}
