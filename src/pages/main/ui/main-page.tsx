import { useState } from 'react'

import { Select } from '@shared/ui'
import { ISelectOption } from '@shared/ui'

import './main-page.css'

const options = new Array(200).fill(null).map((_, index) => ({
  value: index.toString(),
  label: `Option ${index}`,
}))

export function MainPage() {
  const [selectedValue, setSelectedValue] = useState<ISelectOption | null>(
    options[123],
  )

  return (
    <div>
      <h1 className='title'>Select page</h1>

      <Select
        options={options}
        placeholder='Choose option'
        label='Select'
        fullWidth
        value={selectedValue}
        onChange={setSelectedValue}
      />
    </div>
  )
}
