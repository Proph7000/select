import { useState } from 'react'

import { useNames } from '@entities/names'

import { Select } from '@shared/ui'
import { ISelectOption } from '@shared/ui'

import { ProjectDescription } from './components'

import './main-page.css'

const options = new Array(100000).fill(null).map((_, index) => ({
  value: index.toString(),
  label: `Option ${index}`,
}))

export function MainPage() {
  const [selectedValue, setSelectedValue] = useState<ISelectOption | null>()

  const { data } = useNames((data) =>
    data.results.map(
      (name) =>
        ({
          value: name.objectId,
          label: `${name.Name} (${name.Gender})`,
        }) satisfies ISelectOption,
    ),
  )

  return (
    <div>
      <h1 className='title'>Select examples</h1>

      <div className='select-examples'>
        <Select
          options={data || []}
          placeholder='Choose name'
          label='Name list (from API)'
          fullWidth
          value={selectedValue}
          onChange={setSelectedValue}
          disabled={data?.length === 0}
        />

        <Select
          options={options}
          placeholder='Choose option'
          label='Select option (100,000 options)'
          fullWidth
          value={selectedValue}
          onChange={setSelectedValue}
        />
      </div>

      <ProjectDescription />
    </div>
  )
}
