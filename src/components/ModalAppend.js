import React, { useEffect, useState } from 'react'
import axios from 'axios'

const defaultForm = {
  indonesia: '',
  baseForm: '',
  present: '',
  presentParticiple: '',
  past: '',
  pastParticiple: ''
}

const ModalAppend = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState(defaultForm)

  if (!props.value) return null

  const onCloseModal = () => {
    props.onCloseModal()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setIsLoading(true)

    const response = await axios({
      url: `api/vocabularies`,
      method: 'POST',
      data: form
    })

    console.log(response)

    props.onRefreshVocabularies()

    setForm(defaultForm)
    setIsLoading(false)
    onCloseModal()
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target

    const newForm = { ...form }
    newForm[name] = value

    setForm(newForm)
  }

  return (
    <div className="fixed z-10 inset-0 bg-gray-900 bg-opacity-30 flex justify-center items-center">
      {/* Modal Content */}
      <div className="bg-white rounded-lg">
        {/* <!-- Modal header --> */}
        <div className="flex justify-between p-4">
          <h2 className="text-lg font-semibold text-gray-800">Modal Title</h2>

          <button
            onClick={onCloseModal}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <hr className="border-b border-solid border-b-black"></hr>

        <div className="w-96 p-4">
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label className="font-medium text-sm capitalize">
                indonesia
              </label>

              <br />

              <input
                name="indonesia"
                type="text"
                className="border rounded p-2 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                placeholder="enter text here..."
                value={form.indonesia}
                onChange={handleInputChange}
              />
            </div>

            <div className="my-3">
              <label className="font-medium text-sm capitalize">
                base form
              </label>
              <br />
              <input
                name="baseForm"
                type="text"
                className="border rounded p-2 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                placeholder="enter text here..."
                value={form.baseForm}
                onChange={handleInputChange}
              />
            </div>

            <div className="my-3">
              <label className="font-medium text-sm capitalize">present</label>
              <br />
              <input
                name="present"
                type="text"
                className="border rounded p-2 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                placeholder="enter text here..."
                value={form.present}
                onChange={handleInputChange}
              />
            </div>

            <div className="my-3">
              <label className="font-medium text-sm capitalize">
                present participle
              </label>
              <br />
              <input
                name="presentParticiple"
                type="text"
                className="border rounded p-2 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                placeholder="enter text here..."
                value={form.presentParticiple}
                onChange={handleInputChange}
              />
            </div>

            <div className="my-3">
              <label className="font-medium text-sm capitalize">past</label>
              <br />
              <input
                name="past"
                type="text"
                className="border rounded p-2 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                placeholder="enter text here..."
                value={form.past}
                onChange={handleInputChange}
              />
            </div>

            <div className="my-3">
              <label className="font-medium text-sm capitalize">
                past participle
              </label>
              <br />
              <input
                name="pastParticiple"
                type="text"
                className="border rounded p-2 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                placeholder="enter text here..."
                value={form.pastParticiple}
                onChange={handleInputChange}
              />
            </div>

            <div className="mt-4 flex justify-end">
              <button
                disabled={isLoading}
                className="bg-blue-500 p-2 rounded-lg text-sm text-white"
                type="submit"
              >
                {isLoading ? 'Loading...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ModalAppend
