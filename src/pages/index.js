import React, { useEffect, useState } from 'react'
import axios from 'axios'

import ModalAppend from '@/components/ModalAppend'
import Navbar from '@/components/Navbar'

function HomePage() {
  const [isLoadingVocabularies, setLoadingVocabularies] = useState(false)
  const [vocabularies, setVocabularies] = useState([])
  const [modal, setModal] = useState(false)

  const getVocabularies = async () => {
    setLoadingVocabularies(true)

    const result = await axios({
      url: `api/vocabularies`,
      method: 'get'
    })

    const rows = result.data.data
    const headers = rows[0]

    let data = rows.slice(1)
    data = data.map((row, index) => {
      const obj = {}
      row.forEach((cell, index) => {
        obj[headers[index]] = cell
      })

      obj.id = index
      obj.show = false

      return obj
    })

    setVocabularies(data)
    setLoadingVocabularies(false)
  }

  useEffect(() => {
    getVocabularies()
  }, [])

  const toggleVocabulary = (vocabulary) => {
    const newVocab = { ...vocabulary }
    newVocab.show = !newVocab.show

    const newVocabularies = [...vocabularies]
    newVocabularies[vocabulary.id] = newVocab

    setVocabularies(newVocabularies)
  }

  const toggleModal = (value) => {
    setModal(value)
  }

  return (
    <div className="min-h-screen bg-base-300 text-base-content">
      <Navbar />
      <div className="container mx-auto my-4 p-4">
        {isLoadingVocabularies
          ? 'Loading...'
          : vocabularies.map((vocabulary) => (
              <div
                key={vocabulary.id}
                className="mb-3 rounded-lg  border border-x-2 border-y-2 border-solid border-primary bg-base-100 p-3"
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-normal text-primary">
                    <span className="mr-1 capitalize">
                      {vocabulary.base_form}
                    </span>
                    <span className="capitalize">({vocabulary.indonesia})</span>
                  </div>

                  {/* <button
                    className="flex items-center rounded-full bg-primary p-1 text-primary-content"
                    onClick={() => toggleVocabulary(vocabulary)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="inline-block h-4 w-4 align-text-bottom"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 6.293a1 1 0 0 1 1.414 0L10 9.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button> */}
                </div>
                <table className="mt-2 w-full max-w-full table-fixed text-left text-xs">
                  <thead>
                    <tr className="">
                      <th
                        className="w-1/4 border-b  p-1"
                        style={{ wordWrap: 'break-word' }}
                      >
                        Present
                      </th>
                      <th
                        className="w-1/4 border-b p-1"
                        style={{ wordWrap: 'break-word' }}
                      >
                        Present Participle
                      </th>

                      <th
                        className="w-1/4 border-b p-1"
                        style={{ wordWrap: 'break-word' }}
                      >
                        Past
                      </th>
                      <th
                        className="w-1/4 border-b p-1"
                        style={{ wordWrap: 'break-word' }}
                      >
                        Past Participle
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <React.Fragment>
                      <tr>
                        <td className=" p-1" style={{ wordWrap: 'break-word' }}>
                          {vocabulary.present}
                        </td>
                        <td className=" p-1" style={{ wordWrap: 'break-word' }}>
                          {vocabulary.present_participle}
                        </td>
                        <td className=" p-1" style={{ wordWrap: 'break-word' }}>
                          {vocabulary.past}
                        </td>
                        <td className=" p-1" style={{ wordWrap: 'break-word' }}>
                          {vocabulary.past_participle}
                        </td>
                      </tr>
                    </React.Fragment>
                  </tbody>
                </table>
              </div>
            ))}
      </div>

      <ModalAppend
        value={modal}
        onCloseModal={() => toggleModal(false)}
        onRefreshVocabularies={() => getVocabularies()}
      />

      <div className="h-10"></div>

      <button
        className="fixed bottom-4 right-4 rounded-lg bg-secondary p-2 text-sm font-medium capitalize text-secondary-content"
        onClick={() => toggleModal(true)}
      >
        Add vocabulary
      </button>
    </div>
  )
}

export default HomePage
