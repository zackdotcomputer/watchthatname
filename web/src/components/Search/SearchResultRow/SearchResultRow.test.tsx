import { render } from '@redwoodjs/testing'

import SearchResultRow from './SearchResultRow'

describe('SearchResultRow', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SearchResultRow />)
    }).not.toThrow()
  })
})
