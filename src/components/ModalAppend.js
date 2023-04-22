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
    <div className="fixed inset-0 z-10 flex min-h-screen items-center justify-center bg-black bg-opacity-60">
      {/* Modal Content */}
      <div className="">
        <div className="bg-base-200">
          {/* <!-- Modal header --> */}
          <div className="flex justify-between bg-primary p-4 text-primary-content">
            <h2 className="text-lg font-semibold capitalize">Add vocabulary</h2>

            <button onClick={onCloseModal}>
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

          <hr className="border-b border-solid border-b-primary-content"></hr>

          <div className="w-96 p-4">
            <form onSubmit={handleSubmit}>
              <div className="my-3">
                <label className="text-sm capitalize text-primary">
                  indonesia
                </label>

                <br />

                <input
                  name="indonesia"
                  type="text"
                  className="focus:shadow-outline-primary block w-full rounded border border-primary bg-base-100 p-2 capitalize focus:border-primary-focus focus:outline-none"
                  placeholder="enter text here..."
                  value={form.indonesia}
                  onChange={handleInputChange}
                />
              </div>

              <div className="my-3">
                <label className="text-sm capitalize text-primary">
                  base form
                </label>
                <br />
                <input
                  name="baseForm"
                  type="text"
                  className="focus:shadow-outline-primary block w-full rounded border border-primary bg-base-100 p-2 capitalize focus:border-primary-focus focus:outline-none"
                  placeholder="enter text here..."
                  value={form.baseForm}
                  onChange={handleInputChange}
                />
              </div>

              <div className="my-3">
                <label className="text-sm capitalize text-primary">
                  present
                </label>
                <br />
                <input
                  name="present"
                  type="text"
                  className="focus:shadow-outline-primary block w-full rounded border border-primary bg-base-100 p-2 capitalize focus:border-primary-focus focus:outline-none"
                  placeholder="enter text here..."
                  value={form.present}
                  onChange={handleInputChange}
                />
              </div>

              <div className="my-3">
                <label className="text-sm capitalize text-primary">
                  present participle
                </label>
                <br />
                <input
                  name="presentParticiple"
                  type="text"
                  className="focus:shadow-outline-primary block w-full rounded border border-primary bg-base-100 p-2 capitalize focus:border-primary-focus focus:outline-none"
                  placeholder="enter text here..."
                  value={form.presentParticiple}
                  onChange={handleInputChange}
                />
              </div>

              <div className="my-3">
                <label className="text-sm capitalize text-primary">past</label>
                <br />
                <input
                  name="past"
                  type="text"
                  className="focus:shadow-outline-primary block w-full rounded border border-primary bg-base-100 p-2 capitalize focus:border-primary-focus focus:outline-none"
                  placeholder="enter text here..."
                  value={form.past}
                  onChange={handleInputChange}
                />
              </div>

              <div className="my-3">
                <label className="text-sm capitalize text-primary">
                  past participle
                </label>
                <br />
                <input
                  name="pastParticiple"
                  type="text"
                  className="focus:shadow-outline-primary block w-full rounded border border-primary bg-base-100 p-2 capitalize focus:border-primary-focus focus:outline-none"
                  placeholder="enter text here..."
                  value={form.pastParticiple}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  disabled={isLoading}
                  className="rounded-lg bg-secondary p-2 text-sm font-medium capitalize text-secondary-content w-32 mt-4"
                  type="submit"
                >
                  {isLoading ? 'Loading...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalAppend
