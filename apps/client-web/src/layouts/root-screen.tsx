import { Outlet, useNavigation } from 'react-router-dom'

export function RootScreen() {
  const navigation = useNavigation()

  const isLoading =
    navigation.state === 'loading' || navigation.state === 'submitting'

  return (
    <div aria-busy={isLoading} aria-describedby="progress-bar">
      <progress aria-label="loading..." className="hidden" id="progress-bar" />
      {isLoading && (
        <div className="fixed top-0 block h-2 w-full animate-pulse border-0 bg-black" />
      )}
      <Outlet />
    </div>
  )
}
