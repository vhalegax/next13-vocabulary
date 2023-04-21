// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { google } from 'googleapis'
import googleKey from '../../../../google-key.json'

import bodyParser from 'body-parser'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb'
    }
  }
}

const GOOGLE_SHEET_ID = '1P9JobyTE0T9hBKGS21zgyC8a5iAGMDM4vnqjtBcfeJw'
const SHEET_RANGE = `Sheet1!A:F`

const getGoogleClient = () => {
  const keys = {
    client_email: googleKey.client_email,
    private_key: googleKey.private_key
  }

  return new google.auth.JWT(keys.client_email, null, keys.private_key, [
    'https://www.googleapis.com/auth/spreadsheets'
  ])
}

const getVocabularies = async (req, res) => {
  try {
    const googleClient = getGoogleClient()

    // Authorize
    await googleClient.authorize()

    const googleSheetAPI = google.sheets({ version: 'v4', auth: googleClient })

    //CUSTOMIZATION FROM HERE
    const opt = {
      spreadsheetId: GOOGLE_SHEET_ID,
      range: SHEET_RANGE
    }

    const googleResult = await googleSheetAPI.spreadsheets.values.get(opt)

    const response = {
      data: googleResult.data.values
    }

    return res.status(200).send(JSON.stringify(response))
  } catch (e) {
    const error = { code: 400, message: e.message }
    return res.status(400).send(JSON.stringify({ error }))
  }
}

const createVocabularies = async (req, res) => {
  try {
    const {
      indonesia,
      baseForm,
      present,
      presentParticiple,
      past,
      pastParticiple
    } = req.body

    const value = [
      indonesia,
      baseForm,
      present,
      presentParticiple,
      past,
      pastParticiple
    ]

    const googleClient = getGoogleClient()

    // Authorize
    await googleClient.authorize()

    const googleSheetAPI = google.sheets({ version: 'v4', auth: googleClient })

    //CUSTOMIZATION FROM HERE
    const opt = {
      spreadsheetId: '1P9JobyTE0T9hBKGS21zgyC8a5iAGMDM4vnqjtBcfeJw',
      range: SHEET_RANGE,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [value]
      }
    }

    let data = await googleSheetAPI.spreadsheets.values.append(opt)

    return res.status(200).send(JSON.stringify({ data: data }))
  } catch (e) {
    const error = { code: 400, message: e.message }
    return res.status(400).send(JSON.stringify({ error }))
  }
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    await getVocabularies(req, res)
  } else if (req.method === 'POST') {
    await createVocabularies(req, res)
  }
}
