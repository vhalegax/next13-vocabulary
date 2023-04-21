import React, { useEffect, useState } from 'react'
import axios from 'axios'

function HomePage() {
  const [vocabularies, setVocabularies] = useState([])

  useEffect(() => {
    const getVocabularies = async () => {
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
    }

    getVocabularies()
  }, [])

  const toggleVocabulary = (vocabulary) => {
    const newVocab = { ...vocabulary }
    newVocab.show = !newVocab.show

    const newVocabularies = [...vocabularies]
    newVocabularies[vocabulary.id] = newVocab

    setVocabularies(newVocabularies)
  }

  return (
    <main className="bg-gray-300 min-h-screen">
      <div className="h-12 fixed top-0 bg-green-600 w-screen p-3">
        <div className="container mx-auto">Navbar</div>
      </div>
      <div className="h-12"></div>

      <div className="container mx-auto my-4 p-4 border border-solid border-green-700">
        {/* Content */}
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
                      {vocabulary.id}
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
                        className="bg-blue-500 p-2 rounded-lg text-sm"
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
                        className="border p-3 text-sm"
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
      </div>
    </main>
  )
}

export default HomePage
