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
    <div className="bg-gray-300 min-h-screen text-black">
      <Navbar />

      <div className="container mx-auto my-4 p-4">
        {isLoadingVocabularies ? (
          'Loading...'
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full max-w-full table-fixed">
              <thead>
                <tr>
                  <th
                    className="border p-3 w-2/5"
                    style={{ wordWrap: 'break-word' }}
                  >
                    IND
                  </th>
                  <th
                    className="border p-3 w-2/5"
                    style={{ wordWrap: 'break-word' }}
                  >
                    ENG
                  </th>
                  <th className="border p-3 w-1/5"></th>
                </tr>
              </thead>
              <tbody>
                {vocabularies.map((vocabulary, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td
                        className="border p-3"
                        style={{ wordWrap: 'break-word' }}
                      >
                        {vocabulary.indonesia}
                      </td>
                      <td
                        className="border p-3"
                        style={{ wordWrap: 'break-word' }}
                      >
                        {vocabulary.base_form}
                      </td>
                      <td className="border p-3 text-center">
                        <button
                          className="bg-blue-500 p-2 rounded-lg text-sm text-white"
                          onClick={() => toggleVocabulary(vocabulary)}
                        >
                          {!vocabulary.show ? 'show' : 'hide'}
                        </button>
                      </td>
                    </tr>

                    {vocabulary.show ? (
                      <tr>
                        <td
                          colSpan="3"
                          className="border p-3"
                          style={{ wordWrap: 'break-word' }}
                        >
                          <div>indonesia : {vocabulary.indonesia}</div>
                          <div>english : {vocabulary.base_form}</div>
                          <div>base form : {vocabulary.base_form}</div>
                          <div>present : {vocabulary.present}</div>
                          <div>
                            present participle : {vocabulary.present_participle}
                          </div>
                          <div>past : {vocabulary.past}</div>
                          <div>
                            past participle : {vocabulary.past_participle}
                          </div>
                        </td>
                      </tr>
                    ) : null}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ModalAppend
        value={modal}
        onCloseModal={() => toggleModal(false)}
        onRefreshVocabularies={() => getVocabularies()}
      />

      <div className="h-10"></div>
      <button
        className="bg-blue-500 p-2 rounded-lg text-sm text-white fixed bottom-4 right-4 capitalize"
        onClick={() => toggleModal(true)}
      >
        Add vocabulary
      </button>
    </div>
  )
}

export default HomePage
