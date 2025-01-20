import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

interface UseSearch {
  searchParams: URLSearchParams
  handleSearchParams: (search: string) => void
}

const useSearch = (): UseSearch => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearchParams = useDebouncedCallback((search: string) => {
    const params = new URLSearchParams(searchParams)

    if (!search) {
      params.delete('query')
    }

    params.set('query', search)
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return {
    searchParams,
    handleSearchParams,
  }
}

export default useSearch
